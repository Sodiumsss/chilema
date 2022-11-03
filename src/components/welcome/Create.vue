<template>
    <el-container v-loading="loading">
      <el-main>
        <el-card :style="{borderRadius:'var(--el-border-radius-round'}">
          <!--进度条-->
          <el-steps :active="nowStep" finish-status="success">
            <el-step title="味道"/>
            <el-step title="偏好"/>
            <el-step title="三餐"/>
            <el-step title="创建"/>
          </el-steps>
          <el-alert center effect="dark" type="info">
           <p>我们提供的选项可能没有到达你的预期，但是没关系，我们正在改进！</p>

          </el-alert>
          <!--taste-->
          <div v-if="nowStep===0">
            <el-row justify="center"><p>你喜欢/讨厌什么？</p></el-row>
            酸：<el-slider v-model="taste[0]" :step="25" :format-tooltip="tooltip1" show-stops></el-slider>
            甜：<el-slider v-model="taste[1]" :step="25" :format-tooltip="tooltip2" show-stops></el-slider>
            麻：<el-slider v-model="taste[2]" :step="25" :format-tooltip="tooltip3" show-stops></el-slider>
            辣：<el-slider v-model="taste[3]" :step="25" :format-tooltip="tooltip4" show-stops></el-slider>
          </div>
          <!--preference-->
          <div v-if="nowStep===1">
            <el-row justify="center">
              <el-space direction="vertical">
                <a>油</a>
                <el-radio-group v-model="preference[0]">
                  <el-radio label='1'>偏清淡</el-radio>
                  <el-radio label='2'>正常</el-radio>
                  <el-radio label='3'>偏油</el-radio>
                </el-radio-group>

                <a>咸</a>
                <el-radio-group v-model="preference[1]">
                  <el-radio label='1'>偏清淡</el-radio>
                  <el-radio label='2'>正常</el-radio>
                  <el-radio label='3'>偏咸</el-radio>
                </el-radio-group>
              </el-space>


            </el-row>

          </div>
          <!--meals-->
          <div v-if="nowStep===2">
            <el-row justify="center">
              <el-space direction="vertical">
                <a>你吃早餐吗？<el-switch v-model="mealsSwitch[0]"/></a>
                <div v-if="mealsSwitch[0]">
                  <el-radio-group v-model="meals[0]">
                    <el-radio label='1'>较少</el-radio>
                    <el-radio label='2'>正常</el-radio>
                    <el-radio label='3'>较多</el-radio>
                  </el-radio-group>

                  <el-tooltip content="该处选项指的是你的饭量~">
                    <el-icon><InfoFilled /></el-icon>
                  </el-tooltip>

                </div>


                <a>你吃午餐吗？<el-switch v-model="mealsSwitch[1]"/></a>
                <div v-if="mealsSwitch[1]">
                  <el-radio-group v-model="meals[1]">
                    <el-radio label='1'>较少</el-radio>
                    <el-radio label='2'>正常</el-radio>
                    <el-radio label='3'>较多</el-radio>
                  </el-radio-group>
                  <el-tooltip content="该处选项指的是你的饭量~">
                    <el-icon><InfoFilled /></el-icon>
                  </el-tooltip>
                </div>

                <a>你吃晚餐吗？<el-switch v-model="mealsSwitch[2]"/></a>
                <div v-if="mealsSwitch[2]">
                  <el-radio-group v-model="meals[2]">
                    <el-radio label='1'>较少</el-radio>
                    <el-radio label='2'>正常</el-radio>
                    <el-radio label='3'>较多</el-radio>
                  </el-radio-group>

                  <el-tooltip content="该处选项指的是你的饭量~">
                    <el-icon><InfoFilled /></el-icon>
                  </el-tooltip>
                </div>
              </el-space>
            </el-row>


          </div>


          <!--information-->
          <div v-if="nowStep===3">
            <el-form>
            <el-row justify="center">
              <el-space direction="vertical">

                <a>性别</a>
                <el-radio-group v-model="sex">
                  <el-radio label='1'>男</el-radio>
                  <el-radio label='2'>女</el-radio>
                </el-radio-group>
                <a>称呼<el-tooltip content="不用担心，称呼可以随时更改">
                  <el-icon><InfoFilled /></el-icon>
                </el-tooltip></a>
                <el-input v-model="nickname"></el-input>

                <a>账号<el-tooltip content="登录的凭证">
                <el-icon><InfoFilled /></el-icon>
              </el-tooltip></a>


                <el-input @focusout="usernameFocusout" show-word-limit maxlength="15" v-model="username"></el-input><a v-if="accountCrash" style="color: red">账号已存在</a>

                <span v-if="usernameInfoState"><el-icon v-if="!usernameInfoIcon" :color="usernameInfoColor"><CloseBold /></el-icon><el-icon v-if="usernameInfoIcon" :color="usernameInfoColor"><Select /></el-icon><a style="font-size: small" v-text="usernameInfo"></a></span>


                <a>密码</a>
                <el-input  show-password v-model="password"></el-input>
                <span v-if="passwordInfoState"><el-icon color="red"><CloseBold /></el-icon><a style="font-size: small">请包含6~20位数字与字母</a></span>

                <a>学号后五位<el-tooltip content="找回账号的重要部分">
                  <el-icon><InfoFilled /></el-icon>
                </el-tooltip></a>
                <el-input  show-word-limit maxlength="5" v-model="schoolId"></el-input>
                <a>出生年份<el-tooltip content="找回账号的重要部分">
                  <el-icon><InfoFilled /></el-icon>
                </el-tooltip></a>
                <el-input show-word-limit maxlength="4" v-model="birthYear"></el-input>
              </el-space>
            </el-row>
            </el-form>
          </div>


          <!--按钮-->
          <el-row v-if="nowStep<=3" justify="center">
            <el-space>
              <el-button  @click="backPage">放弃创建</el-button>
              <el-button v-if="nowStep>0" @click="backStep">上一步</el-button>
              <el-button v-if="nowStep<=2" @click="forwardStep"><a style="font-weight: bold">下一步</a></el-button>
              <el-button v-if="nowStep===3" :disabled="createButtonLock" @click="forwardStep"><a style="font-weight: bold" >创建</a></el-button>
            </el-space>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
