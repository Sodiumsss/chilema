<template>
  <el-container v-loading="loading">
    <el-main>
      <el-card :style="{borderRadius:'var(--el-border-radius-round'}">
        <el-form>
          <el-row justify="center">
            <el-space direction="vertical">
              <a>账号</a><el-input v-model="username"></el-input>
              <a>学号后五位</a><el-input show-word-limit maxlength="5"  v-model="schoolId"></el-input>
              <a>出生年份</a><el-input show-word-limit maxlength="4" v-model="birthYear"></el-input>
              <a>新密码</a><el-input show-password v-model="password"></el-input>
              <a>确认密码</a><el-input show-password  v-model="newPassword"></el-input>
              <a v-if="state===true" style="color: red">输入的密码不一致！</a>

            </el-space>
          </el-row>

          <el-row justify="center">
                <el-button @click="goBack">返回</el-button>
                <el-button @click="submit">提交</el-button>
          </el-row>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import md5 from "js-md5";
import {Base64} from "js-base64";
import axios from "axios";
import * as myFunc from "@/myFunc";
import qs from "qs";

const username=ref<string>("");
const schoolId=ref<string>("");
const birthYear=ref<string>("");
const password=ref<string>("");
const newPassword=ref<string>("");

const loading=ref<boolean>(false);
const state=ref<boolean>(false);

watch(newPassword,()=>{
  state.value = newPassword.value != password.value;
  console.log(state.value)

})

function submit()
{
  loading.value=true;
    if (username.value==="" || schoolId.value==="" || birthYear.value==="")
    {
      ElMessage.error({message:"请填写完整！",duration:2300});
      loading.value=false;
      return;
    }
    const info=JSON.stringify(new myFunc.UserAccount(username.value,md5(password.value),schoolId.value,birthYear.value));
    const data=Base64.encode (info);
    axios.post("http://"+myFunc.ip+":"+myFunc.port+"/api/user/forgetPW",
        qs.stringify({'info':data}),{headers:{'forgetPW':'yoyo!'}})
        .then((res :any)=>{
          const callBack=new myFunc.R(res);
          if (callBack.success())
          {
            ElMessage.success({message:callBack.getMessage(),duration:2300});
            router.push('login');
          }
          else {ElMessage.error({message:callBack.getMessage(),duration:2500});}})
        .catch(()=>{ElMessage.error({message:"连接出错！",duration:2500});});
  loading.value=false;

}
function goBack() {router.back();}
</script>
