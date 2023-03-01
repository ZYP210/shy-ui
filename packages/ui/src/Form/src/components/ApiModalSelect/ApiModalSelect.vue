<template>
  <div class="api-modal-select">
    <Input v-model:value="state" readonly>
      <template #addonAfter>
        <div class="btn-wrapper" @click="handleClick">
          <SmallDashOutlined />
        </div>
      </template>
    </Input>
  </div>
  <Modal @register="register" />
</template>

<script setup lang="ts">
import { useRuleFormItem } from '@shy-plugins/use'
import { watch, ref } from 'vue'
import { InputGroup, Input, Tooltip, Button } from 'ant-design-vue'
import { SmallDashOutlined } from '@ant-design/icons-vue'
import { useModal } from '../../../../Modal'
import Modal from './Modal.vue'
const props = defineProps({
  value: {
    type: String,
    default: () => {
      return ''
    }
  }
})

const [register, { openModal }] = useModal()

const emitData = ref([])
const [state] = useRuleFormItem(props, 'value', 'change', emitData)
const emit = defineEmits(['update:value'])

watch(
  () => state.value,
  (v) => {
    emit('update:value', v)
  }
)

const handleClick = () => {
  openModal(true, {})
}
</script>

<style scoped lang="less">
::v-deep(.ant-input-group-addon) {
  padding: 0;
}

.btn-wrapper {
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
