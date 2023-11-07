<template>
  <BasicContainer title="详情">
    <template #extra> Extra </template>
    <template #buttons>
      <Button type="primary">保存</Button>
    </template>
  </BasicContainer>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { BasicContainer } from '3h1-ui'
</script>
