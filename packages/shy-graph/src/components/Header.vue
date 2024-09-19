<template>
  <header class="w-full h-full box-border flex justify-end items-center p-16px bg-[#fff] gap-3">
    <a-button type="text">
      <div class="i-ant-design:merge-filled" />
      添加点
    </a-button>
    <a-button type="text">
      <div class="i-ant-design:node-index-outlined" />
      添加边
    </a-button>
    <a-button type="text">
      <div class="i-ant-design:export-outlined" />
      导出
    </a-button>
  </header>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
header > button {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 15px;
  color: #6a6b71;
}
</style>

