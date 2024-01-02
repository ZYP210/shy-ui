<template>
  <Upload
    v-model:file-list="fileList"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      文件上传
    </a-button>
  </Upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadProps, Upload } from 'ant-design-vue'

const fileList = ref<UploadProps['fileList']>([])
</script>
