<template>
  <Upload
    v-model:file-list="fileList"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Upload
    </a-button>
  </Upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadProps, Upload } from 'ant-design-vue'

const fileList = ref<UploadProps['fileList']>([
  {
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png'
  },
  {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png'
  },
  {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png'
  }
])
</script>
