<template>
    <h1 style="text-align: center;">你好像走丢了？</h1>
    <h2 style="text-align: center;">∑(っ°Д°;)っ</h2>
    <el-row justify="center"><el-link @click="index" type="primary">点我回去</el-link></el-row>
</template>
<script lang="ts" setup>
import {onMounted} from "vue";
import router from "@/router";
onMounted(()=>{document.title="啊哦";})
function index(){router.push("/");}
</script>

