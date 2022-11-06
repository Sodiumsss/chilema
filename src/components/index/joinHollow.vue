<template>
  <el-row justify="center">
    <h2>在进入之前，你需要同意我们的规则</h2>
    <el-divider style="margin-top: 5px;margin-bottom: 5px;" />
  </el-row>
  <el-row justify="center">
    <el-space direction="vertical">
      <div >
        <p>1.xxxxxxxxx</p>
        <p>2.xxxxxxxxxxx</p>
        <p>3.xxxxxxxxxxxxx</p>
        <p>4.xxxxxxxxxxxxxxxx</p>
        <p>5.xxxxxxxxxxxxxxxxxxx</p>
      </div>
      <div>
        <el-button @click="join">同意并进入</el-button>
      </div>
    </el-space>
  </el-row>
</template>




<script lang="ts" setup>
import * as func from "@/Set"
import {onMounted, ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";

const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());

const join = ()=>{
  func.joinHollow(func.getToken(initCookie)).then((res)=>{
    if (res.data==="")
    {
      func.clearToken(initCookie);
      ElMessage.error({message:"请重新登录！",duration:2000});
      router.push('guest');
      return;
    }
    const callBack= func.getResult(res);
    if (callBack.success())
    {
      ElMessage.success({message:"开通成功！",duration:2000});
      router.push('hollow');
    }
    else
    {
      ElMessage.error({message:"开通失败，请联系管理员！",duration:2000});
    }
  }).catch(()=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});
  })
}


onMounted(()=>{
  func.getUserByToken(func.getToken(initCookie)).then((r)=>{
    user.value=func.createUserByData(r);
    if(user.value.hollow)
    {
      router.push('hollow');
    }
  })



})
</script>

<style scoped>
h2{
  margin: 0;
}
p
{
  margin: 2px;
}

</style>
