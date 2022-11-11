<template>

      <el-container class="big-container">
        <el-container>
          <el-aside class="aside">
            <el-scrollbar>
              <el-menu :unique-opened=true @select="handleSelect"  default-active="hello">
                <el-menu-item index="hello">
                  <template #title>首页</template>
                </el-menu-item>
                <el-sub-menu index="2">
                  <template #title>吃！</template>
                  <el-menu-item index="search">
                    <template #title>食品查询</template>
                  </el-menu-item>
                  <el-menu-item index="suggest">
                    <template #title>获取推荐</template>
                  </el-menu-item>
                  <el-menu-item index="contribute">
                    <template #title>贡献</template>
                  </el-menu-item>
                </el-sub-menu>

                  <el-menu-item index="hollow">
                    <template #title>树洞</template>
                  </el-menu-item>
                <el-menu-item index="profile">
                  <template #title>账号管理</template>
                </el-menu-item>

                <el-menu-item index="quit">
                  <template #title>登出</template>
                </el-menu-item>

              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-main class="main">
            <el-card>
              <router-view/>
            </el-card>
          </el-main>
        </el-container>
        <el-footer class="footer">
          <el-row justify="center">
            <el-space spacer="|">
              <el-link style="color: black" @click="aboutUs">加入我们</el-link>
              <el-link style="color: black" @click="userReport">反馈信息</el-link>
              <el-link style="color: black" @click="contract">联系管理员</el-link>

            </el-space>
          </el-row>
        </el-footer>

      </el-container>

</template>

<script lang="ts" setup>
import router from "@/router";
import * as func from "@/Set"
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import {createUserByData} from "@/Set";
const initCookie=func.initCookie();
const user =ref<func.User>(new func.User());
onMounted(()=>{
  document.title='吃了吗';
  if (!func.existToken(initCookie))
  {
    localStorage.clear();
    router.push('guest');
  }
  else
  {
    func.getUserByToken(func.getToken(initCookie)).then(r=>{
      const callBack=func.getResult(r);
      if (!callBack.success())
      {
        func.clearToken(initCookie);
        localStorage.clear();
        ElMessage.error({message:"请重新登录！",duration:2000});
        router.push('guest');
      }
      else
      {
        user.value=createUserByData(callBack);
        localStorage.setItem("user",JSON.stringify(createUserByData(callBack)));
      }

    })
  }
})



const aboutUs = ()=>{
  alert(1111);

}
const userReport = ()=>{
  alert(1111);
}

const contract = ()=>{
  alert(1111);
}
//菜单
const handleSelect = (key: string) => {
  switch (key)
  {
    case 'hello':
      router.push('hello');
      break;
    case 'profile':
      router.push('profile');
      break;
    case 'quit':
      func.clearToken(initCookie);
      localStorage.clear();
      router.push('guest');
      break;
    case 'search':
      router.push('search');
      break;
    case 'hollow':
      if(user.value.hollow===0)
      {
        router.push('joinHollow');
      }
      else
      {
        router.push('hollow');
      }
      break;
    case 'contribute':
      router.push('contribute');
      break;
    case 'suggest':
      router.push('suggest');
      break;
  }
}
</script>

<style scoped>
.big-container{
  background-color: #63BF8E;
  height: 100%;
}

.aside{
  margin-left: 10px; margin-top: 15px; width: 115px;
}
.main{
  padding-top: 15px;
}
.footer { text-align: center; line-height: 60px; }

</style>
