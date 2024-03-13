<template>
  <div class="w-full h-full">
    <ColorPickerPopover v-model:color="color" />
    {{ color }}
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { ColorPickerPopover } from '3h1-ui'

const color = ref(theme.defaultConfig.token.colorPrimary)
</script>
