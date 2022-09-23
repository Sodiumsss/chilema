<template>
  <el-container>
    <el-main>
      <el-card :style="{borderRadius:'var(--el-border-radius-round'}">
        <el-row v-if="!showCreatePage" justify="center">
          <h1>嗨，{{getTime}}</h1>
          <el-divider class="divider"></el-divider>
          <el-button @click="roll" round>没呢！</el-button>

          <el-button @click="test" round>Test！</el-button>

        </el-row>

          <div v-if="showCreatePage">
            <el-row  justify="center">
              <p v-text="getText"></p>
              <el-divider class="divider"></el-divider>
              <el-row justify="center">
                <el-button @click="jump(1)">创建账号</el-button>
                <el-button @click="jump(2)">登录账号</el-button>
              </el-row>
            </el-row>
          </div>
      </el-card>
    </el-main>
  </el-container>

</template>

<script lang="ts" setup>
import {ref,computed} from "vue";
import router from "@/router";
import * as myFunc from "@/myFunc"
import axios from "axios";
import qs from "qs";
const cookies = myFunc.getCookies();
const showCreatePage=ref<boolean>(false);
const getTime=computed(()=>{
  const hours = new Date().getHours();
  if (hours>=6 && hours<10){return '吃早饭了吗？';}
  if (hours>=10 && hours<=14) {return '吃午饭了吗？';}
  if (hours>14 && hours <=16) {return '想好晚饭吃什么了吗？';}
  if (hours >16) {return '吃晚饭了吗？';}
  if (hours >=21) {return '要吃夜宵吗？';}
  return '吃了吗？';
})

const getText=computed(()=>{
  if (cookies.isKey("already"))
  {
    return '嘿，朋友，别来无恙啊！';
  }
  else
  {
    return '你好像是第一次使用，让我了解一下你的口味！';
  }
})


function roll()
{
  if (!(cookies.isKey("username") && cookies.isKey("password")))
  {
    myFunc.clearAccountCookies(cookies);
    showCreatePage.value=true;
  }
  else
  {
    router.push('index');
  }

}
function test()
{
  const step1=ref([0,0,0,0]);
  const step2=ref([0,0,0]);
  const step3=ref([false,false,false]);
  const step4=ref([0,0,0]);
  const par1=new myFunc.Favor("111",step1.value,step2.value,step3.value,step4.value);


  console.log(par1);

  axios.post("http://"+myFunc.ip+":"+myFunc.port+"/api/user/test", qs.stringify({'a':JSON.stringify(par1)})).then(()=>{
  });

}

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
