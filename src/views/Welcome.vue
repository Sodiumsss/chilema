<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue"
import * as func from "@/Set"
import router from "@/router";

const initCookie=func.initCookie();
onMounted(()=>{
  document.title='吃了吗';
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
<style scoped>
.main{
  background-color: bisque;
  height: 100%;
  width: 100%;
  position: fixed;
}
</style>
