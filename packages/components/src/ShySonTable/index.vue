<template>
  <a-steps v-model:current="stepOption.current" type="navigation" :style="stepOption.stepStyle" @change="stepChange">
    <a-step v-for="(item, index) in stepOption.columns" :key="index" :title="item?.title" :disabled="stepOption.disabled || item?.value != stepOption.current" />
  </a-steps>
</template>

<script lang="ts" setup>
import { defineProps, watch, defineEmits, reactive } from "vue";

interface columnItem {
  title: String;
  value: Number;
}

interface optionType {
  disabled: boolean;
  current: number;
  stepStyle: object;
  columns: Array<columnItem>;
}

const emit = defineEmits(["change"]);
const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const stepOption: optionType = reactive({
  disabled: false,
  current: 0,
  stepStyle: {},
  columns: [],
});

const stepChange = (current: number) => {
  emit("change", current);
};

watch(
  () => props.option,
  (newVal) => {
    Object.assign(stepOption, newVal);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
