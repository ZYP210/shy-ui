<template>
  <a-upload
    list-type="picture-card"
    :show-upload-list="false"
    :customRequest="upload"
  >
    <img class="w-100px" v-if="picUrlRef" :src="picUrlRef" alt="avatar" />
    <div v-else>
      <!-- <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined> -->
      <div class="ant-upload-text">上传</div>
    </div>
  </a-upload>
</template>
<script lang="ts" setup>
// import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue'
import { useContext } from '/@/hooks/useContext'
import { Upload as AUpload } from 'ant-design-vue'
import { ref, watch } from 'vue'

const loading = ref<boolean>(false)
const { api } = useContext()

type Props = {
  value: string
}

const props = withDefaults(defineProps<Props>(), {
  value: ''
})

const emit = defineEmits(['change', 'update:value'])

const picUrlRef = ref<string>()

watch(
  () => props.value,
  (value) => {
    picUrlRef.value = value ? value : ''
  },
  { immediate: true }
)

const upload = async (param: Recordable) => {
  loading.value = true
  const data = await api.value.upload({ file: param.file })
  picUrlRef.value = data.link
  emit('update:value', picUrlRef.value)
  emit('change', picUrlRef.value)
  message.success('上传成功')
}
</script>
