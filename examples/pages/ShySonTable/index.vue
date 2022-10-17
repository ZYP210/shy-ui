<template>
  <ShySonTable :columns="tableCloumns" />
</template>
<script lang="ts" setup>
import { ShySonTable } from "../../../examples/node_modules/3h1-ui/index";

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
];
</script>
