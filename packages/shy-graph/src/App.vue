<template>
  <a-config-provider :locale="zhCN">
    <a-layout class="h-full shy-graph">
      <a-layout-header :style="initStyle" class="shadow relative z-100">
        <Header />
      </a-layout-header>
      <a-layout-content :style="initStyle">
        <Graph />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import Graph from './components/Graph.vue'
import Header from './components/Header.vue'

const initStyle = {
  background: 'transparent',
  padding: 'unset'
}
</script>

<style scoped lang="less">
.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1);
  --tw-ring-offset-shadow: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
