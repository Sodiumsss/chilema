<template>
  <el-container>
    <el-main>
      <el-card :style="{borderRadius:'var(--el-border-radius-round'}">
        <el-row v-if="!showCreatePage" justify="center">
          <h1>嗨，{{getTime}}</h1>
          <el-divider class="divider"></el-divider>
          <el-button @click="roll" round>帮我看看有什么好吃的吧！</el-button>
        </el-row>
        <Transition name="a">
          <div v-if="showCreatePage">
            <el-row  justify="center">
              <p>你好像是第一次使用，让我了解一下你的口味！</p>
              <el-divider class="divider"></el-divider>
              <el-row justify="center">
                <el-button @click="jump(1)">创建账号</el-button>
                <el-button @click="jump(2)">登录账号</el-button>
              </el-row>
            </el-row>
          </div>
        </Transition>
      </el-card>
    </el-main>
  </el-container>

</template>

<script lang="ts" setup>
import {onMounted,ref,computed} from "vue";
import router from "@/router";

const showCreatePage=ref<boolean>(false);
const getTime=computed(()=>{
  const hours = new Date().getHours();
  if (hours>=6 && hours<10){return '吃早饭了吗？';}
  if (hours>=10 && hours<=14) {return '吃午饭了吗？';}
  if (hours>14 && hours <=16) {return '睡午觉了吗？';}
  if (hours >16) {return '吃晚饭了吗？';}
  if (hours >=21) {return '要吃夜宵吗？';}
  return '吃了吗？';
})
onMounted(()=>{
  //此处需要检查本地是否有已登录账号并进行校验
})

function roll()
{
    showCreatePage.value=true;
}


function jump(type :number)
{
  if(type===1)
  {
    router.push('create');
  }
  else if (type===2)
  {
    router.push('login');
  }
}

</script>

<style scoped>

.divider{
  margin-top: 10px;margin-bottom: 10px;
}

.a-enter-active
{
  transition: opacity 3s ease;

}

.a-leave-active {
}

.a-enter-from,
.a-leave-to {
  opacity: 0;
}
</style>
