<template>
  <Tinymce v-model="state" width="100%" />
</template>
<script lang="ts" setup>
import { useRuleFormItem } from '@shy-plugins/use'
import '@shy-plugins/tinymce/es/style.css'
import { defineAsyncComponent } from 'vue'

const Tinymce = defineAsyncComponent(async () => {
  const { Tinymce } = await import('@shy-plugins/tinymce')
  return Tinymce
})

const props = defineProps<{
  value: String
}>()

defineEmits(['change', 'input'])

const [state] = useRuleFormItem(props)
</script>
