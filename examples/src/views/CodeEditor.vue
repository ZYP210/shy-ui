<template>
  <CodeEditor v-model:value="value" :mode="modeValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CodeEditor } from '3h1-ui'

const modeValue = ref('application/json')
const value = ref()
</script>
