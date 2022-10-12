<template>
  <a-descriptions :title="formOption.title" :bordered="formOption.viewBordered">
    <a-descriptions-item :label="e.label" v-for="(e, i) in formOption?.columns" :key="i">{{ formData[e?.propName || e?.prop] }}</a-descriptions-item>
  </a-descriptions>
</template>
<script lang="ts" setup>
import { watch, reactive } from "vue";
const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {};
    },
  },
  form: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const formData = reactive({});

const formOption = reactive({
  title: "",
  viewBordered: true,
  columns: [],
  ...props.option,
});

watch(
  () => props.form,
  (newVal) => {
    Object.assign(formData, newVal);
  },
  {
    deep: true,
    immediate: true,
  }
);

watch(
  () => props.option,
  (newVal) => {
    Object.assign(formOption, newVal);
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
