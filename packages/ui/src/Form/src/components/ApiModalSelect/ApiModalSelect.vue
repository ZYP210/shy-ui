<template>
  <div class="api-modal-select">
    <Input v-model:value="state" :readonly="props.readonly">
      <template #addonAfter>
        <div class="btn-wrapper" @click="handleClick">
          <SmallDashOutlined />
        </div>
      </template>
    </Input>
    <FormItemRest>
      <Modal :title="title" @register="register" @confirm="handleConfirm" />
    </FormItemRest>
  </div>
</template>

<script setup lang="ts">
import { useRuleFormItem } from '@shy-plugins/use'
import { watch, ref, computed, provide, unref } from 'vue'
import { Input, FormItemRest } from 'ant-design-vue'
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
  tableComponentProps: {
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
      columns: [
        { title: 'a', dataIndex: 'a' },
        { title: 'b', dataIndex: 'b' },
        { title: 'c', dataIndex: 'c' },
        { title: 'd', dataIndex: 'd' }
      ]
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
  },
  selectMode: {
    default: 'single',
    type: String
  },
  fieldNames: {
    default: { label: 'name', value: 'id' }
  },
  readonly: {
    default: false,
    type: Boolean
  }
})

const [register, { openModal }] = useModal()

const emitData = ref([])
const label = ref('')
const [state] = useRuleFormItem(props, 'value', 'change', emitData)
const emit = defineEmits(['update:value', 'change', 'modal-confirm'])

const getTreeProps = computed(() => {
  return { ...props.tree }
})
const getTableProps = computed(() => {
  return { ...props.tableComponentProps }
})

const getSelectMode = computed(() => {
  return props.selectMode
})

provide('getTreeProps', getTreeProps)
provide('getTableProps', getTableProps)
provide('getSelectMode', getSelectMode)

watch(
  () => state.value,
  (v) => {
    emit('update:value', v)
  }
)

const handleClick = () => {
  openModal(true, {})
}

const handleConfirm = (rows) => {
  state.value = rows
    .map((item) => {
      return item[props.fieldNames.value]
    })
    .join(',')

  label.value = rows
    .map((item) => {
      return item[props.fieldNames.label]
    })
    .join(',')
  emit('modal-confirm', rows)
}

const getLabel = () => {
  return unref(label)
}

const setLabel = (value) => {
  label.value = value
}

defineExpose({ getLabel, setLabel })
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
