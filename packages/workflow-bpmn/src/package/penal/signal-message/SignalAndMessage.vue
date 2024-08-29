<template>
  <div class="panel-tab__content">
    <div class="panel-tab__content--title">
      <span><Icon icon="ep:menu" style="margin-right: 8px; color: #555" />消息列表</span>
      <Button type="primary" @click="openModel('message')"
        ><Icon icon="ep:plus" />创建新消息</Button
      >
    </div>
    <Table
      :dataSource="messageList"
      :columns="messageColumns"
      showIndexColumn
      :showTableSetting="false"
      :pagination="false"
      :canResize="false"
    >
      <!-- <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'action'">
          <ShyTableAction
            :actions="[
              {
                label: '删除',
                onClick: messageDel.bind(null, { record, index }),
              },
            ]"
          />
        </template>
      </template> -->
    </Table>
    <div
      class="panel-tab__content--title"
      style="padding-top: 8px; margin-top: 8px; border-top: 1px solid #eee"
    >
      <span><Icon icon="ep:menu" style="margin-right: 8px; color: #555" />信号列表</span>
      <Button type="primary" @click="openModel('signal')"><Icon icon="ep:plus" />创建新信号</Button>
    </div>
    <Table
      :dataSource="signalList"
      :columns="signalColumns"
      showIndexColumn
      :showTableSetting="false"
      :pagination="false"
      :canResize="false"
    />

    <BasicModal
      v-model:visible="dialogVisible"
      :title="modelConfig.title"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
    >
      <Form
        :model="modelObjectForm"
        :label-col="{ style: { width: '90px' } }"
        ref="formRef"
      >
        <FormItem :label="modelConfig.idLabel" name="id">
          <Input v-model:value="modelObjectForm.id" clearable />
        </FormItem>
        <FormItem :label="modelConfig.nameLabel" name="name">
          <Input v-model:value="modelObjectForm.name" clearable />
        </FormItem>
      </Form>
      <template #footer>
        <Button @click="dialogVisible = false">取 消</Button>
        <Button type="primary" @click="addNewObject">保 存</Button>
      </template>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { Button, Form, FormItem, Input, Table } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { BasicModal, Icon, ShyTableAction } from '3h1-ui';
  import { useMessage } from '@shy-plugins/use';
  import { reactive,onMounted,computed ,ref} from 'vue';
  // defineOptions({ name: 'SignalAndMassage' });
  const messageColumns = [
    {
      title: '消息ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '消息名称',
      dataIndex: 'name',
      key: 'name',
    },
    // { width: 90, title: '操作', dataIndex: 'action' },
  ];
  const signalColumns = [
    {
      title: '信号ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '信号名称',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const { createMessage } = useMessage();
  const signalList = ref<any[]>([]);
  const messageList = ref<any[]>([]);
  const dialogVisible = ref(false);
  const modelType = ref('');
  const modelObjectForm = reactive<any>({ id: '', name: '' });
  const rootElements = ref();
  const messageIdMap = ref();
  const signalIdMap = ref();
  const formRef = ref<FormInstance>() as any;
  const modelConfig = computed(() => {
    if (modelType.value === 'message') {
      return { title: '创建消息', idLabel: '消息ID', nameLabel: '消息名称' };
    } else {
      return { title: '创建信号', idLabel: '信号ID', nameLabel: '信号名称' };
    }
  });
  const bpmnInstances = () => (window as any)?.bpmnInstances;

  const initDataList = () => {
    rootElements.value = bpmnInstances().modeler.getDefinitions().rootElements;
    messageIdMap.value = {};
    signalIdMap.value = {};
    messageList.value = [];
    signalList.value = [];
    rootElements.value.forEach((el) => {
      if (el.$type === 'bpmn:Message') {
        messageIdMap.value[el.id] = true;
        messageList.value.push({ ...el });
      }
      if (el.$type === 'bpmn:Signal') {
        signalIdMap.value[el.id] = true;
        signalList.value.push({ ...el });
      }
    });
  };
  const openModel = (type) => {
    modelType.value = type;
    dialogVisible.value = true;
  };
  //行数据删除
  // const messageDel = ({ record, index }) => {
  //   messageList.value = messageList.value.filter((_, idx) => idx !== index);
  //   rootElements.value = rootElements.value.filter((_, idx) => idx !== index);
  //   messageIdMap.value.delete[record.id];
  // };
  const addNewObject = () => {
    if (modelType.value === 'message') {
      if (messageIdMap.value[modelObjectForm.id]) {
        createMessage.error('该消息已存在，请修改id后重新保存');
        return;
      }
      const messageRef = bpmnInstances().moddle.create('bpmn:Message', modelObjectForm);
      rootElements.value.push(messageRef);
    } else {
      if (signalIdMap.value[modelObjectForm.id]) {
        createMessage.error('该信号已存在，请修改id后重新保存');
      }
      const signalRef = bpmnInstances().moddle.create('bpmn:Signal', modelObjectForm);
      rootElements.value.push(signalRef);
    }
    formRef.value.resetFields();
    dialogVisible.value = false;
    initDataList();
  };

  onMounted(() => {
    initDataList();
  });
</script>
