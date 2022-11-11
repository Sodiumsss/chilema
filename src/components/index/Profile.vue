<template>

  <el-row justify="center">
    <el-space direction="vertical">
        账号<a style="font-weight: bold" v-text="user.username"/>
        目前积分<a v-text="user.credit"/>
        称呼<el-input show-word-limit maxlength="15" v-model="user.nickname"></el-input> <el-button @click="change">修改</el-button>
    </el-space>
  </el-row>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import * as func from "@/Set"
import router from "@/router";
const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());


onMounted(()=> {
  func.getUserByToken(func.getToken(initCookie)).then(r=>{
    const callBack=func.getResult(r);
    if (!callBack.success())
    {
      func.clearToken(initCookie);
      ElMessage.error({message:"请重新登录！",duration:2000});
      localStorage.clear();
      router.push('guest');
      return;
    }
    else
    {
      user.value=func.createUserByData(callBack);
      localStorage.setItem("user",JSON.stringify(callBack.getData()));
    }

  });

})

const change = ()=>{
  console.log(user.value);
  func.setNickname(user.value,func.getToken(initCookie)).then((res)=>{
    if (res.data==="")
    {
      func.clearToken(initCookie);
      localStorage.clear();
      ElMessage.error({message:"请重新登录！",duration:2000});
      router.push('guest');
      return;
    }
    const callBack=func.getResult(res);
    if (callBack.success())
    {
      ElMessage.success({message:"修改成功！",duration:2000});
    }
    else
    {
      ElMessage.error({message:"修改失败，请尝试更换称呼！",duration:2000});
    }
  }).catch(()=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});
  })
}
</script>
