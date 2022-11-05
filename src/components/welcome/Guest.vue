<template>
  <el-container>
    <el-main>
      <el-card :style="{borderRadius:'var(--el-border-radius-round'}">
            <el-row  justify="center">
              <p v-text="getText"></p>
              <el-divider class="divider"></el-divider>
              <el-row justify="center">
                <el-button @click="jump(1)">创建账号</el-button>
                <el-button @click="jump(2)">登录账号</el-button>
              </el-row>
            </el-row>
      </el-card>
    </el-main>
  </el-container>

</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import router from "@/router";
import * as func from "@/Set"
import {User} from "@/Set";

const initCookie = func.initCookie();
const user = ref<func.User>(new User());
onMounted(()=>
{
  if (func.existToken(initCookie))
  {
    router.push('index');
  }
})

const getText=computed(()=>{
  if (func.isAlready(initCookie))
  {
    return '嘿，朋友，别来无恙啊！';
  }
  else
  {
    return '初次见面，请多关照！';
  }
})




function jump(type :number)
{
  if(type===1) {router.push('create');}
  else if (type===2) {router.push('login');}
}
</script>

<style scoped>

.divider{
  margin-top: 10px;margin-bottom: 10px;
}

</style>
