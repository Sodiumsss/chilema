<template>
  <el-skeleton animated :loading="loading">
    <template #default>
      <el-container>
        <el-container>
          <el-aside width="170px">
            <el-card class="aside-card">
              <el-row justify="center">
                <el-space direction="vertical">
                  <p v-text="user.nickname"/>

                  <el-link @click="goPost">发一条</el-link>
                  <el-link @click="exitHollow">离开树洞</el-link>
                </el-space>
              </el-row>
            </el-card>
          </el-aside>
          <el-main>
            <el-card class="main-card">
              <el-tabs v-model="activeName">
                <el-tab-pane label="最新" name="first">
                  <el-card shadow="hover" v-for="i in hollowList" class="singleThread">
                    <el-link style="font-size: large;">{{i.title}}</el-link>
                    <br/>
                    <el-row justify="start">
                      <el-col :span="3">
                        <el-tag class="threadTag">{{i.senderName}}</el-tag>
                      </el-col>
                      <el-col :span="15">
                        <el-tag type="danger" class="threadTag">点赞{{i.likes}}</el-tag>
                      </el-col>
                      <el-col :span="2">
                        <el-tag type="success" class="threadTag">回复{{i.reply}}</el-tag>
                      </el-col>
                      <el-col :span="4">
                        <el-tag type="info" class="threadTag">{{getDiffTime(i.createTime)}}</el-tag>
                      </el-col>
                    </el-row>


                  </el-card>
                </el-tab-pane>

                <el-tab-pane label="最热" name="second">
                  111
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
import * as func from "@/Set";
import {onMounted, ref} from "vue";
import router from "@/router";

const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());
const hollowList=ref<func.HollowThread[]>([]);
const activeName=ref<string>("first");
const loading =ref<boolean>(true);
onMounted(()=> {
      func.getUserByToken(func.getToken(initCookie)).then(r=>{
        user.value=func.createUserByData(r);

        if (user.value.hollow===0)
        {
          router.push('joinHollow');
        }
        else
        {
          func.getHollowByDesc(1,func.getToken(initCookie)).then(r=>{
            const callBack=func.getResult(r);

            hollowList.value=callBack.getData() as func.HollowThread[];

            loading.value=false;
          })
        }
      });
    });
const goPost=()=>{
  router.push('hollowPost');
}
const exitHollow=()=>{
  router.push('hello');
}


const getDiffTime=(oldTime : string)=>
{
  const nowDate=new Date().getTime();
  const oldDate=Date.parse(oldTime);
  const date=new Date(nowDate-oldDate);
  let backString ="";
  if(date.getFullYear()-1970>0)
  {
    backString+=date.getFullYear()+"年 ";

  }
  if (date.getMonth()>0)
  {
    backString+=date.getMonth()+"月 ";
  }
  if (date.getDate()>0)
  {
    backString+=date.getDate()+"天 ";
  }
  if (date.getHours()>0)
  {
    backString+=date.getHours()+"小时 ";
  }
  if (date.getMinutes()>0)
  {
    backString+=date.getMinutes()+"分钟";
  }
  console.log(backString)
  if (backString==="")
  {
    return "刚刚";
  }
  else
  {
    return backString+"前";

  }
}





</script>

<style scoped>
.el-container { height: 100%; background-color: #63BF8E }
.el-header, .el-footer {  text-align: center; line-height: 60px; }
.el-aside { margin-top: 20px;  }
.el-main {  }
.el-menu { background-color: #d3dce6; }
.aside-card{ margin-left: 10px;}
.main-card{ margin-left: 10px;}
p{
  margin-top: 5px;
  margin-bottom: 5px;
}
.singleThread{
  margin-bottom: 10px;
}
.threadTag{
  margin-right: 8px;
  margin-top: 5px
}
.el-card__body{
  padding: 5px;
}
.singleThreadTitle{

}
.singleThreadText{

}


</style>
