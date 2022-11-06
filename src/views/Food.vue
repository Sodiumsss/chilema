<template>
  <el-container class="big-container">
    <el-main>
      <el-card class="main-card">
  <el-skeleton :loading="loading" style="width: 100%">
    <template #template>
      <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
      <div style="padding: 14px">
        <el-skeleton-item variant="p" style="width: 50%" />
        <div style="display: flex;align-items: center;">
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
    <template #default>
      <el-link @click="backHello">首页</el-link>
      <a style="margin-left: 10px;margin-right: 10px;">></a>
      <el-link @click="copyLink">食物介绍页</el-link>
      <br/>
      <el-image style="width: 200px;height: 200px;" :src="src">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
    </template>
  </el-skeleton>
      </el-card>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import * as func from "@/Set"
import {onMounted, ref} from "vue";
import router from "@/router";
import {ElNotification} from "element-plus";
const initCookie = func.initCookie();
const loading =ref<boolean>(true);
const food = ref <func.food>(new func.food());

onMounted(()=>{
  func.getSingleFood("1589211115087257601",func.getToken(initCookie)).then(r=>{
    console.log(r);
  }).catch(r=>{

  })
})
const backHello = ()=>{
  router.push('hello');
}
const copyLink=()=>{
  let input = document.createElement("input"); // 创建input对象
  input.value = window.location.href; // 设置复制内容
  document.body.appendChild(input); // 添加临时实例
  input.select(); // 选择实例内容
  document.execCommand("Copy"); // 执行复制
  document.body.removeChild(input); // 删除临时实例
  ElNotification.success({message:"已复制链接！",duration:1000,showClose:false});
}
</script>

<style scoped>
.big-container{
  background-color: #63BF8E;
}
.el-container { height: 100%;}
</style>
