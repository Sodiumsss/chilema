<template>
  <el-container>
      <el-main>
        <el-card class="main-card">

          <a>标题</a>
          <br/><br/>
          <el-input show-word-limit maxlength="35" v-model="title"/>
          <el-divider/>
          <a>内容</a>
          <br/><br/>
          <el-input v-model="text" type="textarea"/>
          <el-row style="margin-top: 20px;" justify="center">
            <el-button @click="post">发送</el-button>
            <el-button @click="back">取消</el-button>
          </el-row>
        </el-card>

      </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import * as func from "@/Set"
import {ElMessage} from "element-plus";
const title=ref<string>("");
const text=ref<string>("");
const initCookie=func.initCookie();

const back=()=>
{
  router.push('hollow');
}
const post = ()=>{
  let me = new func.HollowThread(null,null,"",title.value,0,0,0,
      null,text.value,null);
  me.post(func.getToken(initCookie)).then(r=>{
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
      ElMessage.success({message:"发送成功！",duration:2000});
      router.push('hollow');
    }
    else
    {
      ElMessage.success({message:"发送失败！",duration:2000});

    }
  }).catch(()=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});
  })

}

</script>
<style scoped>
.el-container { height: 100%; background-color: #63BF8E }

</style>
