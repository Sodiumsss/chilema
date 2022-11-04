<template>
  <el-skeleton animated :loading="loading">
    <template #default>
      <el-container class="big-container">
        <el-container>
          <el-aside>
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

                <template v-if="user.hollow>0">
                  <el-menu-item index="hollow">
                    <template #title>进入树洞</template>
                  </el-menu-item>
                </template>
                <template v-if="user.hollow===0">
                  <el-menu-item index="joinHollow">
                    <template #title>开通树洞</template>
                  </el-menu-item>
                </template>

                <el-menu-item index="profile">
                  <template #title>账号管理</template>
                </el-menu-item>

                <el-menu-item index="quit">
                  <template #title>登出</template>
                </el-menu-item>

              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-main>
            <el-card>
              <router-view/>
            </el-card>
          </el-main>
        </el-container>

        <el-footer>
          <el-row justify="center">
            <el-space>
              <el-link @click="aboutUs">关于我们</el-link>
              <el-link @click="userReport">反馈信息</el-link>
            </el-space>
          </el-row>
        </el-footer>

      </el-container>
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue"
import router from "@/router";
import * as func from "@/Set"
import {ElMessage} from "element-plus";
const initCookie=func.initCookie();
const user = ref<func.User>(new func.User());
const loading =ref<boolean>(true);
onMounted(()=>{
  func.userInit(user.value,initCookie).then((r)=>{
    user.value=r as func.User;
    console.log(user.value);
    loading.value=false;
    router.push('hello');
  });

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
    case 'joinHollow':
      router.push('joinHollow');
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
}
.el-container { height: 100%; }

.el-aside{
  margin-left: 10px; margin-top: 15px; width: 115px;
}
.el-main{
  padding-top: 15px;
}
.el-footer {background-color: #FFF; text-align: center; line-height: 60px; }

</style>
