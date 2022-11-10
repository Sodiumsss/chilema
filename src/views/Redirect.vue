<template>

</template>

<script lang="ts" setup>
import * as func from "@/Set"
import {onMounted, ref} from "vue";
import router from "@/router";
const jumpName=ref<string>("");


const thisPage=func.getThis();
onMounted(()=>{
  jumpName.value=thisPage.$route.query.j;
  console.log("let's go to "+jumpName.value)
  router.push(jumpName.value);

})

</script>

<style scoped>

</style>
