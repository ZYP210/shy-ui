<template>
  <div class="tooltip">
    <div class="tooltip-header">
      <a-row>
        <a-checkbox-group v-model:value="tooltipList">
          <a-col :span="6">
            <template v-for="(item, index) in options" :key="index">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            </template>
          </a-col>
        </a-checkbox-group>
      </a-row>
    </div>
    <div class="tooltip-body">
      <a-checkbox-group>
        <a-row>
          <template>
            <a-col :span="24">
              <a-checkbox :value="1">name</a-checkbox>
            </a-col>
          </template>
        </a-row>
      </a-checkbox-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tooltipList = ref([])
const options = [
  { label: '列展示', value: 'Apple' },
  { label: '序列号', value: 'Pear' },
  { label: '勾选列', value: 'Orange' },
  { label: '操作栏', value: 'Orange' }
]
</script>

<style scoped lang="less">
/* Tooltip 容器 */

/* Tooltip 文本 */
.tooltip {
  /* 定位 */
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 1;
  z-index: 999;
  padding: 5px 0;
  width: 500px;
  text-align: center;
  color: #fff;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;

  &::after {
    position: absolute;
    right: 20px;
    bottom: 100%; /* 提示工具头部 */
    margin-left: -5px;
    border-style: solid;
    border-width: 5px;
    border-color: transparent transparent #e8e8e8;
    content: ' ';
  }
}

.tooltip-header {
  border-bottom: 1px solid #e8e8e8;
  padding: 0 15px;
}

.tooltip-body {
  overflow: auto;
  //   height: 500px;
}
</style>
