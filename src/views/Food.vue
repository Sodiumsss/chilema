<template>

  <el-container class="big-container">

    <el-main>

      <el-card class="main-card">

      <el-link id="index" @click="backHello">首页</el-link>
      <a style="margin-left: 10px;margin-right: 10px;">></a>
      <el-link style="font-size: larger" @click="copyLink">{{ food.name }}</el-link>
      <br/><br/>
        <el-row justify="center">
          <el-image :src="imgURL" @load="showPage">
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">别急！</span></div>
            </template>
          </el-image>
        </el-row>

        <br/>
        <el-skeleton animated :loading="loading">
          <template #default>
            <el-row justify="space-between">
              <el-col :span="24">
                  <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="食物信息" name="1">
                      <div>
                        <el-row justify="space-between">
                          <el-col :span="3"/>
                          <el-col :span="4">
                            <el-row justify="center">
                              <el-space direction="vertical">
                                酸
                                <el-progress :color="kindColors" :format="acidFormat"
                                             :percentage="food.acid" type="dashboard"/>
                              </el-space>
                            </el-row>

                          </el-col>
                          <el-col :span="4">
                            <el-row justify="center">
                              <el-space direction="vertical">
                                甜
                                <el-progress :color="kindColors" :format="sweetFormat"
                                             :percentage="food.sweet" type="dashboard"/>
                              </el-space>

                            </el-row>

                          </el-col>
                          <el-col :span="4">
                            <el-row justify="center">
                              <el-space direction="vertical">
                                麻
                                <el-progress :color="kindColors" :format="pepperFormat"
                                             :percentage="food.pepper" type="dashboard"/>
                              </el-space>

                            </el-row>

                          </el-col>
                          <el-col :span="4">
                            <el-row justify="center">
                              <el-space direction="vertical">
                                辣
                                <el-progress  :color="kindColors" :format="spicyFormat"
                                              :percentage="food.spicy" type="dashboard"/>
                              </el-space>

                            </el-row>

                          </el-col>
                          <el-col :span="3"/>
                        </el-row>
                      </div>


                      <div>
                        <el-row justify="center">
                          <el-tag>
                            简短描述
                          </el-tag>
                        </el-row>
                        <el-row justify="center">
                          <a style="margin-top: 7px;">{{food.description}}</a>
                        </el-row>
                      </div>
                      <div>
                        <el-row style="margin-top: 10px;" justify="center">
                          <el-tag>
                            食物评分
                          </el-tag>
                        </el-row>
                        <el-row justify="center">
                          <el-progress :stroke-width="20" style="width: 350px;margin-top: 10px;"
                                       :format="rateFormat" :percentage="food.rate"
                                       :color="rateColor" :text-inside="true"
                          />
                        </el-row>
                      </div>
                      <div>
                        <el-row style="margin-top: 10px;" justify="center">
                          <el-tag>供应时间</el-tag>
                        </el-row>

                        <el-row justify="center">
                          <el-space>
                            <div v-for="(i,index) in food.supplyTime">
                              <div v-if="i===true">
                                <el-checkbox :label="calTime(index)"  v-model="trueRef"/>
                              </div>
                              <div v-if="i===false">
                                <el-checkbox :label="calTime(index)"  v-model="falseRef"/>
                              </div>

                            </div>
                          </el-space>
                        </el-row>

                        <el-row style="margin-top: 10px;" justify="center">
                          <el-tag>供应地点</el-tag>
                        </el-row>

                        <el-row justify="center">
                          <a style="margin-top: 7px;" v-text="calLocal"></a>
                        </el-row>


                      </div>






                    </el-collapse-item>
                    <el-collapse-item title="更多图片" name="2">
                      <div>
                        待添加
                      </div>
                    </el-collapse-item>

                  </el-collapse>
              </el-col>
            </el-row>
            <br/>
<!--            <el-row justify="space-between">-->
<!--              <el-col :span="11">-->
<!--                <el-card>-->
<!--                  111-->
<!--                </el-card>-->
<!--              </el-col>-->
<!--              <el-col :span="11">-->
<!--                <el-card>-->
<!--                  111-->
<!--                </el-card>-->
<!--              </el-col>-->
<!--            </el-row>-->


          </template>
        </el-skeleton>


      </el-card>

      <el-card style="margin-top: 30px;">
        <a style="font-size: larger; font-weight: bold">看看大家的评论吧！</a>
        <br/>
        <a>未加载......</a>
      </el-card>

      <el-affix  position="bottom" :offset="30">
        <el-row justify="end">
          <el-tooltip content="反馈信息或错误" placement="top-end">
            <el-button size="large" circle type="primary" :icon="Message" />
          </el-tooltip>
          <el-tooltip content="给出评价" placement="top-end">
            <el-button size="large" circle :icon="ChatLineSquare"  type="warning"/>
          </el-tooltip>

          <el-tooltip content="回到顶部"  placement="top-end">
            <el-button size="large" @click="goTop" circle :icon="ArrowUpBold" type="info" />
          </el-tooltip>
        </el-row>
      </el-affix>
    </el-main>



  </el-container>

</template>

