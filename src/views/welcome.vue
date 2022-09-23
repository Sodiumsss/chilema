<template>

  <div class="main">
    <router-view/>

  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue"
import * as myFunc from "@/myFunc";
import router from "@/router";
const my=myFunc.getThis();

onMounted(()=>{

  if (!(my.$cookies.isKey("username") && my.$cookies.isKey("password")))
  {
    my.$cookies.remove("username");
    my.$cookies.remove("password");
    router.push('guest');
  }
  else
  {
    router.push('index');
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
