<template>
  <ShyTimeLine :data="shyTimeLineData" />
</template>
<script lang="ts" setup>
import { ShyTimeLine } from "../../../examples/node_modules/3h1-ui/index";

const shyTimeLineData = [
  {
    color: "red",
    content: [
      {
        label: "标签1",
        value: "这是value值1",
      },
      {
        label: "标签2",
        value: "这是value值1",
      },
      {
        label: "标签3",
        value: "这是value值1",
      },
    ],
  },
  {
    color: "green",
    content: [
      {
        label: "标签1",
        value: "这是value值1",
      },
      {
        label: "标签2",
        value: "这是value值1",
      },
      {
        label: "标签3",
        value: "这是value值1",
      },
    ],
  },
];
</script>
