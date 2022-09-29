<template>
  <div class="main">
      <el-container>
        <el-aside  style="margin-left: 10px; margin-top: 20px; width: 110px;">
          <el-scrollbar>
            <el-menu  :unique-opened=true @select="handleSelect"  default-active="main">
              <el-menu-item index="main">
                <template #title>首页</template>
              </el-menu-item>

              <el-sub-menu index="2">
                <template #title>推荐</template>
                <el-menu-item-group>
                  <template #title>G1</template>
                  <el-menu-item  index="2-1-1">1</el-menu-item>
                  <el-menu-item index="2-1-2">2</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-menu-item index="3">
                <template #title>食品查询</template>

              </el-menu-item>

              <el-menu-item index="editMyself">
                <template #title>个人信息</template>
              </el-menu-item>

              <el-menu-item index="quit">
                <template #title>登出</template>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>


        <el-main style="padding-top: 20px;">


          <el-card :style="{borderRadius:'var(--el-border-radius-round'}">

            <router-view/>

          </el-card>



        </el-main>

      </el-container>

      <el-footer style="position:fixed; bottom: 0; width: 100%; margin-bottom: 1px; padding: 0;"  >
        <el-card >
          <el-row  justify="center">
            <el-space >
              <el-link>关于我们</el-link>
              <el-link>反馈信息</el-link>
            </el-space>


          </el-row>

        </el-card>
      </el-footer>


  </div>

</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue"
import * as myFunc from "@/myFunc";
import router from "@/router";
import axios from "axios";
import qs from "qs";
import {Base64} from "js-base64";
import {ElMessage} from "element-plus";
import {clearAccountCookies} from "@/myFunc";

//功能
const cookies=myFunc.getCookies();
//信息
const username=ref<string>(cookies.get("username"));
const password=ref<string>(cookies.get("password"));
const nickName=ref<string>(cookies.get("nickname"));


//菜单
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  switch (key)
  {
    case 'main':
      router.push('main');
      break;
    case 'editMyself':
      router.push('editMyself');
      break;
    case 'quit':
      clearAccountCookies(cookies);
      router.push('guest');
      break;
  }
  //['1', '1-1-2']
}
watch((router.currentRoute),(value, oldValue)=>{
  console.log(value,oldValue);

})

onMounted(()=>{


  if (!(cookies.isKey("username") && cookies.isKey("password")))
  {
    myFunc.clearAccountCookies(cookies);
    router.push('guest');

  }
  else
  {
    const info=JSON.stringify(new myFunc.UserAccount(username.value,password.value));
    const data=Base64.encode (info);
    axios.post("http://"+myFunc.ip+":"+myFunc.port+"/api/user/getNickname",
        qs.stringify({'info':data}), {headers:{'Login':'yoyo!'}}).then((res :any)=>{
      const callBack=new myFunc.R(res);
      if (callBack.success())
      {
        const tmp = callBack.getMessage();
        if (tmp ==null)
        {
          ElMessage.error({message:"连接出错，请重新登录！",duration:2500});
          myFunc.clearAccountCookies(cookies);
          router.push('guest');
        }
        nickName.value=tmp;
        cookies.set("nickname", nickName.value,-1);
        router.push('main');

      }
      else
      {
        ElMessage.error({message:callBack.getMessage(),duration:2500});
        myFunc.clearAccountCookies(cookies);
        router.push('guest');
      }
    }).catch(()=>{
      ElMessage.error({message:"连接出错，请重新登录！",duration:2500});
      myFunc.clearAccountCookies(cookies);
      router.push('guest');
    });
  }
})

</script>

<style scoped>
.main{
  background:url("../assets/background.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>
