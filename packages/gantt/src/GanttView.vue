<template>
  <div class="gantt-view">
    <GanttTable
      ref="tableRef"
      :option="props.option"
      :data="props.data"
      :width="props.tableWidth"
      @scroll-y="handleScrollYEvent($event, 'table')"
    ></GanttTable>
    <GanttChart
      ref="chartRef"
      :data="data"
      @scroll-y="handleScrollYEvent($event, 'chart')"
    ></GanttChart>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import GanttTable from './GanttTable.vue'
import GanttChart from './GanttChart.vue'
import 'vxe-table/lib/style.css'
import { TableColumns } from './type'

const props = withDefaults(
  defineProps<{
    option: { columns: TableColumns[] }
    data: any
    tableWidth: number
  }>(),
  {
    tableWidth: 200
  }
)

const tableRef = ref()
const chartRef = ref()
const handleScrollYEvent = (y, type) => {
  if (type === 'table') {
    chartRef.value.setScrollY(y)
  } else {
    tableRef.value.setScrollY(y)
  }
}
</script>

<style scoped lang="less">
.gantt-view {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  // background-color: transparent;
  overflow: hidden;
}

.scrollbar-x {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  overflow-x: auto;
  z-index: 2000;

  &::-webkit-scrollbar {
    appearance: none;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

  .x-child {
    height: 5px;
  }

  svg {
    font-size: 0px;
    display: block;
  }
}
.scrollbar-y {
  position: absolute;
  width: 40px;
  right: 0;
  top: 40px;
  bottom: 0;
  overflow-y: auto;
  z-index: 3000;

  &::-webkit-scrollbar {
    appearance: none;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

  .y-child {
    height: 5px;
  }

  svg {
    font-size: 0px;
    display: block;
  }
}
</style>
