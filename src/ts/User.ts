import * as Connection from "@/ts/Connection";
import {Favor} from "@/ts/Favor";
import * as func from "@/Set";


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
        return Connection.post("user","forgetPW",json,"forgetPW");
    }



}



//Token操作
function saveToken(initCookie:any,callBack:func.R)//填入R类，保存token至cookies中
{
    initCookie.set("userToken",callBack.getMessage(),callBack.getData().toString()+"s");
}
function getToken(initCookie:any)//从cookies中拿token
{
    return initCookie.get("userToken");
}
function clearToken(initCookie:any)//从cookies中删token
{
    return initCookie.remove("userToken");
}
function existToken(initCookie:any) :boolean//cookies中token是否存在
{
    return initCookie.isKey("userToken");
}
async function getUserByToken(token :string)//使用token从服务器请求user信息
{
    return Connection.post("user","getByToken","",token);
}

//通讯
function create(userAccount:User, favor:Favor)
{
    const json=JSON.stringify({userAccount:userAccount,favor:favor});
    return Connection.post("user","create",json,"create");
}
function joinHollow(token :string)
{
    return Connection.post("user","joinHollow","",token);
}

function setNickname(user :func.User,token:string)
{
    const json=JSON.stringify(user);
    return Connection.post("user","changeNickname",json,token);
}
function verifyUsername(username :string)
{

    return Connection.post("user","verifyUsername",username ,"verifyUsername");
}


function createUserByData(r:any) : func.User
{
    const callback:func.R=func.getResult(r);
    return callback.getData() as func.User;
}
export {setNickname,createUserByData,joinHollow,existToken,clearToken,getToken,getUserByToken,saveToken,create,User,verifyUsername}
