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

            </el-space>
          </el-row>

          <el-row justify="center">
                <el-button @click="goBack">返回</el-button>
                <el-button  @click="submit">提交</el-button>
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
import md5 from "js-md5";
import * as func from "@/Set";

const username=ref<string>("");
const schoolId=ref<string>("");
const birthYear=ref<string>("");
const password=ref<string>("");
const newPassword=ref<string>("");
const loading=ref<boolean>(false);


function submit()
{
  if (username.value==="" || schoolId.value==="" || birthYear.value==="" || newPassword.value==="" || password.value==="")
  {
    ElMessage.error({message:"请填写完整！",duration:2300});
    return;
  }
  const r = new RegExp('(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&()]{6,20}$');
  if(!r.test(password.value))
  {
    ElMessage.error({message:"请包含6~20位数字与字母！",duration:2300});
    return;
  }
  if (newPassword.value !== password.value)
  {
    ElMessage.error({message:"输入的密码不一致！",duration:2300});
    return;
  }

  loading.value=true;
  const user = new func.User(username.value,md5(password.value),schoolId.value,birthYear.value);
  user.forgetPW().then((res)=>{
    const callBack=func.getResult(res);
    if (callBack.success())
    {
      ElMessage.success({message:"修改成功！",duration:2000});
      router.push('login');
    }
    else
    {
      ElMessage.error({message:"修改失败！",duration:2000});
    }
  }).catch(()=>{ElMessage.error({message:"网络连接出错！",duration:2000});})
  loading.value=false;
}
function goBack() {router.back();}
</script>
