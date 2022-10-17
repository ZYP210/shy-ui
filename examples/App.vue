<template>
  <div class="box-main">
    <ShySonTable ref="shySonTableRef" :columns="tableCloumns" />
    <div @click="getVal">点击</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ShySonTable } from "../examples/node_modules/3h1-ui/index";
const shySonTableRef = ref({});
const getVal = () => {
  console.log(shySonTableRef.value?.tableData);
};
const tableCloumns = [
  {
    label: "字典编号",
    prop: "code",
    tableWidth: 220,
    search: true,
    span: 24,
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "字典名称",
    prop: "dictValue",
    search: true,
    tableWidth: 220,
    span: 24,
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "字典排序",
    prop: "sort",
    type: "number",
    span: 24,
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "字典下拉",
    prop: "select",
    type: "select",
    span: 24,
    dicData: [
      {
        label: "是",
        value: 1,
      },
      {
        label: "否",
        value: 0,
      },
    ],
  },
];
</script>

<style lang="less" scoped>
.box-main {
  width: 600px;
}
</style>
