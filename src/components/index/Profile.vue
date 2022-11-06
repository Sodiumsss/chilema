<template>

  <el-row justify="center">
    <el-space direction="vertical">
        账号<a style="font-weight: bold" v-text="user.username"/>
        目前积分<a v-text="user.credit"/>
        称呼<el-input v-model="user.nickname"></el-input> <el-button @click="change">修改</el-button>
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
    if (r.data==="")
    {
      func.clearToken(initCookie);
      ElMessage.error({message:"请重新登录！",duration:2000});
      router.push('guest');
      return;
    }
    user.value=func.createUserByData(r);
  });

})

const change = ()=>{
  console.log(user.value);
  func.setNickname(user.value,func.getToken(initCookie)).then((res)=>{
    if (res.data==="")
    {
      func.clearToken(initCookie);
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
      ElMessage.error({message:"修改失败！",duration:2000});
    }
  }).catch(()=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});
  })
}
</script>
