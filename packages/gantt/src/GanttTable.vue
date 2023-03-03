<template>
  <div class="gantt-table">
    <vxe-table
      class="satellite-table"
      :border="true"
      @scroll.native="handleScrollEvent"
      ref="tableRef"
      height="auto"
      auto-resize
      size="small"
      :data="data"
      show-overflow
      :row-config="{ height: 40 }"
    >
      <template v-for="(column, index) in columns" :key="index">
        <vxe-column
          :field="column.field"
          :title="column.title"
          align="center"
          :width="column.width || undefined"
          :min-width="column.minWidth || undefined"
        ></vxe-column>
      </template>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VxeTable, VxeColumn } from 'vxe-table'
import { TableColumns } from './type'

const props = withDefaults(
  defineProps<{
    option: {
      columns: TableColumns[]
    }
    data: any[]
  }>(),
  {}
)

const tableRef = ref()
const emit = defineEmits(['scroll-y'])
const handleScrollEvent = () => {
  const dom = tableRef.value.$el.querySelector('.vxe-table--body-wrapper')
  emit('scroll-y', dom.scrollTop)
}
const setScrollY = (y) => {
  const dom = tableRef.value.$el.querySelector('.vxe-table--body-wrapper')
  dom.scrollTop = y
}
defineExpose({ setScrollY })

const columns = computed(() => {
  return props.option.columns
})
</script>

<style scoped lang="less">
.gantt-table {
  flex: none;
  overflow: hidden;
  width: 200px;
}

.satellite-table {
  /*滚动条整体部分*/
  & ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  /*滚动条的轨道*/
  & ::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
  /*滚动条里面的小方块，能向上向下移动*/
  & ::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
    border-radius: 5px;
    border: 1px solid #f1f1f1;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  & ::-webkit-scrollbar-thumb:hover {
    background-color: #a8a8a8;
  }
  & ::-webkit-scrollbar-thumb:active {
    background-color: #787878;
  }
  /*边角，即两个滚动条的交汇处*/
  & ::-webkit-scrollbar-corner {
    background-color: #ffffff;
  }
}
</style>

<style></style>
