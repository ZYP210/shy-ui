<template>
  <ShyClassTree :data="data" @onSearch="onSearch" @treeSelect="treeSelect" :treeOption="treeOption" />
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { ShyClassTree } from "../../../examples/node_modules/3h1-ui/index";
const treeOption = {
  showLine: false,
};
const onSearch = (data: any) => {
  console.log(data);
};
const treeSelect = (data: any) => {
  console.log(data);
};
const data = reactive([
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          { title: "leaf", key: "0-0-0-0" },
          { title: "leaf", key: "0-0-0-1" },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [{ key: "0-0-1-0", title: "sss" }],
      },
    ],
  },
  {
    title: "parent 2",
    key: "1-0",
    children: [
      {
        title: "parent 2-0",
        key: "1-0-0",
      },
      {
        title: "parent 2-1",
        key: "2-0-1",
      },
    ],
  },
]);
</script>
