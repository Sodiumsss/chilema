<template>

  <el-row justify="center">
    <el-space  direction="vertical">
      账号
      称呼

    </el-space>
  </el-row>


</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import axios from "axios";
import qs from "qs";
import * as myFunc from '@/myFunc'
import {Base64} from "js-base64";


</script>

<style scoped>

</style>
