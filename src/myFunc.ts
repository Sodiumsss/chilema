import {ComponentInternalInstance, getCurrentInstance} from "vue"


const ip = "192.168.137.1";
const port = "6324";
function getThis() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    return appContext.config.globalProperties
}
function clearAccountCookies(_ :any)
{
    _.remove("username");
    _.remove("password");
    _.remove("nickname");
}

function getCookies()
{
    return getThis().$cookies;
}


class R
{
    code :number;
    message :string;
    data :object;
    constructor(receiveData :any)
    {
        this.code=receiveData.data.code;
        this.message=receiveData.data.message;
        this.data=receiveData.data.data;
    }

    success()
    {
        return this.code === 1;
    }

    failed()
    {
        return this.code === 0;
    }

    getMessage()
    {
        return this.message;
    }


}

class UserAccount
{
    id :any;
    username :string;
    password :string;
    schoolId :number;
    birthYear :number;
    nickname :string;

    constructor(username :string="",password :string="",schoolId :any=-1,birthYear :any=-1,nickname :string="")
    {
        this.id=null;
        this.username=username;
        this.password=password;
        this.schoolId=schoolId;
        this.birthYear=birthYear;
        this.nickname=nickname;
    }


}

class Favor
{
    id : any;
    username: string;
    step1 : number[];
    step2 : number[];
    step3 : boolean[];
    step4 : number[];

    constructor(username:string,step1:number[],step2 : number[],step3 : boolean[],step4 : number[])
    {
        this.id=null;
        this.username=username;
        this.step1=step1;
        this.step2=step2;
        this.step3=step3;
        this.step4=step4;
    }


}

export {
    ip,port,getThis,R,UserAccount,Favor,clearAccountCookies,getCookies
}
