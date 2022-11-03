import * as Connection from "@/ts/Connection";
import {Favor} from "@/ts/Favor";

class User
{
    id :any=null;
    username :string;
    password :string;
    schoolId :number;
    birthYear :number;
    nickname :string;
    credit :number;
    hollow :boolean;
    sex : number;
    favor : Favor | undefined;


    constructor(username :string="",password :string="",schoolId :any=-1,birthYear :any=-1,nickname :string=""
        ,credit:number=0,hollow :boolean=false,sex :number=-1,favor ?:Favor)
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
    async login()
    {
        const json=JSON.stringify(this);
        return await Connection.post("user","login",json);
    }

    async forgetPW()
    {
        const json=JSON.stringify(this);
        return await Connection.post("user","forgetPW",json);
    }
    async changeNickname()
    {
        const json=JSON.stringify(this);
        return await Connection.post("user","changeNickname",json);
    }

    async getCredit()
    {
        const json=JSON.stringify(this);
        return await Connection.post("user","getCredit",json);
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
async function createWithFavor(userAccount:User,favor:Favor)
{
    const json=JSON.stringify({userAccount:userAccount,favor:favor});
    return await Connection.post("user","create",json);
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

async function validateCookies(initCookie:any)
{
    let cookiesUser = new User();
    cookiesUser.loadByCookies(initCookie);
    console.log(cookiesUser);
    const json=JSON.stringify(cookiesUser);
    return await Connection.post("user","validate",json);
}


async function verifyUsername(username :string)
{
    const user = new User(username);
    const json=JSON.stringify(user);
    return await Connection.post("user","verifyUsername",json);
}

export {createWithFavor,User,verifyUsername,clearCookies,validateCookies,existCookies}
