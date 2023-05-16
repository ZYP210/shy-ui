<template>
  <div class="table-plus">
    <div class="table-plus-search"></div>
    <vxe-table v-bind="getBindValues">
      <vxe-column type="seq" width="60"></vxe-column>
      <template v-for="(column, index) in getColumns" :key="index">
        <vxe-column v-bind="column">
          <template #default="config">
            <slot :name="column.field" v-bind="config">123</slot>
          </template>
        </vxe-column>

        <vxe-column title=""></vxe-column>
      </template>
    </vxe-table>
    <div class="table-plus-pagination">
      <Pagination
        size="small"
        :total="50"
        show-size-changer
        show-quick-jumper
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSlots, useAttrs, computed } from 'vue'
import {
  VxeTable,
  VxeColumn,
  VxeTablePropTypes,
  VxeColumnProps
} from 'vxe-table'
import { basicColumn, basicProps } from './props'
import { Pagination } from 'ant-design-vue'

interface Props {
  columns: VxeColumnProps[]
  isSeq: boolean
  actionColumn: VxeColumnProps
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [] as VxeColumnProps[],
  isSeq: true,
  actionColumn: () => {
    return {
      title: '操作',
      field: 'action',
      width: 60
    }
  }
})
const attrs = useAttrs()
const slots = useSlots()

const getBindValues = computed(() => {
  return {
    ...basicProps,
    ...attrs
  }
})

const getColumns = computed(() => {
  return props.columns.map((item) => {
    return { ...basicColumn, ...item }
  })
})
</script>
<style lang="less" scoped></style>
