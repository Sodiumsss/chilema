<template>

  <div class="main">
    <router-view/>

  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue"
import * as myFunc from "@/myFunc";
const my=myFunc.getThis();
import router from "@/router";

onMounted(()=>{

  if (!(my.$cookies.isKey("username") && my.$cookies.isKey("password")))
  {
    console.log("test by welcome");

    my.$cookies.remove("username");
    my.$cookies.remove("password");
    my.$cookies.remove("nickname");

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
