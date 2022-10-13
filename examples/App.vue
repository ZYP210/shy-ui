<template>
  <div class="box-main">
    <ShyClassTree :data="data" @onSearch="onSearch" @treeSelect="treeSelect" :treeOption="treeOption" />
    <ShyTimeLine :data="shyTimeLineData" />
    <ShySteps :option="stepOption" @change="stepChange" />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { ShyClassTree, ShyTimeLine, ShySteps } from "3h1-ui";

const treeOption = {
  showLine: false,
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

const onSearch = (data: any) => {
  console.log(data);
};
const treeSelect = (data: any) => {
  console.log(data);
};

const stepOption = {
  columns: [
    {
      title: "第一步",
      value: 0,
    },
    {
      title: "第二步",
      value: 1,
    },
    {
      title: "第三步",
      value: 2,
    },
  ],
};

const stepChange = (data: number) => {
  console.log(data);
};

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
<style lang="less" scoped>
.box-main {
  width: 600px;
}
</style>
