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
        return Connection.post("user","login",json,"login");
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

    test()
    {
        const json=JSON.stringify(this);
        return Connection.post("user","test",json);
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

function saveToken(initCookie:any,callBack:func.R)
{
    initCookie.set("userToken",callBack.getMessage(),callBack.getData().toString()+"s");
}
function getToken(initCookie:any)
{
    return initCookie.get("userToken");
}
function clearToken(initCookie:any)
{
    return initCookie.remove("userToken");
}
function existToken(initCookie:any) :boolean
{
    return initCookie.isKey("userToken");
}
async function getUserByToken(token :string)
{
    return Connection.post("user","getByToken","",token);
}
function createUserByData(data:any) :func.User
{
    const r = func.getResult(data);
    return r.getData() as func.User;
}


function create(userAccount:User, favor:Favor)
{
    const json=JSON.stringify({userAccount:userAccount,favor:favor});
    return Connection.post("user","create",json);
}



async function verifyUsername(username :string)
{
    const user = new User(username);
    const json=JSON.stringify(user);
    return await Connection.post("user","verifyUsername",json);
}

export {existToken,clearToken,createUserByData,getToken,getUserByToken,saveToken,create,User,verifyUsername}
