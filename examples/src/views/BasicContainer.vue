<template>
  <ShyContainer
    footer-align="center"
    cancel-align="right"
    @cancel="handleCancel"
    @submit="handleSubmit"
    @route-change="changePath"
    title="zzz"
    :navBars="[
      { name: '的饭卡手机号', path: '111' },
      { name: '速度速度', path: '111' }
    ]"
    pageHeader="arrow"
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
import { ShyContainer, BasicContainer } from '3h1-ui'
import { ShyTable } from '3h1-ui'
const handleCancel = () => {
  console.log('333s')
}

const handleSubmit = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 4000)
  })
  // console.log(888)
}

const changePath = (path: string) => {
  console.log(path)
}
</script>
