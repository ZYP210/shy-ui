<template>
  <Drawer
    v-model:visible="visible"
    class="set_promoter"
    :width="550"
    title="条件设置"
    placement="right"
    @close="saveCondition"
    destroyOnClose
    :footer-style="{ textAlign: 'right' }"
  >
    <Form>
      <FormItem
        label="条件组表达式"
        v-bind="validateInfos.expression"
        extra="使用表达式构建复杂逻辑，例如：（A & B) | C"
      >
        <Input v-model:value="modelRef.expression" />
      </FormItem>
    </Form>

    <!-- <template #footer>
      <a-space>
        <a-button type="primary" @click="saveCondition">确 定</a-button>
        <a-button @click="closeDrawer">取 消</a-button>
      </a-space>
    </template> -->
  </Drawer>
</template>
<script setup>
import { mapState, mapMutations } from "../../config/lib.js";

import { Form, FormItem, Drawer,Input, Space, Button } from "ant-design-vue";
import { reactive , ref, computed, watch } from "vue";
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

let { deploymentId, conditionsConfig1, conditionDrawer } = mapState();
let visible = computed({
  get() {
    return conditionDrawer.value;
  },
  set() {
    closeDrawer();
  },
});

watch(conditionsConfig1, (val) => {
  conditionsConfig = val.value;
  priorityLevel.value = val.priorityLevel;
  conditionConfig = val.priorityLevel
    ? conditionsConfig.conditionNodes[val.priorityLevel - 1]
    : { expression: '' };

  if (conditionConfig.expression) {
    const regex = /\${(.*?)}/g;
    const matches = conditionConfig.expression.match(regex);
    if (matches) {
  const contents = matches.map(match => match.replace('${', '').replace('}', ''));
      
      modelRef.expression = contents[0];
  }
    
  } else {
    modelRef.expression = "";
  }
});
let { setCondition, setConditionsConfig } = mapMutations();

const saveCondition = () => {
  validate()
    .then((res) => {
      if (res !== "error") {
        conditionsConfig.conditionNodes[priorityLevel.value - 1].expression = '${' + modelRef.expression + '}';
        setConditionsConfig({
          value: conditionsConfig,
          flag: true,
          id: conditionsConfig1.value.id,
        });
        closeDrawer();
      }
    })
    .catch(() => {});
};

const closeDrawer = (val) => {
  setCondition(false);
};
</script>
<style lang="less" scoped></style>
