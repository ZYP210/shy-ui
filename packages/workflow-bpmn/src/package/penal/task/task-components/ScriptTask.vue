<template>
  <div style="margin-top: 16px">
    <FormItem label="脚本格式">
      <Input
        v-model:value="scriptTaskForm.scriptFormat"
        clearable
        @input="updateElementTask()"
        @change="updateElementTask()"
      />
    </FormItem>
    <FormItem label="脚本类型">
      <Select v-model:value="scriptTaskForm.scriptType">
        <SelectOption value="inline">内联脚本</SelectOption>
        <SelectOption value="external">外部资源</SelectOption>
      </Select>
    </FormItem>
    <FormItem label="脚本" v-show="scriptTaskForm.scriptType === 'inline'">
      <Input
        v-model:value="scriptTaskForm.script"
        type="textarea"
        resize="vertical"
        :autosize="{ minRows: 2, maxRows: 4 }"
        clearable
        @input="updateElementTask()"
        @change="updateElementTask()"
      />
    </FormItem>
    <FormItem label="资源地址" v-show="scriptTaskForm.scriptType === 'external'">
      <Input
        v-model:value="scriptTaskForm.resource"
        clearable
        @input="updateElementTask()"
        @change="updateElementTask()"
      />
    </FormItem>
    <FormItem label="结果变量">
      <Input
        v-model:value="scriptTaskForm.resultVariable"
        clearable
        @input="updateElementTask()"
        @change="updateElementTask()"
      />
    </FormItem>
  </div>
</template>

<script lang="ts" setup>
  import { FormItem, Input, Select, SelectOption } from 'ant-design-vue';
  defineOptions({ name: 'ScriptTask' });
  const props = defineProps({
    id: String,
    type: String,
  });
  const defaultTaskForm = ref({
    scriptFormat: '',
    script: '',
    resource: '',
    resultVariable: '',
  });
  const scriptTaskForm = ref<any>({});
  const bpmnElement = ref();

  const bpmnInstances = () => (window as any)?.bpmnInstances;

  const resetTaskForm = () => {
    for (let key in defaultTaskForm.value) {
      let value = bpmnElement.value?.businessObject[key] || defaultTaskForm.value[key];
      scriptTaskForm.value[key] = value;
    }
    scriptTaskForm.value.scriptType = scriptTaskForm.value.script ? 'inline' : 'external';
  };
  const updateElementTask = () => {
    let taskAttr = Object.create(null);
    taskAttr.scriptFormat = scriptTaskForm.value.scriptFormat || null;
    taskAttr.resultVariable = scriptTaskForm.value.resultVariable || null;
    if (scriptTaskForm.value.scriptType === 'inline') {
      taskAttr.script = scriptTaskForm.value.script || null;
      taskAttr.resource = null;
    } else {
      taskAttr.resource = scriptTaskForm.value.resource || null;
      taskAttr.script = null;
    }
    bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), taskAttr);
  };

  onBeforeUnmount(() => {
    bpmnElement.value = null;
  });

  watch(
    () => props.id,
    () => {
      bpmnElement.value = bpmnInstances().bpmnElement;
      nextTick(() => {
        resetTaskForm();
      });
    },
    { immediate: true },
  );
</script>
