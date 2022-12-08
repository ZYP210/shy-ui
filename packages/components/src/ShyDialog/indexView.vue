<template>
  <Modal v-model:visible="visible">
    <template #footer>
      <div class="dialog-footer">
        <Button key="back" type="primary" @click="confirmEvent">确定</Button>
        <Button key="submit" @click="cancelEvent">取消</Button>
      </div>

      <slot name="footer"></slot>
    </template>
    <slot></slot>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, Button } from 'ant-design-vue'

interface Props {
  isButton?: boolean
}
const props = withDefaults(defineProps<Props>(), { isButton: true })

const visible = ref(false)

const open = () => {
  visible.value = true
}
const close = () => {
  cancelEvent()
}

const emit = defineEmits(['confirm', 'cancel'])

const confirmEvent = () => {
  emit('confirm', { close })
}

const cancelEvent = () => {
  emit('cancel')
  visible.value = false
}
defineExpose({ open, close })
</script>

<style scoped lang="less">
.dialog-footer {
  text-align: center;
}
</style>
