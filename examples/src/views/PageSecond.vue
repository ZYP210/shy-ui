<template>
  <div class="h-full p-10px" style="background-color: black">
    <PageSecond
      title="测试"
      :isShowFooter="true"
      @click-return="handleClickReturn"
    >
      <template #titleAfter>
        <a-button>1</a-button>
      </template>
      <template #beforeCancelButton>1</template>
      <template #afterCancelButton>1</template>
      <template #beforeConfirmButton>1</template>
    </PageSecond>
  </div>
</template>

<script setup lang="ts">
import { PageSecond } from '3h1-ui'

const handleClickReturn = () => {
  console.log(1)
}
</script>

<style scoped></style>
