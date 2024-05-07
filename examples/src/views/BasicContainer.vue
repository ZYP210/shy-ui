<template>
  <ShyContainer
    footer-align="center"
    cancel-align="right"
    :loading="loading"
    :nav-bars="[
    {
      name: '客户管理',
      path: '/opportunityManagement/customerManagement',
    },
    {
      name: 'zzz',
      path: '',
    },
    ]"
    @route-change="changePath"
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

const changePath = (path: string) => {
  console.log(path)
}
</script>
