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
                            <a v-if="comment.length===0">无人评价</a>
                            <a v-if="comment.length!==0" v-text="rateText"/>
                          </el-tag>
                        </el-row>
                        <el-row v-if="comment.length!==0" justify="center">
                          <el-progress :stroke-width="20" style="width: 350px;margin-top: 10px;"
                                       :format="rateFormat" :percentage="food.rate"
                                       :color="rateColor" :text-inside="true"
                          />
                        </el-row>
                      </div>
                      <div>
                        <el-row style="margin-top: 10px;" justify="center">
                          <el-tag>
                            供应时间
                          </el-tag>
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


            <el-dialog v-model="rateVisible">
              <template v-if="alreadyRate===false" #header>填写评价</template>
              <template v-if="alreadyRate===true" #header>修改评价</template>

              <a>你的评分</a><br/><br/>
              <el-input-number :value-on-clear="0" :min="0" :max="100" v-model="rateNumber"/>
              &nbsp;{{hoshiText}}颗星星(评分为0~100，显示时会换算为0~5颗星)
              <br/><br/>
              <a>你的评论</a><br/><br/>
              <el-input show-word-limit :maxlength="200" type="textarea" v-model="rateContent"/>
              <template #footer>
      <span class="dialog-footer">
        <el-button @click="rateVisible = false">取消</el-button>
         <el-button type="danger" v-if="alreadyRate===true" @click="deleteRate">
          删除
        </el-button>
        <el-button type="primary" v-if="alreadyRate===false" @click="rate">
          发送
        </el-button>
         <el-button type="warning" v-if="alreadyRate===true" @click="rate">
          修改
        </el-button>
      </span>
              </template>
            </el-dialog>
          </template>
        </el-skeleton>
      </el-card>

      <el-card style="margin-top: 30px;">
        <a style="font-size: larger; font-weight: bold">评价</a>
        <br/><br/>
        <el-skeleton animated :loading="loading2">
          <el-card shadow="never" v-for="(i,index) in comment" class="singleReply">
            <el-row style="margin-bottom: 2px;" :gutter="10" justify="start">
              <el-col :span="16">
                <el-link style="font-size: medium">
                  {{i.userId===user.id ? "你自己" : "由"+i.senderName+"发送"}}
                </el-link>
              </el-col>

              <el-col :span="6"/>
              <el-col :span="2">
                <el-row justify="end">
                  #{{index+1}}

                </el-row>
              </el-col>
            </el-row>
            <br/>
            <a style=" margin-left: 12px;">{{i.content}}</a>
            <el-row justify="end">
              <el-col :span="17"/>

              <el-col :span="4">
                <el-row justify="end">
                  <el-rate show-score disabled score-template="{value}" v-model="i.rate"/>

                </el-row>

              </el-col>

            </el-row>

          </el-card>
          <el-affix  position="bottom" :offset="10">
            <el-row justify="end">
              <el-tooltip content="反馈信息" placement="top-end">
                <el-button size="large" circle type="primary" :icon="Message" />
              </el-tooltip>
              <el-tooltip content="评价" placement="top-end">
                <el-button size="large" @click="writeRate" circle :icon="ChatLineSquare"  type="warning"/>
              </el-tooltip>

              <el-tooltip content="回到顶部"  placement="top-end">
                <el-button size="large" @click="goTop" circle :icon="ArrowUpBold" type="info" />
              </el-tooltip>
            </el-row>
          </el-affix>
        </el-skeleton>
      </el-card>


    </el-main>



  </el-container>

</template>

