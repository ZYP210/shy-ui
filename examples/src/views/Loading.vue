<template>
  <div></div>
</template>

<script setup lang="ts">
import { createLoading } from '3h1-ui'
import { ref } from 'vue'

createLoading(
  {
    size: 'large',
    absolute: true
  },
  document.body
)
</script>

<style scoped></style>
