<template>
    <el-row justify="center">
      <el-space direction="vertical">
        <el-empty description="你好像走丢了？"/>
        <el-link @click="index" type="primary">点我回去</el-link>

      </el-space>
    </el-row>
</template>
<script lang="ts" setup>
import {onMounted} from "vue";
import router from "@/router";
import * as func from "@/Set"
import {User} from "@/Set";

onMounted(()=>{document.title="啊哦";test();})
function index(){router.push("/index");}

function test()
{
  // let user = new User("2","1");
  // user.setCookies();
  //
  // let cookiesUser = new User();
  // cookiesUser.loadByCookies();
  //
  // console.log(user);
  // console.log(cookiesUser);
  //
  // func.validateCookies().then((res)=>{
  //   console.log(func.getResult(res))
  // })


}
</script>

