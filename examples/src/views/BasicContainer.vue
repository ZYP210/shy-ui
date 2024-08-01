<template>
  <ShyContainer
    footer-align="center"
    cancel-align="right"
    @cancel="handleCancel"
    @submit="handleSubmit"
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
import { ShyContainer, BasicContainer } from '3h1-ui'
import { ShyTable } from '3h1-ui'

const handleCancel = () => {}

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
