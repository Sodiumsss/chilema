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
            aa
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

onMounted(()=>
    {
      func.userInit(user.value,initCookie).then(r=>{
        user.value=r as func.User;
        if (!user.value.hollow)
        {
          ElMessage.error({message:"你还没有开通树洞！",duration:2000});
          router.push('index');
        }
      });




    }



)


</script>

<style scoped>
.el-container { height: 100%; background-color: bisque }
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
