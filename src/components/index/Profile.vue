<template>

  <el-row justify="center">
    <el-space direction="vertical">
      <template v-if="isShow===1">
        账号<a style="font-weight: bold" v-text="user.username"/>
        目前积分<a v-text="user.credit"/>
        称呼<el-input v-model="user.nickname"></el-input> <el-button @click="change">修改</el-button>
      </template>

      <template v-if="isShow===-1">
        <a style="font-weight: bold" >请尝试刷新页面，若仍出错，请联系管理员！</a>
      </template>
    </el-space>
  </el-row>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import * as func from "@/Set"
const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());
const isShow=ref<number>(0);

onMounted(()=>{
  const cookiesState=func.existCookies(initCookie);
  if (cookiesState===-1)
  {
    ElMessage.error({message:"Cookie失效，请重新登录！",duration:2000});
    func.clearCookies(initCookie);
    router.push('guest');
  }
  else if (cookiesState===1)
  {
    user.value.loadByCookies(initCookie);
    user.value.getCredit().then((res)=>{
      const callBack=func.getResult(res);
      if (callBack.success())
      {
        isShow.value=1;
        user.value.credit=Number(callBack.getMessage());
      }
      else
      {
        ElMessage.error({message:"Cookie失效，请重新登录！",duration:2000});
        func.clearCookies(initCookie);
        router.push('guest');
      }
    }).catch(()=>{
      ElMessage.error({message:"网络连接出错，请尝试刷新！",duration:2000});
      isShow.value=-1;
    });
  }
  else
  {
    ElMessage.error({message:"出现未知错误，请尝试刷新！",duration:2000});
    isShow.value=-1;
  }
})

const change = ()=>{
  user.value.changeNickname().then((res)=>{
    const callBack=func.getResult(res);
    if (callBack.success())
    {
      ElMessage.success({message:"修改成功！",duration:2000});
      user.value.setCookies(initCookie);
    }
    else
    {
      ElMessage.error({message:"修改失败！",duration:2000});
    }
  }).catch(()=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});
  })
}
</script>
