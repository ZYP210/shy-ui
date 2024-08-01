<template>
  <div
    class="!w-[fit-content] h-full flex flex-col gap-8px p-16px overflow-hidden"
  >
    <BasicButton
      type="primary"
      preIcon="tabler:square-rounded-plus"
    >
      主要按钮
    </BasicButton>
    <BasicButton> 次要按钮 </BasicButton>
    <div class="bg-[var(--gray-5)] p-8px">
      <BasicButton ghost>幽灵按钮</BasicButton>
    </div>
    <BasicButton type="dashed">虚线按钮</BasicButton>
    <BasicButton type="danger">危险按钮</BasicButton>
  </div>
</template>

<script lang="ts" setup>
import { BasicButton } from '3h1-ui'
</script>
