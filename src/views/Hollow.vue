<template>

    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-card class="aside-card">
            <el-row justify="center">
              <el-space direction="vertical">
                <p v-text="user.nickname"/>
                <p v-text="user.nickname"/>
                <p v-text="user.nickname"/>
                <p v-text="user.nickname"/>
                <p v-text="user.nickname"/>
                <el-link href="index">返回</el-link>
              </el-space>
            </el-row>

          </el-card>

        </el-aside>
        <el-main>

          <el-card class="main-card">
            <el-tabs v-model="activeName">
              <el-tab-pane label="最新" name="first">
                <el-card v-for="i in hollowList">
                  <p>{{i.title}}</p>
                  <br/>
                  <p>{{i.text}}</p>


                </el-card>


                <el-button @click="post">post</el-button>

              </el-tab-pane>
              <el-tab-pane label="最热" name="second">Config</el-tab-pane>

            </el-tabs>
          </el-card>

        </el-main>
      </el-container>
      <el-footer>footer</el-footer>
    </el-container>


</template>

<script lang="ts" setup>
import * as func from "@/Set";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import router from "@/router";

const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());
const hollowList=ref<func.HollowThread[]>([]);
const activeName=ref<string>("first");
onMounted(()=> {
      func.getUserByToken(func.getToken(initCookie)).then(r=>{
        user.value=func.createUserByData(r);
        if (user.value.hollow===0)
        {
          ElMessage.info({message:"你还没有开通树洞！",duration:2000});
          router.push('index');
        }
        else
        {
          func.getHollow(1).then(r=>{
            const callBack=func.getResult(r);
            hollowList.value=callBack.getData() as func.HollowThread[];
            console.log(hollowList.value);
          })
        }
      });




    });
const post = ()=>{
  let me = new func.HollowThread(null,user.value.id,user.value.nickname,"付服务费",0,0,0,
  null,"淑女失败睡吧睡吧想是多少的",null);
  me.post().then(r=>{
    console.log(r);
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

</style>
