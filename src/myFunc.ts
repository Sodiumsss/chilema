import {ComponentInternalInstance, getCurrentInstance} from "vue"


const ip = "127.0.0.1";
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
        return this.code !== 1;
    }

    getMessage()
    {
        return this.message;
    }


}



export {
    ip,port,getThis,R
}
