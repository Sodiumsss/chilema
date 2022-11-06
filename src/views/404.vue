<template>
    <el-row justify="center">
      <el-space direction="vertical">
        <el-empty description="你好像走丢了？"/>
        <el-link @click="index" type="primary">点我回去</el-link>

      </el-space>
    </el-row>
</template>
<script lang="ts" setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import * as func from "@/Set"
const initCookie=func.initCookie();
const jumpPage=ref<string>("");

onMounted(()=>{
  document.title="啊哦";
  if (func.existToken(initCookie))
  {
    jumpPage.value='/hello';
  }
  else
  {
    jumpPage.value='/guest'
  }
})
function index(){router.push(jumpPage.value);}


</script>

