<template>
  <Tinymce
    v-model="value"
    @change="handleChange"
    width="100%"
    :uploadUrl="uploadUrl"
  />
</template>
<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

const Tinymce = defineAsyncComponent(async () => {
  const { Tinymce } = await import('@shy-plugins/tinymce')
  return Tinymce
})

const value = ref('hello world!')
function handleChange(value: string) {
  console.log(value)
}
const uploadUrl = ref('http://192.168.1.140')
</script>
