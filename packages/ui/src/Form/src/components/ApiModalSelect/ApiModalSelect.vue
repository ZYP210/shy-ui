<template>
  <div class="api-modal-select">
    <Input v-model:value="label" readonly>
      <template #addonAfter>
        <div class="btn-wrapper" @click="handleClick">
          <SmallDashOutlined />
        </div>
      </template>
    </Input>
  </div>
  <Modal @register="register" @confirm="handleConfirm" />
</template>

<script setup lang="ts">
import { useRuleFormItem } from '@shy-plugins/use'
import { watch, ref, computed, provide, unref } from 'vue'
import { Input } from 'ant-design-vue'
import { SmallDashOutlined } from '@ant-design/icons-vue'
import { useModal } from '../../../../Modal'
import Modal from './Modal.vue'

const props = defineProps({
  value: {
    default: ''
  },
  title: {
    default: 'title'
  },
  table: {
    type: Object,
    default: () => ({
      api: () =>
        new Promise((resolve) => {
          resolve([
            { a: 1, b: 2, c: 3, d: 4, id: '1' },
            { a: 1, b: 2, c: 3, d: 4, id: '2' },
            { a: 1, b: 2, c: 3, d: 4, id: '3' },
            { a: 1, b: 2, c: 3, d: 4, id: '4' },
            { a: 1, b: 2, c: 3, d: 4, id: '5' },
            { a: 1, b: 2, c: 3, d: 4, id: '6' },
            { a: 1, b: 2, c: 3, d: 4, id: '7' },
            { a: 1, b: 2, c: 3, d: 4, id: '8' },
            { a: 1, b: 2, c: 3, d: 4, id: '9' },
            { a: 1, b: 2, c: 3, d: 4, id: '10' }
          ])
        }),
      fieldNames: { label: 'a', value: 'id' }
    })
  },
  tree: {
    default: () => ({
      fieldNames: { label: 'a', value: 'id' },
      api: () =>
        new Promise((resolve) => {
          resolve([
            {
              title: 'father',
              key: '1',
              children: [{ title: '1-son', key: '1-1' }]
            },
            {
              title: 'father2',
              key: '2',
              children: [{ title: '2-son', key: '2-1' }]
            }
          ])
        })
    })
  }
})

const [register, { openModal }] = useModal()

const emitData = ref([])
const label = ref('')
const [state] = useRuleFormItem(props, 'value', 'change', emitData)
const emit = defineEmits(['update:value'])

const getTreeProps = computed(() => {
  return { ...props.tree }
})
const getTableProps = computed(() => {
  return { ...props.table }
})

provide('getTreeProps', getTreeProps)
provide('getTableProps', getTableProps)

watch(
  () => state.value,
  (v) => {
    emit('update:value', v)
  }
)

const handleClick = () => {
  openModal(true, {})
}

const handleConfirm = (list, labelList) => {
  state.value = list.join(',')
  label.value = labelList.join(',')
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
