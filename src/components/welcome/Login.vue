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
import {ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import axios from "axios";
import * as my from "@/myFunc";
import qs from "qs";
const md5 = require('js-md5');
import {Base64} from "js-base64";

const username=ref<string>("");
const password=ref<string>("");
const loading=ref<boolean>(false);


function login()
{
  if (username.value==="" || password.value==="")
  {
    ElMessage.error({message:"请将账号密码填写完整！",duration:2300});
    return;
  }
  loading.value=true;
  const info=JSON.stringify({'username':username.value,'password':md5(password.value)});
  const data=Base64.encode (info);
  axios.post("http://"+my.ip+":"+my.port+"/api/user/login", qs.stringify({'info':data}),{headers:{'Login':'yoyo!'}})
      .then((res :any) =>{
        const callBack=new my.R(res);
        if (callBack.success())
        {
          ElMessage.success({message:callBack.getMessage(),duration:2300});
        }
        else
        {
          ElMessage.error({message:callBack.getMessage(),duration:2500});
        }

      })
      .catch(()=>{
          ElMessage.error({message:"连接出错！",duration:2500});
      })

  loading.value=false;

}

function forgetPassword()
{
  router.push("forgetPW");
}

function goBack()
{
  router.back();
}
</script>

<style scoped>

</style>
