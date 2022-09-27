<template>

  <el-row justify="center">
              <span>
                {{ nickname }}，{{getTime}}
              </span>
  </el-row>
  <el-carousel style="margin-top: 8px;" height="150px">
    <el-carousel-item v-for="i in 5" :key="i">
      <h3>{{i}}</h3>
    </el-carousel-item>
  </el-carousel>

  <el-row justify="center" style="margin-top: 15px;">
    <el-space>

    </el-space>
  </el-row>

</template>

<script lang="ts" setup>
import {computed, ref} from "vue"
import * as myFunc from "@/myFunc";
//功能
const cookies=myFunc.getCookies();
//信息
const nickname=ref<string>(cookies.get("nickname"));

const getTime=computed(()=>{
  const hours = new Date().getHours();
  if (hours>=5 && hours<10){return '先随便看看今天的早餐推荐吧！';}
  if (hours>=10 && hours<=14) {return '先随便看看今天的午餐推荐吧！';}
  if (hours <19) {return '先随便看看今天的午餐推荐吧！';}
  return '夜深了，你在想明天要吃什么吗？'
});
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
