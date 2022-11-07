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

                  <el-link @click="sendVisible = true">发一条</el-link>
                  <el-link @click="exitHollow">离开树洞</el-link>
                </el-space>
              </el-row>
            </el-card>
          </el-aside>
          <el-main>
            <el-card class="main-card">
              <router-view/>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
      <el-dialog v-model="sendVisible">
        <template #header>想要聊点什么......？</template>

        <template #default>
          标题<el-input show-word-limit maxlength="35"  v-model="sendTitle"></el-input>
          <br/><br/>
          内容<el-input type="textarea" v-model="sendText"></el-input>
        </template>

        <template #footer>
      <span class="dialog-footer">
        <el-button @click="sendVisible = false">取消</el-button>
        <el-button type="primary" @click="sendThread">
          发送
        </el-button>
      </span>
        </template>
      </el-dialog>
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
import * as func from "@/Set";
import {onMounted, ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {createUserByData} from "@/Set";
const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());
const loading =ref<boolean>(true);
const sendVisible=ref<boolean>(false);
const sendTitle=ref<string>("");
const sendText=ref<string>("");
onMounted(()=> {
  document.title='树洞';
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
            loading.value=false;
            router.push('hollow');
          }
        }
      }
    });

const exitHollow=()=>{
  router.push('hello');
}
const sendThread=()=>{
  let me = new func.HollowThread(null,null,"",sendTitle.value,0,0,0,
      null,sendText.value,null);
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
      router.push({path:'/r',query:{j:'hollow'}});

    }
    else
    {
      ElMessage.success({message:"发送失败！",duration:2000});

    }
  }).catch(()=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});
  }).finally(()=>{
    sendVisible.value = false;
  })
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
