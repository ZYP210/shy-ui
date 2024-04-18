<template>
  <div class="p-40px">
    <BasicContainer
      title="详情"
      footer-align="center"
      cancel-align="right"
      :loading="loading"
    >
      <template #extra> Extra </template>
      <div>111</div>

      <template #footer> 7777 </template>
    </BasicContainer>
  </div>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { BasicContainer } from '3h1-ui'

const loading = ref(true)
</script>
