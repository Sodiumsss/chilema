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
          <!--Step1-->
          <div v-if="nowStep===0">
            <el-row justify="center"><p>你喜欢/讨厌什么？</p></el-row>
            酸：<el-slider v-model="step1[0]" :step="25" :format-tooltip="tooltip1" show-stops></el-slider>
            甜：<el-slider v-model="step1[1]" :step="25" :format-tooltip="tooltip2" show-stops></el-slider>
            苦：<el-slider v-model="step1[2]" :step="25" :format-tooltip="tooltip3" show-stops></el-slider>
            辣：<el-slider v-model="step1[3]" :step="25" :format-tooltip="tooltip4" show-stops></el-slider>


          </div>
          <!--Step2-->
          <div v-if="nowStep===1">
            <el-row justify="center">
              <el-space direction="vertical">
                <a>油</a>
                <el-radio-group v-model="step2[0]">
                  <el-radio label='1'>偏清淡</el-radio>
                  <el-radio label='2'>正常</el-radio>
                  <el-radio label='3'>偏油</el-radio>
                </el-radio-group>

                <a>咸</a>
                <el-radio-group v-model="step2[1]">
                  <el-radio label='1'>偏清淡</el-radio>
                  <el-radio label='2'>正常</el-radio>
                  <el-radio label='3'>偏咸</el-radio>
                </el-radio-group>
              </el-space>


            </el-row>

          </div>
          <!--Step3-->
          <div v-if="nowStep===2">
            <el-row justify="center">
              <el-space direction="vertical">
                <a>你吃早餐吗？<el-switch v-model="step3[0]"/></a>
                <div v-if="step3[0]">
                  <el-radio-group v-model="step3_radio[0]">
                    <el-radio label='1'>较少</el-radio>
                    <el-radio label='2'>正常</el-radio>
                    <el-radio label='3'>较多</el-radio>
                  </el-radio-group>

                  <el-tooltip content="该处选项指的是你的饭量~">
                    <el-icon><InfoFilled /></el-icon>
                  </el-tooltip>

                </div>


                <a>你吃午餐吗？<el-switch v-model="step3[1]"/></a>
                <div v-if="step3[1]">
                  <el-radio-group v-model="step3_radio[1]">
                    <el-radio label='1'>较少</el-radio>
                    <el-radio label='2'>正常</el-radio>
                    <el-radio label='3'>较多</el-radio>
                  </el-radio-group>
                  <el-tooltip content="该处选项指的是你的饭量~">
                    <el-icon><InfoFilled /></el-icon>
                  </el-tooltip>
                </div>

                <a>你吃晚餐吗？<el-switch v-model="step3[2]"/></a>
                <div v-if="step3[2]">
                  <el-radio-group v-model="step3_radio[2]">
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
          <!--Step4-->
          <div v-if="nowStep===3">
            <el-row justify="center">
              <el-space direction="vertical">
                <a>性别</a>
                <el-radio-group v-model="step4[0]">
                  <el-radio label='1'>男</el-radio>
                  <el-radio label='2'>女</el-radio>
                </el-radio-group>
                <a>称呼<el-tooltip content="不用担心，称呼可以随时更改。">
                  <el-icon><InfoFilled /></el-icon>
                </el-tooltip></a>
                <el-input v-model="nickname"></el-input>

                <a>账号</a>
                <el-input show-word-limit maxlength="15" v-model="username"></el-input><a v-if="accountCrash" style="color: red">账号已存在</a>


                <a>密码</a>
                <el-input show-password v-model="password"></el-input>


                <a>学号后五位<el-tooltip content="找回账号的重要部分。">
                  <el-icon><InfoFilled /></el-icon>
                </el-tooltip></a>
                <el-input show-word-limit maxlength="5" v-model="schoolId"></el-input>

                <a>出生年份<el-tooltip content="找回账号的重要部分。">
                  <el-icon><InfoFilled /></el-icon>
                </el-tooltip></a>
                <el-input show-word-limit maxlength="4" v-model="birthYear"></el-input>
              </el-space>

            </el-row>

          </div>
          <!--按钮-->
          <el-row v-if="nowStep<=3" justify="center">
            <el-button v-if="nowStep>0" @click="backStep">回去看看</el-button>

            <el-button @click="forwardStep"><a style="font-weight: bold" v-text="buttonText"></a></el-button>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
