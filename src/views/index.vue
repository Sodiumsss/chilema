<template>
  {{ username }}
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue"
import * as myFunc from "@/myFunc";
import router from "@/router";
const my=myFunc.getThis();

const username=ref<string>("");
onMounted(()=>{
  if (!(my.$cookies.isKey("username") && my.$cookies.isKey("password")))
  {
    my.$cookies.remove("username");
    my.$cookies.remove("password");
    router.push('guest');
  }
  else
  {
    username.value=my.$cookies.get("username");
    console.log(username.value)
  }

})

</script>

<style scoped>

</style>
