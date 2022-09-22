import {ComponentInternalInstance, getCurrentInstance} from "vue"


const ip = "127.0.0.1";
const port = "6324";
function getThis() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    return appContext.config.globalProperties
}

export {
    ip,port,getThis
}
