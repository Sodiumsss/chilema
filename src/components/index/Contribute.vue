<template>
  <el-row justify="center">
    <el-space direction="vertical">
        <a style="font-weight: bold">你可以与我们一同将"吃了吗"做得更好，审核通过后你会获得经验&积分奖励！</a>

    </el-space>
  </el-row>
  <el-divider style="margin-top: 5px;margin-bottom: 5px;"/>

  <el-tabs tab-position="left" class="tabs">
    <el-tab-pane label="添加食品">
      <el-card>
        <div v-if="addFoodStep===1">
          <el-row justify="center">
            <el-space direction="vertical">
              <a>你将添加"吃了吗"中<span style="color: red">没有覆盖到的食品</span>。</a>
              <a>当你提交你所填写的内容之后，系统会启动一个<span style="color: red">倒计时</span>，</a>
              <a>倒计时结束后，食品将会<span style="color: red">自动添加</span>到数据库中。</a>
              <br/>
              <a>在此期间，如果管理员将你的添加请求<span style="color: red">驳回</span>，那你所填写的内容就不会上传到数据库，</a>
              <a>当然，管理员也能直接关闭倒计时通过你的请求(可能有所修改)。</a>
            </el-space>
          </el-row>
        </div>

        <div v-if="addFoodStep===2">
          <el-row justify="center">
            <el-space direction="vertical">
              <a>倒计时启动后，你的申请内容将被公之于众。</a>
              <a>其他用户可以对你的内容进行评判(主要是鉴定你的内容是否真实)。</a>
              <a>如果他人的<span style="color: red">同意</span>你的内容
                ，那么倒计时将会<span style="color: red">减少</span>一些时间。</a>
              <a>如果他人的<span style="color: red">否决</span>你的内容
                ，那么倒计时将会<span style="color: red">增加</span>一些时间。</a>
              <br/>
              <a>倒计时的默认长短将会根据你以往的添加情况进行综合判断来计算。</a>

            </el-space>
          </el-row>
        </div>
        <div v-if="addFoodStep===10">
          <el-form>
            <el-row justify="center">
                <div style="text-align: center">
                  <a>名称</a><el-input v-model="foodName" show-word-limit
                                       maxlength="10" style="margin-top: 5px;"/>
                </div>
            </el-row>

            <el-row style="margin-top: 5px;" justify="center">
                <div style="text-align: center">
                  <a>简短描述(请客观描述食物，不包含价格)</a><el-input v-model="foodDescription" show-word-limit
                                           maxlength="80" type="textarea" style="margin-top: 5px;"/>
                </div>
            </el-row>

            <el-row  style="margin-top: 5px;" justify="center">
              <el-col :span="5">
                <div style="text-align: center">
                  <a>价格</a><el-input-number :value-on-clear="0" :min="0" :max="100" v-model="foodPrice" style="margin-top: 5px;"/>
                </div>
              </el-col>
            </el-row>
            <el-row  style="margin-top: 5px;" justify="center">
              <el-col :span="10">
                <div style="text-align: center">
                  <a>供应时间</a>
                  <el-checkbox-group @change="test" v-model="foodSupplyTime">
                    <el-checkbox label="1" >早上</el-checkbox>
                    <el-checkbox label="2" >中午</el-checkbox>
                    <el-checkbox label="3" >晚上</el-checkbox>
                    <el-checkbox label="4" >宵夜</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-col>
            </el-row>


            <el-row  style="margin-top: 5px;" justify="center">
              <el-col :span="18">
                <div style="text-align: center">
                  <a>供应地点(如果不是同一家请分开添加食品)</a>
                  <el-checkbox-group v-model="foodLocation">
                    <el-checkbox label="1" >一食堂</el-checkbox>
                    <el-checkbox label="2" >二食堂</el-checkbox>
                    <el-checkbox label="3" >三食堂</el-checkbox>
                    <el-checkbox label="4" >其它地方</el-checkbox>
                  </el-checkbox-group>


                </div>
              </el-col>
            </el-row>
            <el-row  style="margin-top: 5px;" justify="center">
              <el-col :span="7">
                <el-input v-if="foodAnotherLocationState"/>
              </el-col>
            </el-row>




          </el-form>

        </div>
        <div v-if="addFoodStep===11">
          <el-row justify="center">请输入0~100的数值，尽管该内容极具主观性，但我们会对你提交的数据进行修正。</el-row>
          <br/>
          <el-row justify="center">所以请填写你对该食物最真实的感觉。</el-row>

          <el-form>
            <el-row  style="margin-top: 5px;" justify="center">
              <el-col :span="5">
                <div style="text-align: center">
                  <a>酸</a><el-input-number :value-on-clear="0" :min="0" :max="100"
                                              v-model="foodAcid" style="margin-top: 5px;"/>
                </div>
              </el-col>
            </el-row>
            <el-row  style="margin-top: 5px;" justify="center">
              <el-col :span="5">
                <div style="text-align: center">
                  <a>甜</a><el-input-number :value-on-clear="0" :min="0" :max="100"
                                            v-model="foodSweet" style="margin-top: 5px;"/>
                </div>
              </el-col>
            </el-row>
            <el-row  style="margin-top: 5px;" justify="center">
              <el-col :span="5">
                <div style="text-align: center">
                  <a>麻</a><el-input-number :value-on-clear="0" :min="0" :max="100"
                                            v-model="foodPepper" style="margin-top: 5px;"/>
                </div>
              </el-col>
            </el-row>
            <el-row  style="margin-top: 5px;" justify="center">
              <el-col :span="5">
                <div style="text-align: center">
                  <a>辣</a><el-input-number :value-on-clear="0" :min="0" :max="100"
                                            v-model="foodSpicy" style="margin-top: 5px;"/>
                </div>
              </el-col>
            </el-row>
            <br/>
          </el-form>
        </div>
        <div v-if="addFoodStep===12">

          <el-row justify="center">
            <el-col :span="8">
              <el-upload ref="photoRef" accept="image/png, image/jpeg"  :auto-upload="false" :limit="1">
                <template #trigger>
                  <el-button type="primary">选择图片</el-button>
                </template>
                <el-button style="margin-left: 5px;" type="success">上传图片</el-button>
                <template #tip>
                  <div class="el-upload__tip ">
                    上传一张主图片，低于1MB。
                  </div>
                </template>
              </el-upload>
            </el-col>
          </el-row>
          <br/><br/>

        </div>


        <el-row justify="center">
          <el-button v-if="addFoodStep===2" @click="addFoodStepPop">阅读上一段</el-button>
          <el-button v-if="addFoodStep===2" @click="addFoodStepPush('goToSingle')">开始单一模式添加</el-button>
          <el-button v-if="addFoodStep===1" @click="addFoodStepPush">阅读下一段</el-button>
          <el-button v-if="addFoodStep===11 || addFoodStep===12" @click="addFoodStepPop">上一步</el-button>

          <el-button v-if="addFoodStep===3 || addFoodStep===10 || addFoodStep===11" @click="addFoodStepPush">下一步</el-button>

          <el-button v-if="addFoodStep===12" @click="PostSingleFood">提交</el-button>
        </el-row>
      </el-card>
    </el-tab-pane>

    <el-tab-pane label="展现想法">Role</el-tab-pane>
  </el-tabs>


</template>

<script lang="ts" setup>
import type { UploadInstance } from 'element-plus'
import * as func from "@/Set"
import {computed, ref} from "vue";
const initCookie = func.initCookie();
const test = (value :any)=>{
  console.log(value)
}
//添加食品开始
const addFoodStep = ref(1)
const foodDescription = ref ("");
const foodName =ref("");
const foodPrice =ref (0);
const foodLocation= ref <Array<string>>([]);
const foodSupplyTime = ref <Array<string>>([]);
const foodAcid =ref(0);
const foodSweet =ref(0);
const foodSpicy =ref(0);
const foodPepper =ref(0);
const photoRef = ref();

const foodAnotherLocationState = computed(()=>{
  return foodLocation.value.indexOf("4") !== -1;

})
const PostSingleFood = ()=>{

}
const foodAnotherLocation =ref();
const addFoodStepPush = (step :any="")=>
{
  if (step==="goToSingle")
  {
    addFoodStep.value=10;
  }
  else
  {
    addFoodStep.value++;

  }
}
const addFoodStepPop = ()=>
{
  addFoodStep.value--;
}

//添加食品结束
</script>

<style scoped>
.tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
