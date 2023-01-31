<template>
  <CountdownInput class="abc" v-model:value="value" />
</template>
<script lang="ts" setup>
import { CountdownInput } from '3h1-ui'
import { ref, watch } from 'vue'

const value = ref('abc')

watch(value, () => {
  console.log('value', value.value)
})
</script>
