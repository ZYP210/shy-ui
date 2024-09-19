<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.type === 'input'">
        <a-input v-model:value="record[column.dataIndex]" />
      </template>
      <template v-if="column.type === 'color'">
        <ColorPicker v-model:pureColor="record[column.dataIndex]" />
      </template>
      <template v-if="column.type === 'select'">
        <a-select
          class="!w-70px"
          v-model:value="record[column.dataIndex]"
          :options="shapeOptions"
        ></a-select>
      </template>
      <template v-if="column.type === 'inputNumber'">
        <a-input-number
          v-model:value="record[column.dataIndex]"
          class="w-50px"
        />
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

const props = defineProps<{
  selectedNode: selectedNodeType
}>()

const emit = defineEmits(['update:selectedNode'])

const dataSource = ref<any[]>([])

const nodeColumns = [
  {
    title: '名称',
    dataIndex: 'labelText',
    align: 'center',
    type: 'input'
  },
  {
    title: '颜色',
    dataIndex: 'fill',
    align: 'center',
    type: 'color'
  },
  {
    title: '形状',
    dataIndex: 'shape',
    align: 'center',
    type: 'select'
  },
  {
    title: '半径',
    dataIndex: 'size',
    align: 'center',
    type: 'inputNumber'
  },
  {
    title: '文字颜色',
    dataIndex: 'labelFill',
    align: 'center',
    type: 'color'
  }
]

const edgeColumns = [
  {
    title: '名称',
    dataIndex: 'labelText',
    align: 'center',
    type: 'input'
  },
  {
    title: '颜色',
    dataIndex: 'stroke',
    align: 'center',
    type: 'color'
  },
  {
    title: '宽度',
    dataIndex: 'lineWidth',
    align: 'center',
    type: 'inputNumber'
  },
  {
    title: '文字颜色',
    dataIndex: 'labelFill',
    align: 'center',
    type: 'color'
  }
]

const columns = computed(() => {
  return props.selectedNode?.targetType === 'node' ? nodeColumns : edgeColumns
})

watchEffect(() => {
  if (!dataSource.value[0]) {
    dataSource.value[0] = {}
  }
  for (const element of unref(columns)) {
    dataSource.value[0][element.dataIndex] =
      props.selectedNode?.style?.[element.dataIndex]
  }
})

watch(
  dataSource,
  () => {
    emit('update:selectedNode', {
      ...props.selectedNode,
      style: cloneDeep(dataSource.value[0])
    })
  },
  { deep: true }
)

const shapeOptions = [
  { label: '圆形', value: 'circle' },
  { label: '矩形', value: 'rect' },
  { label: '菱形', value: 'diamond' },
  { label: '三角', value: 'triangle' }
]
</script>

<style lang="less">
.ant-table-cell {
  * {
    vertical-align: top !important;
  }
}
</style>