</template>


<script lang="ts" setup>
import {ElMessage, ElMessageBox} from "element-plus";
import * as func from "@/Set"
import {onMounted, ref, watch} from "vue";
import router from "@/router";
const md5 =require('js-md5');
//属性
const username = ref<string>("");
const password = ref<string>("");
const nickname = ref<string>("同学");
const schoolId = ref<string>("");
const birthYear = ref<string>("");
//偏好
const taste=ref([0,0,0,0]);
const preference=ref([0,0]);
const mealsSwitch=ref([false,false,false]);
const meals=ref([0,0,0]);
const sex=ref(0);
//控制
const nowStep=ref<number>(0);
const accountCrash=ref<boolean>(false);
const loading=ref<boolean>(false);
const createButtonLock=ref<boolean>(false);
const usernameInfoState=ref<boolean>(false);
const usernameInfo=ref<string>("");
const usernameInfoColor=ref<string>("green");
const usernameInfoIcon=ref<boolean>(true);
const passwordInfoState=ref<boolean>(false);

//提示
onMounted(()=> {document.title='请让我了解一下！';})
//监听密码
watch(password,(N)=>{
  if (password.value==="")
  {
    createButtonLock.value=true;
  }
  else
  {
    const r = new RegExp('(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&()]{6,20}$');
    if (!r.test(password.value))
    {
      passwordInfoState.value=true;
      createButtonLock.value=true;
      return;
    }
    passwordInfoState.value=false;
    createButtonLock.value=false;

  }
})

watch(username,()=>{
  if (username.value==="")
  {
    usernameInfoState.value=false;
    createButtonLock.value=true;
  }
})
//账号检测
function usernameFocusout()
{
  if (username.value===""){return;}
  createButtonLock.value=true;
  func.verifyUsername(username.value).then((res)=>{
    const callBack=func.getResult(res);
      if (callBack.success())
      {
        createButtonLock.value=false;
        usernameInfo.value="可以使用"
        usernameInfoColor.value="green";
        usernameInfoIcon.value=true;
      }
      else
      {
        usernameInfo.value="账号重复"
        usernameInfoColor.value="red";
        usernameInfoIcon.value=false;

      }
  }).catch(()=>{
      usernameInfo.value="网络错误"
      usernameInfoColor.value="red";
      usernameInfoIcon.value=false;
  });
  usernameInfoState.value=true;

}
function backPage()
{
  router.push('guest');
}

