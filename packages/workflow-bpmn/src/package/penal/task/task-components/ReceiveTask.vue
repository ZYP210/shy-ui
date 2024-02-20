<template>
  <div style="margin-top: 16px">
    <FormItem label="消息实例">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap;
        "
      >
        <Select v-model:value="bindMessageId" @change="updateTaskMessage">
          <SelectOption v-for="key in Object.keys(messageMap)" :value="key" :key="key">{{
            messageMap[key]
          }}</SelectOption>
        </Select>
        <Button type="primary" style="margin-left: 8px" @click="openMessageModel"
          ><Icon icon="ep:plus"
        /></Button>
      </div>
    </FormItem>
    <BasicModal
      v-model:visible="messageModelVisible"
      :close-on-click-modal="false"
      title="创建新消息"
      width="400px"
      append-to-body
      destroy-on-close
    >
      <Form :model="newMessageForm" :label-col="{ style: { width: '90px' } }">
        <FormItem label="消息ID">
          <Input v-model:value="newMessageForm.id" clearable />
        </FormItem>
        <FormItem label="消息名称">
          <Input v-model:value="newMessageForm.name" clearable />
        </FormItem>
      </Form>
      <template #footer>
        <Button type="primary" @click="createNewMessage">确 认</Button>
      </template>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { FormItem, Form, Input, Select, SelectOption, Button } from 'ant-design-vue';
  import { BasicModal } from '3h1-ui';
import { useMessage } from '@shy-plugins/use';
import {ref ,toRaw,onBeforeUnmount,watch,nextTick,onMounted} from 'vue'
  // defineOptions({ name: 'ReceiveTask' });
  const props = defineProps({
    id: String,
    type: String,
  });

  const message = useMessage() as any;

  const bindMessageId = ref('');
  const newMessageForm = ref<any>({});
  const messageMap = ref<any>({});
  const messageModelVisible = ref(false);
  const bpmnElement = ref<any>();
  const bpmnMessageRefsMap = ref<any>();
  const bpmnRootElements = ref<any>();

  const bpmnInstances = () => (window as any).bpmnInstances;
  const getBindMessage = () => {
    bpmnElement.value = bpmnInstances().bpmnElement;
    bindMessageId.value = bpmnElement.value.businessObject?.messageRef?.id || '-1';
  };
  const openMessageModel = () => {
    messageModelVisible.value = true;
    newMessageForm.value = {};
  };
  const createNewMessage = () => {
    if (messageMap.value[newMessageForm.value.id]) {
      message.error('该消息已存在，请修改id后重新保存');
      return;
    }
    const newMessage = bpmnInstances().moddle.create('bpmn:Message', newMessageForm.value);
    bpmnRootElements.value.push(newMessage);
    messageMap.value[newMessageForm.value.id] = newMessageForm.value.name;
    bpmnMessageRefsMap.value[newMessageForm.value.id] = newMessage;
    messageModelVisible.value = false;
  };
  const updateTaskMessage = (messageId) => {
    if (messageId === '-1') {
      bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {
        messageRef: null,
      });
    } else {
      bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {
        messageRef: bpmnMessageRefsMap.value[messageId],
      });
    }
  };

  onMounted(() => {
    bpmnMessageRefsMap.value = Object.create(null);
    bpmnRootElements.value = bpmnInstances().modeler.getDefinitions().rootElements;
    bpmnRootElements.value
      .filter((el) => el.$type === 'bpmn:Message')
      .forEach((m) => {
        bpmnMessageRefsMap.value[m.id] = m;
        messageMap.value[m.id] = m.name;
      });
    messageMap.value['-1'] = '无';
  });

  onBeforeUnmount(() => {
    bpmnElement.value = null;
  });
  watch(
    () => props.id,
    () => {
      // bpmnElement.value = bpmnInstances().bpmnElement
      nextTick(() => {
        getBindMessage();
      });
    },
    { immediate: true },
  );
</script>
