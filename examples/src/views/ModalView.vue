<template>
  <div>
    <BasicModal
      cancel-text="取消"
      ok-text="确定"
      :loading="false"
      :visible="true"
      title="人物选择器"
      :maskClosable="false"
      :width="800"
    >
      <div class="h-1000px bg-pink-100"></div>
    </BasicModal>
  </div>
</template>

<script setup lang="ts">
import { useModal, BasicModal } from '3h1-ui'
const modal = useModal()

console.log('modal', modal)
</script>

<!-- <style scoped></style> -->
