<template>
  <ShySteps :option="stepOption" @change="stepChange" />
</template>
<script lang="ts" setup>
import { ShySteps } from "../../../examples/node_modules/3h1-ui/index";

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
</script>
