<template>
  <a-drawer
    v-model:visible="visible"
    class="set_promoter"
    :width="550"
    title="分支设置"
    placement="right"
    @close="saveCondition"
    destroyOnClose
    :footer-style="{ textAlign: 'right' }"
  >
    <template #footer>
      <a-space>
        <a-button type="primary" @click="saveCondition">确 定</a-button>
        <a-button @click="closeDrawer">取 消</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script setup>
import { mapState, mapMutations } from "../../config/lib.js";

import { Form } from "ant-design-vue";
import { reactive } from "vue";
const useForm = Form.useForm;

const modelRef = reactive({ expression: "" });

let conditionsConfig = reactive({
  conditionNodes: [],
});
let conditionConfig = reactive({});
let priorityLevel = ref("");

const { validate, validateInfos } = useForm(
  modelRef,
  reactive({
    expression: [
      {
        required: true,
        message: "请输入条件组表达式",
      },
    ],
  }),
);

let { deploymentId, branchConfig1, branchDrawer } = mapState();
let visible = computed({
  get() {
    return branchDrawer.value;
  },
  set() {
    closeDrawer();
  },
});

watch(branchConfig1, (val) => {});
let { setBranch, setBranchConfig } = mapMutations();

const saveCondition = () => {
  validate()
    .then((res) => {
      // if (res !== "error") {
      //   conditionsConfig.conditionNodes[priorityLevel.value - 1].conditionList[0] = {
      //     conditionExpression: modelRef.expression,
      //   };
      //   setBranchConfig({
      //     value: conditionsConfig,
      //     flag: true,
      //     id: branchConfig1.value.id,
      //   });
      //   closeDrawer();
      // }
    })
    .catch(() => {})
    .finally(() => {
      closeDrawer();
    });
};

const closeDrawer = (val) => {
  setBranch(false);
};
</script>
<style lang="less" scoped></style>
