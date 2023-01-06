<template>
  <BasicButton color="success">成功按钮</BasicButton>
  <BasicButton color="error">错误按钮</BasicButton>
  <BasicButton color="warning">警告按钮</BasicButton>

  <PopConfirmButton :enable="false">按钮文本</PopConfirmButton>
</template>

<script lang="ts" setup>
import { BasicButton, PopConfirmButton } from '3h1-ui'
</script>
