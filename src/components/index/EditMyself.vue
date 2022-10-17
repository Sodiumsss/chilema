<template>

  <el-row justify="center">
    <el-space  direction="vertical">
      账号<el-input disabled v-model="username"></el-input>
      称呼<el-input v-model="nickname"></el-input> <el-button @click="change">修改</el-button>

    </el-space>
  </el-row>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import * as myFunc from "@/myFunc";
import router from "@/router";
import {Base64} from "js-base64";
import axios from "axios";
import qs from "qs";
import {ElMessage} from "element-plus";
import md5 from "js-md5";

const cookies=myFunc.getCookies();
const username=ref<string>(cookies.get("username"));
const password=ref<string>(cookies.get("password"));
const nickname=ref<string>("");
onMounted(()=>{
  if (!(cookies.isKey("username") && cookies.isKey("password")) && cookies.isKey("nickname"))
  {
    myFunc.clearAccountCookies(cookies);
    router.push('guest');
  }
  else
  {
    nickname.value=cookies.get("nickname");
  }
})

const change = ()=>{
  const info=JSON.stringify(new myFunc.UserAccount(username.value,password.value,-1,-1,nickname.value));
  const data=Base64.encode (info);
  if (nickname.value!==cookies.get("nickname"))
  {
    axios.post("http://"+myFunc.ip+":"+myFunc.port+"/api/user/changeNickname",
        qs.stringify({'info':data})).then((res :any)=>{
      const callBack=new myFunc.R(res);
      if (callBack.success())
      {
        ElMessage.success({message:callBack.getMessage(),duration:2300});
        cookies.set("nickname",nickname.value,'30d');

      }
      else
      {
        ElMessage.error({message:callBack.getMessage(),duration:2500});
      }
    })
        .catch(()=>{
          ElMessage.error({message:"连接出错！",duration:2500});
        })
  }

}
</script>
