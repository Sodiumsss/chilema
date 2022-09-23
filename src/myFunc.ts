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
    id :number;
    username :string;
    password :string;
    schoolId :number;
    birthYear :number;

    constructor(id :number=-1,username :string="",password :string="",schoolId :number=-1,birthYear :number=-1)
    {
        this.id=id;
        this.username=username;
        this.password=password;
        this.schoolId=schoolId;
        this.birthYear=birthYear;
    }



}

export {
    ip,port,getThis,R,UserAccount
}