<script lang="ts" setup>
import * as func from "@/Set"
import {computed, onMounted, ref, watch} from "vue";
import router from "@/router";
import { ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {ArrowUpBold,ChatLineSquare,Message} from "@element-plus/icons-vue";

const initCookie = func.initCookie();
const food = ref <func.food>(new func.food("-1","加载中......"));
const imgURL =ref <string>("");
const loading =ref<boolean>(true);
const loading2 =ref<boolean>(true);
const activeName =ref<string>("1");
const rateText = ref ("食物评分");
const rateVisible=ref<boolean>(false);
const rateContent=ref("");
const rateNumber=ref(0);

const hoshiText =computed(()=>{
  return rateNumber.value/20;
})
const writeRate=()=>{
  rateVisible.value=true;
}

const deleteRate = ()=>{
  ElMessageBox.confirm(
      '你确定要删除吗?',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() =>
  {
    func.deleteMyselfComment(food.value.id,func.getToken(initCookie)).then(r=>{
      const callBack=func.getResult(r);
      if (callBack.success())
      {
        ElMessage.success({message:"删除成功！",duration:2000});
        router.push({path:'/r',query:{j:'food?id='+food.value.id}});
      }
      else
      {
        ElMessage.error({message:"删除失败！",duration:2000});
      }
    }).catch(()=>{
      ElMessage.error({message:"网络连接出错！",duration:2000});
    })


      })



}

const rate = ()=>{
  let comment = new func.comment(food.value.id,user.value.id,rateContent.value,rateNumber.value,user.value.nickname);
  func.sendComment(comment,func.getToken(initCookie)).then(r=>{
    const callBack=func.getResult(r);
    if (callBack.success())
    {
      ElMessage.success({message:"评价成功！",duration:2000});
      router.push({path:'/r',query:{j:'food?id='+food.value.id}});
    }
    else
    {
      ElMessage.success({message:"评价失败！",duration:2000});

    }
  }).catch(()=>{
    ElMessage.error({message:"网络连接出错！",duration:2000});
  })

}

const comment =ref<func.comment[]>([]);
const showPage = ()=>{
  loading.value=false;
}
const user =ref <func.User>(new func.User);
const alreadyRate =ref (false);


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
const thisPage=func.getThis();
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
  if (!func.existToken(initCookie))
  {
    router.push('guest');
    localStorage.clear();
  }
  else
  {
    const item =localStorage.getItem("user");
    if (item ==null)
    {
      func.clearToken(initCookie);
      ElMessage.error({message:"请重新登录！",duration:2000});
      localStorage.clear();
      router.push('guest');
    }
    else
    {
      food.value.id=thisPage.$route.query.id;
      user.value= JSON.parse(localStorage.getItem("user") as string) as func.User;
        func.getSingleFood(food.value.id,func.getToken(initCookie)).then(r=>{
          const callBack=func.getResult(r);
          if (callBack.success())
          {
            food.value=callBack.getData() as func.food;
            imgURL.value="http://"+func.ip+":"+func.port+food.value.pic;
            food.value.rate=Math.round (food.value.rate * 10) / 10;

            func.getCommentList(food.value.id,func.getToken(initCookie)).then(r=>{
              const callBack=func.getResult(r);
              if (callBack.success())
              {
                comment.value=callBack.getData() as func.comment[];
                for (let i of comment.value)
                {
                  if (i.userId===user.value.id)
                  {
                    alreadyRate.value=true;
                    rateNumber.value=i.rate;
                    rateContent.value=i.content;
                  }
                  i.rate=i.rate/20;

                }
                rateText.value="食物评分(共"+comment.value.length+"人评)";
                loading2.value=false;


              }
              else
              {
                func.clearToken(initCookie);
                localStorage.clear();
                ElMessage.error({message:"请重新登录！",duration:2000});
                router.push('guest');
              }
            })
          }
          else
          {
            func.clearToken(initCookie);
            localStorage.clear();
            ElMessage.error({message:"请重新登录！",duration:2000});
            router.push('guest');}
        }).catch(()=>{
          router.push('index');
        })
      }

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
  // navigator.clipboard.writeText(input.value)
  document.body.removeChild(input); // 删除临时实例
  ElNotification.success({message:"已复制链接！",duration:1000,showClose:false});
}
</script>

<style scoped>
.big-container{
  background-color: #63BF8E;
  height: 100%;
}
.singleReply{
  margin-bottom: 10px;
}
</style>
