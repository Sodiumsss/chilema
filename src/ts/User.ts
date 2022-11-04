import * as Connection from "@/ts/Connection";
import {Favor} from "@/ts/Favor";
import * as func from "@/Set";
import {ElMessage} from "element-plus";
import router from "@/router";

class User
{
    id :any=null;
    username :string;
    password :string;
    schoolId :number;
    birthYear :number;
    nickname :string;
    credit :number;
    hollow :number;
    sex : number;
    favor : Favor | undefined;


    constructor(username :string="",password :string="",schoolId :any=-1,birthYear :any=-1,nickname :string=""
        ,credit:number=0,hollow :number=0,sex :number=-1,favor ?:Favor)
    {
        this.username=username;
        this.password=password;
        this.schoolId=schoolId;
        this.birthYear=birthYear;
        this.nickname=nickname;
        this.credit=credit;
        this.hollow=hollow;
        this.favor=favor;
        this.sex=sex;
    }
    login()
    {
        const json=JSON.stringify(this);
        return Connection.post("user","login",json);
    }

    forgetPW()
    {
        const json=JSON.stringify(this);
        return Connection.post("user","forgetPW",json);
    }
    changeNickname()
    {
        const json=JSON.stringify(this);
        return Connection.post("user","changeNickname",json);
    }

    validateAndGet()
    {
        const json=JSON.stringify(this);
        return Connection.post("user","validateAndGet",json);
    }
    joinHollow()
    {
        const json=JSON.stringify(this);
        return Connection.post("user","joinHollow",json);
    }




    setCookies(initCookie:any,setUsername :boolean=true,setPassword :boolean=true,setNickname :boolean=true)
    {
        const cookie=initCookie;
        if (setUsername)
        {
            cookie.set("username",this.username,"30d");
        }
        if (setPassword)
        {
            cookie.set("password",this.password,"30d");
        }
        if (setNickname)
        {
            cookie.set("nickname",this.nickname,"30d");
        }
    }

    loadByCookies(initCookie:any)
    {
        const cookie=initCookie;
        this.username=cookie.get("username");
        this.password=cookie.get("password");
        this.nickname=cookie.get("nickname");
    }





}
function create(userAccount:User, favor:Favor)
{
    const json=JSON.stringify({userAccount:userAccount,favor:favor});
    return Connection.post("user","create",json);
}


function getUserByData(data :any) : User
{
    let user = new User(data.username, data.password, -1, -1, data.nickname, data.credit, data.hollow, data.sex);
    user.id=data.id;
    return user;
}



function clearCookies(initCookie:any)
{
    const cookie=initCookie;
    cookie.remove("username");
    cookie.remove("password");
    cookie.remove("nickname");
}

function existCookies(initCookie:any) : number
{
    const cookie=initCookie;
    if (cookie.isKey("username"))
    {
        if (cookie.isKey("password"))
        {
            if (cookie.isKey("nickname"))
            {
                return 1;//用户名，密码，昵称全部存在
            }
            else
            {
                return 0;//用户名，密码存在
            }
        }
    }
    return -1;//用户名与密码有缺失

}

async function userInit(user :User, initCookie:any)
{
    //从Cookies中读取Username、Password、Nickname发送至服务器校验，
    //如果校验成功，装载更多关于该用户的信息，如果校验失败，直接清空退出。
    const cookiesState=func.existCookies(initCookie);
    if (cookiesState===1)//只有在Username、Password、Nickname都存在时才会发起校验，三种缺一直接清空退出。
    {
        user.loadByCookies(initCookie);

        return new Promise(resolve => {
            user.validateAndGet().then((res)=>{
                const callBack=func.getResult(res);
                if (callBack.success())
                {
                    user=func.getUserByData(callBack.getData());
                    resolve(user);
                }
                else
                {
                    ElMessage.error({message:"Cookie失效，请重新登录！",duration:2000});
                    func.clearCookies(initCookie);
                    router.push('guest');
                }
            }).catch(()=>{
                ElMessage.error({message:"网络连接出错，请尝试刷新！",duration:2000});
            })
        })



    }
    else
    {
        ElMessage.error({message:"Cookie失效，请重新登录！",duration:2000});
        func.clearCookies(initCookie);
        await router.push('guest');
    }
}

function initUserByCookies(user :User,initCookie:any)
{
    const cookiesState=func.existCookies(initCookie);
    if (cookiesState===1)
    {
        user.loadByCookies(initCookie);
    }
    else
    {
        ElMessage.error({message:"Cookie失效，请重新登录！",duration:2000});
        func.clearCookies(initCookie);
        router.push('guest');
    }
}

async function verifyUsername(username :string)
{
    const user = new User(username);
    const json=JSON.stringify(user);
    return await Connection.post("user","verifyUsername",json);
}

export {userInit,getUserByData,create,initUserByCookies,User,verifyUsername,clearCookies,existCookies}