</template>



<script lang="ts" setup>
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";
import * as my from '../../myFunc'
import {onMounted, ref, watch} from "vue";
import router from "@/router";
const md5 =require('js-md5');

//导入
const Base64 = require('js-base64').Base64;
//属性
const username = ref<string>("");
const password = ref<string>("");
const nickname = ref<string>("同学");
const schoolId = ref<string>("");
const birthYear = ref<string>("");
//偏好
const step1=ref([0,0,0,0]);
const step2=ref([0,0,0]);
const step3=ref([false,false,false]);
const step3_radio=ref([0,0,0]);
const step4=ref([0,0,0]);
//控制
const nowStep=ref<number>(0);
const buttonText=ref<string>("我选好了");
const accountCrash=ref<boolean>(false);
const loading=ref<boolean>(false);
//提示
onMounted(()=> {
  document.title='请让我了解一下！';
  ElMessage.info({message:"注意，我们提供的选项可能没有到达你的预期，但是没关系，我们正在改进！",duration:2300});
    })
//侦听
watch(nowStep,(value)=>{
  console.log(value)
  if(value===3)
  {
    buttonText.value="创建";
  }
})

function backStep()
{
  nowStep.value--;
}
function forwardStep()
{
  switch (nowStep.value)
  {
    case 1:
      if (step2.value[0]===0 || step2.value[1]===0)
      {
        ElMessage.error({message:"请填写完整！",duration:2300});
        return;
      }
      break;
    case 2:
      if(step3.value[0]===false && step3.value[1]===false && step3.value[1]===false)
      {
        ElMessage.error({message:"钢铁是怎样炼成的？",duration:2300});
        return;
      }
      for (let i =0;i<step3.value.length;i++)
      {
        if (step3.value[i])
        {
          if (step3_radio.value[i]===0)
          {
            ElMessage.error({message:"请选择选项。",duration:2300});
            return;
          }
        }
      }


      break;
    case 3:
      if (step4.value[0]===0)
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
    nowStep.value=3;
    sendToServer();
  }
}

function sendToServer()
{
  ElMessageBox.confirm('我们将会把你刚才填写的信息上传至服务器，并且使用Cookies在你的本地存储一些数据。' +
      '请放心，我们不会对你的信息通过任何方式转让。' +
      '并且，你刚才填写的信息没有任何敏感内容，对吧？我们将对大家上传的信息进行大数据分析，然后把推荐结果反馈给你。','警告',{
    confirmButtonText:'同意',
    cancelButtonText:'不同意',
    type:'warning',
    center:true
  }).then(()=>
  {
    const par1=new my.Favor(step1.value,step2.value,step3.value,step4.value);
    const par2=new my.UserAccount(username.value,md5(password.value),schoolId.value,birthYear.value);
    const info=JSON.stringify({
      'UserAccount':par2,
      'Favor':par1
    });

    const data=Base64.encode (info);
    loading.value=true;

    axios.post("http://"+my.ip+":"+my.port+"/api/user/create", data,{headers:{'Create':'yoyo!'}})
        .then((res: any)=>
    {
      const callBack=new my.R(res);
      if (callBack.success())
      {
        ElMessage.success({message:callBack.getMessage(),duration:2300});
        router.push('login');
      }
      else
      {
          ElMessage.error({message:callBack.getMessage(),duration:2500});
      }
    })
        .catch(()=>
        {
            ElMessage.error({message:"连接出错！",duration:2500});
        }
    )
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

<style scoped>

</style>
