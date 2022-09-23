import {ComponentInternalInstance, getCurrentInstance} from "vue"


const ip = "localhost";
const port = "6324";
function getThis() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    return appContext.config.globalProperties
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

    constructor(username :string="",password :string="",schoolId :any=-1,birthYear :any=-1)
    {
        this.id=null;
        this.username=username;
        this.password=password;
        this.schoolId=schoolId;
        this.birthYear=birthYear;
    }


}

class Favor
{
    step1 : number[];
    step2 : number[];
    step3 : boolean[];
    step4 : number[];

    constructor(step1:number[],step2 : number[],step3 : boolean[],step4 : number[])
    {
        this.step1=step1;
        this.step2=step2;
        this.step3=step3;
        this.step4=step4;
    }


}

export {
    ip,port,getThis,R,UserAccount,Favor
}
