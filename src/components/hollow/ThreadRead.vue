<template>
  <el-skeleton animated :loading="loading">
    <template #default>
      <el-link @click="backHollow">树洞</el-link>
      <a style="margin-left: 10px;margin-right: 10px;">></a>
      <el-link @click="copyLink">当前帖子</el-link>
      <br/>
      <h2 style="margin-top: 5px;margin-bottom: 5px;">{{thisHollow.title}}</h2>
      <el-row :gutter="10" justify="start">
        <el-col :span="1.5">
          <el-button @click="like" size="small" plain>
            <a v-if="!thisHollow.beLike">给它点赞</a>
            <a v-if="thisHollow.beLike" >取消点赞</a>
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button @click="replyVisible=true" size="small" plain>
            回复
          </el-button>
        </el-col>

        <el-col :span="15">
          <el-tag  class="threadTag">帖主：{{thisHollow.senderName}}</el-tag>
        </el-col>

        <el-col :span="1.5">
          <el-tag type="danger" class="threadTag">赞{{thisHollow.likes}}</el-tag>
        </el-col>

        <el-col :span="1.5">
          <el-tag type="success" class="threadTag">回复{{thisHollow.reply}}</el-tag>
        </el-col>
        <el-col :span="2">
          <el-tag type="info" class="threadTag">{{getDiffTime(thisHollow.createTime)}}</el-tag>
        </el-col>
      </el-row>
      <el-divider/>
      {{thisHollow.text}}
      <el-divider/>
      <el-card shadow="never" v-for="(i,index) in thisReplyList" class="singleReply">
        <el-row style="margin-bottom: 2px;" :gutter="10" justify="space-between">
          <el-col :span="19">
            <el-link style="font-size: medium">
              {{i.senderName}}
            </el-link>
          </el-col>
          <el-col :span="4">
            <a style="font-size: smaller" v-text="getDiffTime(i.createTime)" />
          </el-col>
          <el-col :span="1">
            #{{index+1}}
          </el-col>
        </el-row>

        <a style="margin-left: 12px;">{{i.text}}</a>
      </el-card>

      <el-dialog v-model="replyVisible">
        <template #header>回复内容</template>
        <el-input type="textarea" v-model="replyText"></el-input>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="replyVisible = false">取消</el-button>
        <el-button type="primary"  @click="reply">
          发送
        </el-button>
      </span>
        </template>
      </el-dialog>
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
import * as func from "@/Set"
import {onMounted, ref} from "vue";
import router from "@/router";
import {ElMessage, ElNotification} from "element-plus";

const thisPage=func.getThis();
const initCookie=func.initCookie();
const loading =ref<boolean>(true);
const threadId=ref<number>(-1);
const thisHollow = ref <func.HollowThread>(new func.HollowThread());
const thisHollowWithReply =ref<func.HollowThreadWithReply>(new func.HollowThreadWithReply());
const user=ref<func.User>(new func.User);
const replyVisible=ref<boolean>(false);
const replyText=ref<string>("");
const thisReplyList=ref<func.HollowReply[]>([]);
onMounted(()=>{
  threadId.value=thisPage.$route.query.pageId;
  if (threadId.value===0)
  {
   router.push('hollow');
  }
  else
  {
    user.value=JSON.parse(<string>sessionStorage.getItem('user')) as func.User;
    const UWH=new func.UserIDWithHollowID(threadId.value,user.value.id);

    func.getSingleHollow(UWH,func.getToken(initCookie)).then(r=>{
      if (r.data==="")
      {
        func.clearToken(initCookie);
        ElMessage.error({message:"请重新登录！",duration:2000});
        router.push('guest');
        return;
      }
      const callBack=func.getResult(r);
      thisHollowWithReply.value=callBack.getData() as func.HollowThreadWithReply;
      thisHollow.value=thisHollowWithReply.value.hollowThread;
      thisReplyList.value=thisHollowWithReply.value.hollowReplyList;
      loading.value=false;
    })
  }
})
const backHollow=()=>{
  router.push('hollow');
}
const reply=()=>{
  const object = new func.UserHollowText(user.value.id,threadId.value,replyText.value,user.value.nickname);
  func.reply(object,func.getToken(initCookie)).then(r=>{
    if (r.data==="")
    {
      func.clearToken(initCookie);
      ElMessage.error({message:"请重新登录！",duration:2000});
      router.push('guest');
      return;
    }
    const callBack = func.getResult(r);
    if (callBack.success())
    {
      ElMessage.success({message:"回复成功！",duration:2000});
      const temp = new func.HollowReply(-1,
          -1,-1,getDiffTime(new Date().toString()),replyText.value,user.value.nickname);
      thisReplyList.value.push(temp);
      replyText.value="";
      replyVisible.value = false;
    }
    else
    {
      ElMessage.success({message:"回复失败！",duration:2000});

    }

  }).catch(r=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});
  })
}
const like=()=>{
  if (thisHollow.value.beLike === false)
  {
    const userIDWithHollowID = new func.UserIDWithHollowID(thisHollow.value.id,user.value.id);
    func.setLike(userIDWithHollowID,func.getToken(initCookie)).then(r=>{
      if (r.data==="")
      {
        func.clearToken(initCookie);
        ElMessage.error({message:"请重新登录！",duration:2000});
        router.push('guest');
        return;
      }
      const callBack=func.getResult(r);
      if (callBack.success())
      {
        thisHollow.value.beLike=true;
        ElNotification.success({message:"点赞成功！",duration:1000,showClose:false});
        thisHollow.value.likes++;
      }
      else
      {
        ElNotification.error({message:"点赞失败！",duration:1000,showClose:false});
      }
    }).catch(r=>{
      ElNotification.error({message:"网络连接错误！",duration:1000,showClose:false});

    })
  }
  else if (thisHollow.value.beLike === true)
  {
    const userIDWithHollowID = new func.UserIDWithHollowID(thisHollow.value.id,user.value.id);
    func.cancelLike(userIDWithHollowID,func.getToken(initCookie)).then(r=>{

      const callBack=func.getResult(r);
      if (callBack.success())
      {
        thisHollow.value.beLike=false;
        ElNotification.success({message:"已取消点赞！",duration:1000,showClose:false});
        thisHollow.value.likes--;
      }
      else
      {
        ElNotification.error({message:"取消点赞失败！",duration:1000,showClose:false});
      }
    }).catch(r=>{
      ElNotification.error({message:"网络连接错误！",duration:1000,showClose:false});

    })
  }





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
.singleReply{
  margin-bottom: 8px;
}
</style>
