<template>

  <el-tabs v-model="activeName">
    <el-tab-pane label="最新" name="first">
      <el-card shadow="hover" v-for="i in hollowList" class="singleThread">
        <el-link @click="joinThread(i.id)" style="font-size: large;">{{i.title}}</el-link>
        <br/>
        <el-row justify="start">
          <el-col :span="17">
            <el-tag class="threadTag">{{i.senderName}}</el-tag>
          </el-col>
          <el-col :span="1.5">
            <el-tag type="danger" class="threadTag">点击{{i.clicks}}</el-tag>
          </el-col>
          <el-col :span="1.5">
            <el-tag type="danger" class="threadTag">赞{{i.likes}}</el-tag>
          </el-col>

          <el-col :span="1.5">
            <el-tag type="success" class="threadTag">回复{{i.reply}}</el-tag>
          </el-col>
          <el-col :span="2">
            <el-tag type="info" class="threadTag">{{getDiffTime(i.createTime)}}</el-tag>
          </el-col>
        </el-row>


      </el-card>
    </el-tab-pane>

    <el-tab-pane label="最热" name="second">
      好冷
    </el-tab-pane>
  </el-tabs>
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

onMounted(()=>{
  func.getHollowByDesc(1,func.getToken(initCookie)).then(r=>{
    const callBack=func.getResult(r);

    hollowList.value=callBack.getData() as func.HollowThread[];

    loading.value=false;
  })
}

)


const joinThread=(id : any)=>
{
  router.push({path:'/threadRead',query:{pageId:id}});

}

const getDiffTime=(oldTime : string)=>
{
  const nowDate=new Date();
  const oldDate=new Date(oldTime);
  const times=nowDate.getTime()-oldDate.getTime();
  const days = Math.floor(times / (24 * 1000 * 3600));
  const leave = times % (24 * 3600 * 1000);
  const h=Math.floor(leave/(3600*1000));
  const h_leave=leave%(3600*1000);
  const min=Math.floor( h_leave/(60*1000));
  let backString ="";
  if (days>0)
  {
    backString+=days+"天 ";
  }
  if (h>0)
  {
    backString+=h+"小时 ";
  }
  if (min>0)
  {
    backString+=min+"分钟";
  }
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

</style>
