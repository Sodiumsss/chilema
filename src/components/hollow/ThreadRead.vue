<template>
  <el-skeleton animated :loading="loading">
    <template #default>
      <el-link @click="backHollow">树洞</el-link>
      <a style="margin-left: 10px;margin-right: 10px;">></a>
      <el-link @click="copyLink">当前帖子 </el-link>
      <br/>
      <h2 style="margin-top: 5px;margin-bottom: 5px;">{{thisHollow.title}}</h2>
      <el-row :gutter="10" justify="start">
        <el-col :span="1.5">
          <el-button size="small" plain>赞</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button size="small" plain>踩</el-button>
        </el-col>
        <el-col :span="16">
          <el-tag class="threadTag">{{thisHollow.senderName}}</el-tag>
        </el-col>



        <el-col :span="1.5">
          <el-tag type="danger" class="threadTag">赞{{thisHollow.likes}}</el-tag>
        </el-col>

        <el-col :span="1.5">
          <el-tag type="success" class="threadTag">回复{{thisHollow.reply}}</el-tag>
        </el-col>
        <el-col :span="3">
          <el-tag type="info" class="threadTag">{{getDiffTime(thisHollow.createTime)}}</el-tag>
        </el-col>
      </el-row>
      <el-divider/>
      {{thisHollow.text}}

    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
import * as func from "@/Set"
import {onMounted, ref} from "vue";
import router from "@/router";
import {ElNotification} from "element-plus";
const thisPage=func.getThis();
const initCookie=func.initCookie();
const loading =ref<boolean>(true);
const threadId=ref<number>(-1);
const thisHollow = ref <func.HollowThread>(new func.HollowThread());
onMounted(()=>{
  threadId.value=thisPage.$route.query.pageId;
  if (threadId.value===0)
  {
   router.push('hollow');
  }
  else
  {
    func.getSingleHollow(threadId.value,func.getToken(initCookie)).then(r=>{
      const callBack=func.getResult(r);
      thisHollow.value=callBack.getData() as func.HollowThread;
      loading.value=false;

    })
  }
})
const backHollow=()=>{
  router.push('hollow');
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

const copyLink=()=>{
  let input = document.createElement("input"); // 创建input对象
  input.value = window.location.href; // 设置复制内容
  document.body.appendChild(input); // 添加临时实例
  input.select(); // 选择实例内容
  document.execCommand("Copy"); // 执行复制
  document.body.removeChild(input); // 删除临时实例
  ElNotification.success({message:"已复制链接！",duration:1000,showClose:false});
}
</script>

<style scoped>
.el-container { height: 100%; background-color: #63BF8E }

</style>
