<template>
<el-container v-loading="loading">
  <el-main>
    <el-card>
      <el-form>
        <el-row justify="center">
          <el-space direction="vertical">
            <a>账号</a><el-input v-model="user.username"></el-input>
            <a>密码</a><el-input show-password v-model="user.password"></el-input>
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

const user =ref<func.User>(new func.User());
const loading=ref<boolean>(false);
const initCookie = func.initCookie();

onMounted(()=>{
  func.clearToken(initCookie);
})

function login()
{
  if (user.value.username ==="" || user.value.password==="")
  {
    ElMessage.error({message:"请将账号密码填写完整！",duration:2000});
    return;
  }
  loading.value=true;

  func.login(user.value.username,md5(user.value.password)).then((res)=>{
    const callBack=func.getResult(res);
    if (callBack.success())
    {
      func.saveToken(initCookie,callBack);
      func.setAlready(initCookie);
      localStorage.setItem("user",JSON.stringify(callBack.getData()))
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