function backStep()
{
  nowStep.value--;
}

function forwardStep()
{
  switch (nowStep.value)
  {
    case 1:
      if (preference.value[0]===0 || preference.value[1]===0)
      {
        ElMessage.error({message:"请填写完整！",duration:2300});
        return;
      }
      break;
    case 2:
      if(mealsSwitch.value[0]===false && mealsSwitch.value[1]===false && mealsSwitch.value[1]===false)
      {
        ElMessage.error({message:"钢铁是怎样炼成的？",duration:2300});
        return;
      }
      for (let i =0;i<mealsSwitch.value.length;i++)
      {
        if (mealsSwitch.value[i])
        {
          if (meals.value[i]===0)
          {
            ElMessage.error({message:"请选择选项。",duration:2300});
            return;
          }
        }
      }
      break;
    case 3:
      if (sex.value===0)
      {
        ElMessage.error({message:"请选择性别。",duration:2300});
        return;
      }
      if (nickname.value==='')
      {
        ElMessage.error({message:"我可没法称呼你为空白？",duration:2300});
        return;
      }
      const r = new RegExp('^[0-9]*$');
      if(schoolId.value.length!==5)
      {
        ElMessage.error({message:"学号后五位！学号后五位！",duration:2300});
        return;
      }
      else
      {
        if (!r.test(schoolId.value))
        {
          ElMessage.error({message:"学号是纯数字！",duration:2300});
          return;
        }
      }

      if (birthYear.value.length!==4)
      {
        ElMessage.error({message:"你是哪一年出生的？！",duration:2300});
        return;

      }
      else
      {
        if (!r.test(birthYear.value))
        {
          ElMessage.error({message:"纯数字！",duration:2300});
          return;
        }
        if (Number(birthYear.value) < 1960 || Number(birthYear.value) > 2010)
        {
          ElMessage.info({message:"显然你的出生年不太真实，但请你记住你刚才所填写的。",duration:2300});
        }
      }
      break;
  }
  nowStep.value++;
  if(nowStep.value===4)
  {
    usernameFocusout();
    if (usernameInfoIcon.value===true)
    {
      sendToServer();
      backStep();
    }
  }
}

function sendToServer()
{
  ElMessageBox.confirm('我们将会把你刚才填写的信息上传至服务器，并且使用Cookies在你的本地存储一些数据。','警告',{
    confirmButtonText:'同意',
    cancelButtonText:'不同意',
    type:'warning',
    center:true
  }).then(()=>
  {
    const favor = new func.Favor(taste.value,preference.value,meals.value)
    const user = new func.User(username.value,md5(password.value),schoolId.value,birthYear.value
        , nickname.value,0,false,sex.value,favor);
    loading.value=true;
    func.createWithFavor(user,favor).then((res=>{
      const callBack=func.getResult(res);
      if (callBack.success())
      {
        ElMessage.success({message:"注册成功！",duration:2000});
        router.push('guest');
      }
      else
      {
        ElMessage.error({message:"注册失败，请检测所填写的内容！",duration:2000});
      }})
    ).catch(()=>{
      ElMessage.error({message:"网络连接出错！",duration:2000});
    })
    loading.value=false;
  })
}

function tooltip1(a: number)
{
  switch (a)
  {
    case 0:
      return '遇酸中和！';
    case 25:
      return '稍微一点？';
    case 50:
      return '马马虎虎。';
    case 75:
      return '比较中意。';
    case 100:
      return '我是醋坛子！';
  }
}
function tooltip2(a: number)
{
  switch (a)
  {
    case 0:
      return '完全不行！';
    case 25:
      return '稍微一点？';
    case 50:
      return '马马虎虎。';
    case 75:
      return '比较中意。';
    case 100:
      return '如鱼得水！';
  }
}
function tooltip3(a: number)
{
  switch (a)
  {
    case 0:
      return '完全不行！';
    case 25:
      return '稍微一点？';
    case 50:
      return '马马虎虎。';
    case 75:
      return '比较中意。';
    case 100:
      return '吃得苦中苦！';
  }
}
function tooltip4(a: number)
{
  switch (a)
  {
    case 0:
      return '完全不行！';
    case 25:
      return '稍微一点？';
    case 50:
      return '马马虎虎。';
    case 75:
      return '比较中意。';
    case 100:
      return '无辣不欢！';
  }
}

</script>
