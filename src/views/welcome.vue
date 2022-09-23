<template>
  <div class="main">
    <router-view/>
  </div>
</template>
<script lang="ts" setup>
import {onMounted} from "vue"
import * as myFunc from "@/myFunc";
const cookies = myFunc.getCookies();
import router from "@/router";

onMounted(()=>{
  if (!(cookies.isKey("username") && cookies.isKey("password")))
  {
    myFunc.clearAccountCookies(cookies);
  }
  router.push('guest');

})
</script>

<style scoped>
.main{
  background-color: bisque;
  height: 100%;
  width: 100%;
  position: fixed;
}
</style>
