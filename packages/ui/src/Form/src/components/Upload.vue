<template>
  <div>
    <Upload v-model:file-list="state" @success="handleSuccess">
      <a-button>
        <upload-outlined></upload-outlined>
        文件上传
      </a-button>
    </Upload>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { Upload } from 'ant-design-vue'
import { useRuleFormItem } from '@shy-plugins/use'

const props = defineProps<{
  value: any[]
}>()

const emitData = ref<any[]>([])
const [state] = useRuleFormItem(props, 'value', 'change', emitData)
const handleSuccess = (file, fileList) => {
  emitData.value = fileList
}
</script>
