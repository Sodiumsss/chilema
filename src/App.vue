<template>
  <router-view/>
</template>


<script lang="ts" setup>
import {onMounted} from "vue"
import * as func from "@/Set"
import router from "@/router";

const initCookie=func.initCookie();
onMounted(()=>{
  if (func.existCookies(initCookie)===-1)
  {
    func.clearCookies(initCookie);
    router.push('guest');

  }

})
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0;
}


</style>