<script lang="ts" setup>
import * as func from "@/Set"
import {computed, onMounted, ref, watch} from "vue";
import router from "@/router";
import {ElMessage, ElNotification} from "element-plus";
import {ArrowUpBold,ChatLineSquare,Message} from "@element-plus/icons-vue";
const initCookie = func.initCookie();
const food = ref <func.food>(new func.food("-1","加载中......"));
const imgURL =ref <string>("");
const loading =ref<boolean>(true);
const activeName =ref<string>("1");
const showPage = ()=>{
  loading.value=false;
}
const calTime = (index :any)=>
{
  if (index==0)return "早上";
  if (index==1)return "中午";
  if (index==2)return "晚上";
  if (index==3)return "宵夜";

}
const calLocal =computed(()=>{
  let tmp ="";
  for (let i in food.value.supplyLocation)
  {
    tmp+=food.value.supplyLocation[i];


    if (Number(i)!==food.value.supplyLocation.length-1)
    {
      tmp+="，"
    }


  }
  return tmp;
})
const trueRef=ref(true);
const goTop=()=>{
  const tmp =document.getElementById('index') ;
  tmp!.scrollIntoView();
}
watch(trueRef,()=>{
  trueRef.value=true;
})
const falseRef=ref(false);
watch(falseRef,()=>{
  falseRef.value=false;
})


const kindColors = (percentage: number) =>
{
  if (percentage<20)return "#69638A";
  if (percentage<40)return '#1989FA';
  if (percentage<60)return '#7AA85D';
  if (percentage<80)return '#F2775C';
  if (percentage<=100)return 'red';
}
const acidFormat = (percentage: number) =>
{
  if (percentage===0)return '不酸';
  if (percentage<20)return '感知不强'+"("+percentage+")";
  if (percentage<40)return '带点酸味'+"("+percentage+")";
  if (percentage<60)return '明显酸味'+"("+percentage+")";
  if (percentage<80)return '尤其突出'+"("+percentage+")";

  if (percentage<=100)return '等于喝醋'+"("+percentage+")";
}
const sweetFormat = (percentage: number) =>
{
  if (percentage===0)return '不甜';
  if (percentage<20)return '感知不强'+"("+percentage+")";
  if (percentage<40)return '带点甜味'+"("+percentage+")";
  if (percentage<60)return '明显甜味'+"("+percentage+")";
  if (percentage<80)return '尤其突出'+"("+percentage+")";

  if (percentage<=100)return '憨甜'+"("+percentage+")";
}
const pepperFormat = (percentage: number) =>
{
  if (percentage===0)return '不麻';
  if (percentage<20)return '感知不强'+"("+percentage+")";
  if (percentage<40)return '带点麻味'+"("+percentage+")";
  if (percentage<60)return '明显麻味'+"("+percentage+")";
  if (percentage<80)return '尤其突出'+"("+percentage+")";

  if (percentage<=100)return '我麻了'+"("+percentage+")";
}
const spicyFormat = (percentage: number) =>
{
  if (percentage===0)return '不辣';
  if (percentage<20)return '感知不强'+"("+percentage+")";
  if (percentage<40)return '带点辣味'+"("+percentage+")";
  if (percentage<60)return '明显辣味'+"("+percentage+")";
  if (percentage<80)return '尤其突出'+"("+percentage+")";

  if (percentage<=100)return '辣到喷火'+"("+percentage+")";
}
const rateFormat = (percentage: number) =>
{
  if (percentage<40)return '鉴定为烂'+"("+percentage+")";
  if (percentage<60)return '不太行'+"("+percentage+")";

  if (percentage<75)return '差强人意'+"("+percentage+")";
  if (percentage<85)return '可圈可点'+"("+percentage+")";

  if (percentage<90)return 'Nice'+"("+percentage+")";
  if (percentage<=95)return '校中瑰宝'+"("+percentage+")";
  if (percentage<=100)return '神中神'+"("+percentage+")";

}
const rateColor = (percentage: number)=>
{
  if (percentage<60)return '#F56C6C';

  if (percentage<75)return '#E6A23C';
  if (percentage<85)return '#409EFF';

  if (percentage<90)return '#02B1AD';
  if (percentage<=95)return '#6F7AD3';
  if (percentage<=100)return '#67C23A';
}

onMounted(()=>{
  if (func.test)
  {
    func.getSingleFood("1",func.getToken(initCookie)).then(r=>{
      const callBack=func.getResult(r);
      if (callBack.success())
      {
        food.value=callBack.getData() as func.food;
        imgURL.value="http://"+func.ip+":"+func.port+food.value.pic;
        food.value.rate=Math.round (food.value.rate * 10) / 10;
        console.log(food.value)
      }
      else
      {
        func.clearToken(initCookie);
        localStorage.clear();
        ElMessage.error({message:"请重新登录！",duration:2000});
        router.push('guest');}
    }).catch(()=>{

    })
  }

})
const backHello = ()=>{
  router.push('hello');
}
const copyLink=()=>{
  let input = document.createElement("input"); // 创建input对象
  input.value = window.location.href; // 设置复制内容
  document.body.appendChild(input); // 添加临时实例
  input.select(); // 选择实例内容
  document.execCommand("Copy"); // 执行复制
  document.body.removeChild(input); // 删除临时实例
  ElNotification.success({message:"已复制链接！",duration:1000,showClose:false});
}
</script>

<style scoped>
.big-container{
  background-color: #63BF8E;
  height: 100%;
}

</style>
