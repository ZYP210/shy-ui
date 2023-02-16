<template>
  <Tinymce
    v-model="value"
    @change="handleChange"
    width="100%"
    :uploadUrl="uploadUrl"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tinymce } from '@shy-plugins/tinymce'

export default defineComponent({
  components: { Tinymce },
  setup() {
    const value = ref('hello world!')
    function handleChange(value: string) {
      console.log(value)
    }
    const uploadUrl = ref('http://192.168.1.140')
    return { handleChange, value, uploadUrl }
  }
})
</script>
