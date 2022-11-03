<template>
<el-container v-loading="loading">
  <el-main>
    <el-card :style="{borderRadius:'var(--el-border-radius-round'}">
      <el-form>
        <el-row justify="center">
          <el-space direction="vertical">

            <a>账号</a><el-input v-model="username"></el-input>
            <a>密码</a><el-input show-password v-model="password"></el-input>
          </el-space>
        </el-row>

        <el-row justify="center">
          <el-space direction="vertical">
            <div>
              <el-button @click="goBack">返回</el-button>
              <el-button @click="login">登录</el-button>
            </div>

            <el-button @click="forgetPassword">忘记密码</el-button>
          </el-space>
        </el-row>
      </el-form>
    </el-card>
  </el-main>
</el-container>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import * as func from "@/Set"
const md5 = require('js-md5');


const username=ref<string>("");
const password=ref<string>("");
const loading=ref<boolean>(false);
const initCookie = func.initCookie();

onMounted(()=>{
  func.clearCookies(initCookie);
})

function login()
{
  if (username.value==="" || password.value==="")
  {
    ElMessage.error({message:"请将账号密码填写完整！",duration:2000});
    return;
  }
  loading.value=true;
  const user = new func.User(username.value,md5(password.value));
  user.login().then((res)=>{
    const callBack=func.getResult(res);
    if (callBack.success())
    {

      user.nickname=callBack.message.toString();
      user.setCookies(initCookie);
      if (!func.isAlready(initCookie))
      {
        func.setAlready(initCookie);
      }
      router.push('index');
    }
    else
    {
      ElMessage.error({message:"登录失败！",duration:2000});

    }
  }).catch(()=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});})
  loading.value=false;
}
function forgetPassword() {router.push("forgetPW");}
function goBack() {router.push('/guest');}
</script>
