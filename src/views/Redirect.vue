<template>

</template>

<script lang="ts" setup>
import * as func from "@/Set"
import {onMounted, ref} from "vue";
import router from "@/router";
const jumpName=ref<string>("");


const thisPage=func.getThis();
onMounted(()=>{
  console.log("redirect!");
  jumpName.value=thisPage.$route.query.j;
  router.push(jumpName.value);

})

</script>

<style scoped>

</style>
