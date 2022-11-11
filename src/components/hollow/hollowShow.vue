<template>
  <el-skeleton animated :loading="loading">
    <template #default>
      <el-tabs v-model="activeName">
        <el-tab-pane label="最新" name="first">
          <el-card shadow="hover" v-for="i in hollowList" class="singleThread">
            <el-link @click="joinThread(i.id)" style="font-size: large;">{{i.title}}</el-link>
            <br/>
            <el-row justify="start">
              <el-col :span="12">
                <el-tag v-if="i.userId===user.id"  class="threadTag">你发送的</el-tag>
                <el-tag v-if="i.userId!==user.id" type="warning" class="threadTag">由{{i.senderName}}发送</el-tag>
              </el-col>
              <el-col :span="12">
                <el-row justify="end">
                    <el-tag class="threadTag">{{i.clicks}}点击</el-tag>
                    <el-tag type="danger" class="threadTag">{{i.likes}}赞</el-tag>
                    <el-tag type="success" class="threadTag">{{i.reply}}回复</el-tag>
                  <el-tag v-if="i.updateTime==null" type="info" class="threadTag">{{getDiffTime(i.createTime)}}发表</el-tag>
                  <el-tag v-if="i.updateTime!==null" type="info" class="threadTag">{{getDiffTime(i.updateTime)}}有人回复</el-tag>
                </el-row>

              </el-col>


            </el-row>
          </el-card>
          <el-pagination v-model:current-page="nowPage" :page-size="5"
                         :total="size" layout="total, prev, pager, next" @current-change="currentChange"/>
        </el-tab-pane>
        <el-tab-pane label="最热" name="second">
          好冷
        </el-tab-pane>
      </el-tabs>


    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
import * as func from "@/Set";
import {onMounted, ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";

const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());
const hollowList=ref<func.HollowThread[]>([]);
const activeName=ref<string>("first");
const loading =ref<boolean>(true);
const nowPage=ref<number>(1);
const size=ref<number>(-1);


onMounted(()=>{
      if (!func.existToken(initCookie))
      {
        localStorage.clear();
        router.push('guest');
      }
      else
      {
        const item = localStorage.getItem("user");
        if (item==null)
        {
          func.clearToken(initCookie);
          ElMessage.error({message:"请重新登录！",duration:2000});
        }
        else
        {
          user.value=JSON.parse(localStorage.getItem("user") as string)as func.User;
          if (user.value.hollow===0)
          {
            router.push('joinHollow');
          }
          else
          {

            func.getHollowByDesc(nowPage.value,func.getToken(initCookie)).then(r=>{
              if (r.data==="")
              {
                func.clearToken(initCookie);
                ElMessage.error({message:"请重新登录！",duration:2000});
                router.push('guest');
                return;
              }
              const callBack=func.getResult(r);
              hollowList.value=callBack.getData() as func.HollowThread[];
              console.log(hollowList.value)
              size.value=Number(callBack.getMessage());
              loading.value=false;
            })

          }
        }
      }


}

)
const currentChange=()=>{
  loading.value=true;
  func.getHollowByDesc(nowPage.value,func.getToken(initCookie)).then(r=>{
    if (r.data==="")
    {
      func.clearToken(initCookie);
      ElMessage.error({message:"请重新登录！",duration:2000});
      router.push('guest');
      return;
    }
    const callBack=func.getResult(r);

    hollowList.value=callBack.getData() as func.HollowThread[];
    size.value=Number(callBack.getMessage());
    loading.value=false;
  })
}

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
    backString+=days+"天";
  }
  if (h>0)
  {
    backString+=h+"小时";
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
