<template>
<el-container>
  <el-main>
    <el-card :style="{borderRadius:'var(--el-border-radius-round'}">
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



    </el-card>
  </el-main>
</el-container>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import router from "@/router";

const username=ref<String>("");
const password=ref<String>("");



function login()
{

}

function forgetPassword()
{

}

function goBack()
{
  router.back();
}
</script>

<style scoped>

</style>
