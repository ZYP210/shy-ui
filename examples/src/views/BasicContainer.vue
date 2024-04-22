<template>
  <ShyContainer
    title="查看提前开工"
    footer-align="center"
    cancel-align="right"
    :loading="loading"
    :nav-bars="[
      { name: '首页', href: '/zzz' },
      { name: '首页1', href: '/zzz' }
    ]"
  >
    <template #extra> 11111 </template>
    <div>
      <shy-table></shy-table>
    </div>
    <template #buttons>
      <div>footer</div>
      <div>footer</div>
    </template>
  </ShyContainer>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { ShyContainer } from '3h1-ui'
import { ShyTable } from '3h1-ui'
const loading = ref(false)
</script>
