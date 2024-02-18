<template>
  <Table :columns="columns" :data-source="dataSource" :pagination="false">
    <template #bodyCell="{ text, record, index, column }">
      <template v-if="['label'].includes(column.dataIndex)">
        <span>{{ text }}</span>
      </template>
      <template v-else>
        <RadioGroup v-model:value="checkList[index]">
          <Radio :value="record[column.dataIndex]" />
        </RadioGroup>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import { RadioGroup,Table,Radio } from "ant-design-vue";
const props = defineProps({
  fieldPermissions: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Object,
    default: () => {
      return {
        columns: ["operate", "readonly", "isHidden"],
      };
    },
  },
});

const emits = defineEmits(["update:fieldPermissions"]);

const columns = [
  {
    title: "组件名称",
    dataIndex: "label",
    width: "25%",
    align: "center",
  },
  {
    title: "可操作",
    dataIndex: "operate",
    width: "25%",
    align: "center",
  },
  {
    title: "只读",
    dataIndex: "readonly",
    width: "25%",
    align: "center",
  },
].filter((res, index) => index < 1 || props.options.columns.includes(res.dataIndex));

const checkList = ref<any[]>([]);

const data: any[] = [];

props.fieldPermissions.forEach((res: any) => {
  const obj = {};
  for (const key in res) {
    if (typeof res[key] === "boolean") {
      obj[key] = key;
    } else {
      obj[key] = res[key];
    }
  }
  data.push({ ...obj });
});

try {
  for (let i = 0; i < data.length; i++) {
    const curr = data[i];
    for (const key in curr) {
      if (curr[key] === key && (props.fieldPermissions as any)[i][key] === true) {
        checkList.value.push(key);
        break;
      }
    }
  }
} catch {}

const dataSource = ref(data);

watch(
  checkList,
  () => {
    const list = dataSource.value.map((res, i) => {
      const obj: any = {};
      for (const key in res) {
        if (checkList.value[i] === res[key]) {
          obj[key] = true;
        } else if (res[key] === key) {
          obj[key] = false;
        } else {
          obj[key] = res[key];
        }
      }
      return obj;
    });
    emits("update:fieldPermissions", list);
  },
  { deep: true },
);
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>

