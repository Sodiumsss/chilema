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

  if (!my.$cookies.isKey("username"))
  {
    router.push('guest')
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
