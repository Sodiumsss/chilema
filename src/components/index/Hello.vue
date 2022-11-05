<template>
  <el-row justify="center">
              <span>
                {{ user.nickname }}，{{ getTime }}
              </span>
  </el-row>
  <el-carousel style="margin-top: 8px;" height="150px">
    <el-carousel-item v-for="i in 5" :key="i">
      <h3>{{i}}</h3>
    </el-carousel-item>
  </el-carousel>

  <el-row :gutter=20 justify="center" style="margin-top: 10px;">
    <el-col v-for="(item) in topObjects" :span="8">
      <el-card >
        <el-row justify="center">
          <el-space direction="vertical">
            <p>{{item.name}}</p>
            <div v-for="i in item.list">
              <a>#{{i.id}}.{{i.name}}</a>

            </div>

          </el-space>



        </el-row>
      </el-card>

    </el-col>

  </el-row>

</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue"
import * as func from "@/Set"
const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());


onMounted(()=>{

})

const topObjects=ref<Array<func.topObjects>>([]);

onMounted(()=>{

  if (func.test)
  {
    console.log('TestMode Open');
    for (let i=0;i<3;i++)
    {
      let tmp =new func.topObjects;

      tmp.name=("排行榜"+i.toString());
      for (let p=0;p<5;p++)
      {
        let tmp_ko :func.topObject = new func.topObject(i+p,((i+p)*5).toString());
        tmp.list.push(tmp_ko);
      }
      topObjects.value.push(tmp);
    }
  }


})


const getTime=computed(()=>{
  const hours = new Date().getHours();
  if (hours>=5 && hours<10){return '先随便看看今天的早餐推荐吧！';}
  if (hours>=10 && hours<=14) {return '先随便看看今天的午餐推荐吧！';}
  if (hours <19) {return '先随便看看今天的晚餐推荐吧！';}
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
