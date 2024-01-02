<template><Tinymce v-model="state" width="100%" /></template>
<script lang="ts" setup>
import { Tinymce } from '@shy-plugins/tinymce'
import { useRuleFormItem } from '@shy-plugins/use'
// import { watchEffect } from 'vue'

const props = defineProps<{
  value: String
}>()

defineEmits(['change', 'input'])

const [state] = useRuleFormItem(props)
</script>
