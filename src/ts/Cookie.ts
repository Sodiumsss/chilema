import {ComponentInternalInstance, getCurrentInstance} from "vue"

function getThis() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    return appContext.config.globalProperties
}


function initCookie()
{
    return getThis().$cookies;
}

function isAlready(initCookie:any) :boolean
{
    return initCookie.isKey("already");
}

function setAlready(initCookie:any)
{
    initCookie.set("already",":)",-1);
}



export {setAlready,getThis,isAlready,initCookie}
