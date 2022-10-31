<template>
    <el-row justify="center">
      <el-space direction="vertical">
        <el-empty description="你好像走丢了？"/>
        <el-link @click="index" type="primary">点我回去</el-link>
      </el-space>
    </el-row>
</template>
<script lang="ts" setup>
import {onMounted} from "vue";
import router from "@/router";
onMounted(()=>{document.title="啊哦";})
function index(){router.push("/index");}
</script>

