<template>
  <el-tabs  type="border-card" v-model="nowTab" @tab-click="tabClick">
    <el-tab-pane label="按名称" name="1">
      <el-row justify="center">
        <el-space  direction="vertical">
          输入你想要查询的大致名称！<el-input :prefix-icon="Search" clearable v-model="foodName"></el-input>
          <el-button>查询</el-button>
        </el-space>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="按口味" name="2">
      <a>2</a>
    </el-tab-pane>
    <el-tab-pane label="按食堂" name="3">
      <el-row justify="center">
        <el-space  direction="vertical">
          <el-radio-group v-model="canteenName">
            <el-radio label='1'>一食堂(祥园)</el-radio>
            <el-radio label='2'>二食堂</el-radio>
            <el-radio label='3'>三食堂(荷园)</el-radio>
            <el-radio label='4'>其它</el-radio>

          </el-radio-group>
        </el-space>
      </el-row>


    </el-tab-pane>
    <el-tab-pane label="按时段" name="4">
      <el-row justify="center">
        <el-space  direction="vertical">
          <el-radio-group v-model="time">
            <el-radio label='1'>早</el-radio>
            <el-radio label='2'>中</el-radio>
            <el-radio label='3'>晚</el-radio>
          </el-radio-group>
        </el-space>
      </el-row>


    </el-tab-pane>
  </el-tabs>




</template>

<script lang="ts" setup>
import {ref} from "vue";

import {Search} from '@element-plus/icons-vue'
const nowTab=ref<string>('1');

//按名称
const foodName=ref<string>('');

//

//按食堂
const canteenName=ref<string>('');

//按时段
const time=ref<string>('');



const tabClick=(pane :any)=>{

}

</script>

<style scoped>

</style>
