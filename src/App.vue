<template>
  <router-view/>
</template>


<script lang="ts" setup>
import {onMounted} from "vue";
import router from "@/router";
import * as func from "@/Set"

const initCookie=func.initCookie();
onMounted(()=>{
  if (!func.existToken(initCookie))
  {
    router.push('guest');
  }
  else
  {
    router.push('hello');
  }
})
</script>

<style>
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0;
}


</style>
