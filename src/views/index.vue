<template>
  <div class="main">

    <el-container>




        <el-header style="padding: 5px;">
          <el-card :style="{borderRadius:'var(--el-border-radius-round'}">

            <el-row justify="center">
              Hi,{{nickname}}
            </el-row>

          </el-card>
        </el-header>
        <el-aside :style="{borderRadius:'var(--el-border-radius-round'}" style="margin-left: 5px; margin-top: 20px;" width="200px">
          <el-scrollbar>
            <el-menu :unique-opened=true @select="handleSelect"  default-active="1-1-1">
              <el-sub-menu index="1">
                <template #title>推荐</template>
                <el-menu-item-group>
                  <template #title>G1</template>
                  <el-menu-item  index="1-1-1">1</el-menu-item>
                  <el-menu-item index="1-1-2">2</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                  <template #title>G2</template>
                  <el-menu-item index="1-2-1">3</el-menu-item>
                  <el-menu-item index="1-2-2">4</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="2">
                <template #title>食品</template>
                <el-menu-item-group>
                  <template #title>G1</template>
                  <el-menu-item index="2-1-1">1</el-menu-item>
                  <el-menu-item index="2-1-2">2</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-menu-item index="3">
                <template #title>个人信息</template>
              </el-menu-item>

              <el-menu-item index="4">
                <template #title>登出</template>
              </el-menu-item>



            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>

        </el-main>

      </el-container>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue"
import * as myFunc from "@/myFunc";
import router from "@/router";
import axios from "axios";
import qs from "qs";
import {Base64} from "js-base64";
import {ElMessage} from "element-plus";
const my=myFunc.getThis().$cookies;

const username=ref<string>(my.get("username"));
const password=ref<string>(my.get("password"));
const nickname=ref<string>(my.get("nickname"));

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  //['1', '1-1-2']
}


onMounted(()=>{
  if (!(my.isKey("username") && my.isKey("password")))
  {
    router.push('guest');
  }
  else
  {
    const info=JSON.stringify(new myFunc.UserAccount(username.value,password.value));
    const data=Base64.encode (info);
    axios.post("http://"+myFunc.ip+":"+myFunc.port+"/api/user/getNickname",
        qs.stringify({'info':data}), {headers:{'Login':'yoyo!'}}).then((res :any)=>{
      const callBack=new myFunc.R(res);
      console.log(callBack)
      if (callBack.success())
      {
        const tmp = callBack.getMessage();
        if (tmp ==null)
        {
          ElMessage.error({message:"连接出错，请重新登录！",duration:2500});
          my.remove("username");
          my.remove("password");
          my.remove("nickname")
          router.push('guest');
        }
        nickname.value=tmp;
        my.set("nickname",nickname.value,-1);

      }
      else
      {
        ElMessage.error({message:callBack.getMessage(),duration:2500});
        my.remove("username");
        my.remove("password");
        my.remove("nickname")
        router.push('guest');
      }
    }).catch(()=>{
      ElMessage.error({message:"连接出错，请重新登录！",duration:2500});
      my.remove("username");
      my.remove("password");
      my.remove("nickname")
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
.card{
  opacity: 0.85;
}
</style>
