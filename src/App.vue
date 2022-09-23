<template>
  <router-view/>
</template>


<script lang="ts" setup>

import {onMounted} from "vue";
import router from "@/router";
import * as myFunc from "@/myFunc";
const cookies = myFunc.getCookies();
onMounted(()=>
{
  if (!(cookies.isKey("username") && cookies.isKey("password")))
  {
    myFunc.clearAccountCookies(cookies);
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
