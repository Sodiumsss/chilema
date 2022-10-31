<template>
  <el-row  justify="center">
    <el-space direction="vertical">
        <a style="font-weight: bold">你可以与我们一同将吃了吗做得更好，审核通过后你会获得积分奖励！</a>

    </el-space>
  </el-row>
  <el-divider style="margin-top: 5px;margin-bottom: 5px;"/>

  <el-tabs tab-position="left" style="" class="tabs">
    <el-tab-pane label="添加食品">User</el-tab-pane>
    <el-tab-pane label="提出异议">Config</el-tab-pane>
    <el-tab-pane label="展现想法">Role</el-tab-pane>
  </el-tabs>


</template>

<script lang="ts" setup>

</script>

<style scoped>
.tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
