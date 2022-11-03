<template>
  <div class="main">
      <el-container>
        <el-aside  style="margin-left: 10px; margin-top: 20px; width: 110px;">
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

<!--                <el-menu-item-group>-->
<!--                  <template #title>G1</template>-->
<!--                  <el-menu-item  index="2-1-1">1</el-menu-item>-->
<!--                  <el-menu-item index="2-1-2">2</el-menu-item>-->
<!--                </el-menu-item-group>-->
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
        <el-main style="padding-top: 20px;">
          <el-card :style="{borderRadius:'var(--el-border-radius-round'}">
            <router-view/>
          </el-card>
        </el-main>
      </el-container>

      <el-footer style="position:fixed; bottom: 0; width: 100%; margin-bottom: 1px; padding: 0;"  >
        <el-card >
          <el-row  justify="center">
            <el-space>
              <el-link @click="aboutUs">关于我们</el-link>
              <el-link @click="userReport">反馈信息</el-link>
            </el-space>
          </el-row>
        </el-card>
      </el-footer>


  </div>

</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue"
import router from "@/router";
import * as func from "@/Set"
import {ElMessage} from "element-plus";
//功能
const initCookie=func.initCookie();
//信息
const user = ref<func.User>(new func.User());
onMounted(()=>{
  const cookiesState=func.existCookies(initCookie);
  if (cookiesState===-1)
  {
    ElMessage.error({message:"Cookie失效，请重新登录！",duration:2000});
    func.clearCookies(initCookie);
    router.push('guest');
  }
  else if (cookiesState===1)
  {
    func.validateCookies(initCookie).then((res)=>{
      const callBack=func.getResult(res);
      if (callBack.success())
      {
        user.value.loadByCookies(initCookie);
        router.push('hello');
      }
      else
      {
        ElMessage.error({message:"Cookie失效，请重新登录！",duration:2000});
        func.clearCookies(initCookie);
        router.push('guest');
      }
    }).catch(()=>{
      ElMessage.error({message:"网络连接出错，请重新登录！",duration:2000});
      func.clearCookies(initCookie);
      router.push('guest');});
  }
  else
  {
    ElMessage.error({message:"发生未知错误，请更换浏览器！",duration:2000});
    func.clearCookies(initCookie);
    router.push('guest');
  }
}

)

const aboutUs = ()=>{
  alert(1111);

}
const userReport = ()=>{
  alert(1111);
}

//菜单
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  switch (key)
  {
    case 'hello':
      router.push('hello');
      break;
    case 'profile':
      router.push('profile');
      break;
    case 'quit':
      func.clearCookies(initCookie);
      router.push('guest');
      break;

    case 'search':
      router.push('search');
      break;

    case 'hollow':
      router.push('hollow');
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
.main{
  background:url("../assets/background.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>
