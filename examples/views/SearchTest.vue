<template>
  <div class="box-main">
    <s-search :column="option.column"></s-search>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const option = reactive({
  column: [
    {
      label: '选择项',
      prop: '123'
    },
    {
      label: '选择项',
      prop: '123'
    },
    {
      label: '选择项',
      prop: '123'
    },
    {
      label: '选择项',
      prop: '123'
    },
    {
      label: '选择项',
      prop: '123'
    },
    {
      label: '选择项',
      prop: '123'
    }
  ]
})
</script>

<style lang="less" scoped>
.box-main {
  // width: 600px;
}
</style>
