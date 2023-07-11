<template>
  <PageSecond
    title="测试"
    :isShowCancelButton="true"
    @click-return="handleClickReturn"
  >
    <template #beforeCancelButton>1</template>
    <template #afterCancelButton>1</template>
    <template #beforeConfirmButton>1</template>
  </PageSecond>
</template>

<script setup lang="ts">
import { PageSecond } from '3h1-ui'

const handleClickReturn = () => {
  console.log(1)
}
</script>

<style scoped></style>
