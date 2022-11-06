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
              <router-view/>
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
const loading =ref<boolean>(true);
onMounted(()=> {
      func.getUserByToken(func.getToken(initCookie)).then(r=>{
        user.value=func.createUserByData(r);
        sessionStorage.setItem('user',JSON.stringify(user.value));
        if (user.value.hollow===0)
        {
          router.push('joinHollow');
        }
        else
        {
          loading.value=false;
          router.push('hollow');
        }
      });
    });
const goPost=()=>{
  router.push('hollowPost');
}
const exitHollow=()=>{
  router.push('hello');
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
