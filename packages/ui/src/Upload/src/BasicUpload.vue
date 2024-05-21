<template>
  <div>
    <Space>
      <BasicButton
        type="primary"
        @click="openUploadModal"
        preIcon="carbon:cloud-upload"
      >
        {{ t('component.upload.upload') }}
      </BasicButton>
      <Tooltip placement="bottom" v-if="showPreview">
        <template #title>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <Button @click="openPreviewModal">
          <Icon icon="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </Button>
      </Tooltip>
    </Space>
    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      :fileListOpenDrag="fileListOpenDrag"
      :fileListDragOptions="fileListDragOptions"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, unref, computed, useAttrs } from 'vue'
import Icon from '../../Icon/src/Icon.vue'
import { Tooltip, Space, Button } from 'ant-design-vue'
import { useModal } from '../../Modal'
import { uploadContainerProps } from './props'
import { omit } from 'lodash-es'
import { useI18n } from '@shy-plugins/use'
import { isArray } from '@shy-plugins/utils'
import UploadModal from './components/UploadModal.vue'
import UploadPreviewModal from './components/UploadPreviewModal.vue'
import { BasicButton } from '../../Button'
// defineOptions({ name: 'BasicUpload' })

const props = defineProps(uploadContainerProps)

const emit = defineEmits(['change', 'delete', 'preview-delete', 'update:value'])

const attrs = useAttrs()
const { t } = useI18n()
// 上传modal
const [registerUploadModal, { openModal: openUploadModal }] = useModal()

//   预览modal
const [registerPreviewModal, { openModal: openPreviewModal }] = useModal()

const fileList = ref<string[]>([])

const showPreview = computed(() => {
  const { emptyHidePreview } = props
  if (!emptyHidePreview) return true
  return emptyHidePreview ? fileList.value.length > 0 : true
})

const bindValue = computed(() => {
  const value = { ...attrs, ...props }
  return omit(value, 'onChange')
})

watch(
  () => props.value,
  (value = []) => {
    fileList.value = isArray(value) ? value : []
  },
  { immediate: true }
)

// 上传modal保存操作
function handleChange(urls: string[]) {
  fileList.value = [...unref(fileList), ...(urls || [])]
  emit('update:value', fileList.value)
  emit('change', fileList.value)
}

// 预览modal保存操作
function handlePreviewChange(urls: string[]) {
  fileList.value = [...(urls || [])]
  emit('update:value', fileList.value)
  emit('change', fileList.value)
}

function handleDelete(record: Recordable<any>) {
  emit('delete', record)
}

function handlePreviewDelete(url: string) {
  emit('preview-delete', url)
}
</script>
