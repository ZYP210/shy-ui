<template>
  <div class="panel-tab__content">
    <Table
      :dataSource="elementListenersList"
      :columns="elementListenersColumns"
      showIndexColumn
      :showTableSetting="false"
      :pagination="false"
      :canResize="false"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                onClick: openListenerForm.bind(null, record, index),
              },
              {
                label: '移除',
                onClick: removeListener.bind(null, record, index),
              },
            ]"
          />
        </template>
      </template>
    </Table>
    <div class="element-drawer__button">
      <Button type="primary" @click="openListenerForm(null)"
        ><Icon icon="ep:plus" />添加监听器</Button
      >
    </div>

    <!-- 监听器 编辑/创建 部分 -->
    <BasicDrawer
      v-model:visible="listenerFormModelVisible"
      title="任务监听器"
      :width="`${width}px`"
      append-to-body
      destroy-on-close
    >
      <Form
        size="small"
        :model="listenerForm"
        :label-col="{ style: { width: '96px' } }"
        ref="listenerFormRef"
      >
        <FormItem
          label="事件类型"
          name="event"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Select v-model:value="listenerForm.event">
            <SelectOption v-for="i in Object.keys(listenerEventTypeObject)" :key="i" :value="i">{{
              listenerEventTypeObject[i]
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem
          label="监听器ID"
          name="id"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Input v-model:value="listenerForm.id" clearable />
        </FormItem>
        <FormItem
          label="监听器类型"
          name="listenerType"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Select v-model:value="listenerForm.listenerType">
            <SelectOption v-for="i in Object.keys(listenerTypeObject)" :key="i" :value="i">{{
              listenerTypeObject[i]
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem
          v-if="listenerForm.listenerType === 'classListener'"
          label="Java类"
          name="class"
          key="listener-class"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Input v-model:value="listenerForm.class" clearable />
        </FormItem>
        <FormItem
          v-if="listenerForm.listenerType === 'expressionListener'"
          label="表达式"
          name="expression"
          key="listener-expression"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Input v-model:value="listenerForm.expression" clearable />
        </FormItem>
        <FormItem
          v-if="listenerForm.listenerType === 'delegateExpressionListener'"
          label="代理表达式"
          name="delegateExpression"
          key="listener-delegate"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Input v-model:value="listenerForm.delegateExpression" clearable />
        </FormItem>
        <template v-if="listenerForm.listenerType === 'scriptListener'">
          <FormItem
            label="脚本格式"
            name="scriptFormat"
            key="listener-script-format"
            :rules="{ required: true, trigger: ['blur', 'change'], message: '请填写脚本格式' }"
          >
            <Input v-model:value="listenerForm.scriptFormat" clearable />
          </FormItem>
          <FormItem
            label="脚本类型"
            name="scriptType"
            key="listener-script-type"
            :rules="{ required: true, trigger: ['blur', 'change'], message: '请选择脚本类型' }"
          >
            <Select v-model:value="listenerForm.scriptType">
              <SelectOption value="inlineScript">内联脚本</SelectOption>
              <SelectOption value="externalScript">外部脚本</SelectOption>
            </Select>
          </FormItem>
          <FormItem
            v-if="listenerForm.scriptType === 'inlineScript'"
            label="脚本内容"
            name="value"
            key="listener-script"
            :rules="{ required: true, trigger: ['blur', 'change'], message: '请填写脚本内容' }"
          >
            <Input v-model:value="listenerForm.value" clearable />
          </FormItem>
          <FormItem
            v-if="listenerForm.scriptType === 'externalScript'"
            label="资源地址"
            name="resource"
            key="listener-resource"
            :rules="{ required: true, trigger: ['blur', 'change'], message: '请填写资源地址' }"
          >
            <Input v-model:value="listenerForm.resource" clearable />
          </FormItem>
        </template>

        <template v-if="listenerForm.event === 'timeout'">
          <FormItem label="定时器类型" name="eventDefinitionType" key="eventDefinitionType">
            <Select v-model:value="listenerForm.eventDefinitionType">
              <SelectOption value="date">日期</SelectOption>
              <SelectOption value="duration">持续时长</SelectOption>
              <SelectOption value="cycle">循环</SelectOption>
              <SelectOption value="null">无</SelectOption>
            </Select>
          </FormItem>
          <FormItem
            v-if="!!listenerForm.eventDefinitionType && listenerForm.eventDefinitionType !== 'null'"
            label="定时器"
            name="eventTimeDefinitions"
            key="eventTimeDefinitions"
            :rules="{ required: true, trigger: ['blur', 'change'], message: '请填写定时器配置' }"
          >
            <Input v-model:value="listenerForm.eventTimeDefinitions" clearable />
          </FormItem>
        </template>
      </Form>

      <p class="listener-filed__title">
        <span><Icon icon="ep:menu" />注入字段：</span>
        <Button type="primary" @click="openListenerFieldForm(null)">添加字段</Button>
      </p>
      <Table
        :dataSource="fieldsListOfListener"
        :columns="fieldsListenersColumns"
        showIndexColumn
        :showTableSetting="false"
        :pagination="false"
        :canResize="false"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'action'">
            <TableAction
              :actions="[
                {
                  label: '编辑',
                  onClick: openListenerFieldForm.bind(null, record, index),
                },
                {
                  label: '移除',
                  onClick: removeListenerField.bind(null, record, index),
                },
              ]"
            />
          </template>
        </template>
      </Table>
      <div class="element-drawer__button">
        <Button style="width: 200px" @click="listenerFormModelVisible = false">取 消</Button>
        <Button style="width: 200px" type="primary" @click="saveListenerConfig">保 存</Button>
      </div>
    </BasicDrawer>

    <!-- 注入西段 编辑/创建 部分 -->
    <BasicModal
      title="字段配置"
      v-model:visible="listenerFieldFormModelVisible"
      width="600px"
      append-to-body
      destroy-on-close
    >
      <Form
        :model="listenerFieldForm"
        size="small"
        :label-col="{ style: { width: '96px' } }"
        ref="listenerFieldFormRef"
        style="height: 136px"
      >
        <FormItem
          label="字段名称："
          name="name"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Input v-model:value="listenerFieldForm.name" clearable />
        </FormItem>
        <FormItem
          label="字段类型："
          name="fieldType"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Select v-model:value="listenerFieldForm.fieldType">
            <SelectOption v-for="i in Object.keys(fieldTypeObject)" :key="i" :value="i">{{
              fieldTypeObject[i]
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem
          v-if="listenerFieldForm.fieldType === 'string'"
          label="字段值："
          name="string"
          key="field-string"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Input v-model:value="listenerFieldForm.string" clearable />
        </FormItem>
        <FormItem
          v-if="listenerFieldForm.fieldType === 'expression'"
          label="表达式："
          name="expression"
          key="field-expression"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Input v-model:value="listenerFieldForm.expression" clearable />
        </FormItem>
      </Form>
      <template #footer>
        <Button @click="listenerFieldFormModelVisible = false">取 消</Button>
        <Button type="primary" @click="saveListenerFiled">确 定</Button>
      </template>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { Button, Form, FormItem, Input, Table, Select, SelectOption } from 'ant-design-vue';
  import { BasicModal, Icon, TableAction, BasicDrawer } from '3h1-ui';
  import { createListenerObject, updateElementExtensions } from '../../utils';
  import {
    initListenerForm,
    initListenerType,
    eventType,
    listenerType,
    fieldType,
  } from './utilSelf';
import { useMessage } from '@shy-plugins/use';
import { ref,inject,nextTick,watch} from 'vue'
  // defineOptions({ name: 'UserTaskListeners' });
  const { createConfirm } = useMessage();
  const props = defineProps({
    id: String,
    type: String,
  });
  const prefix = inject('prefix');
  const width = inject('width');
  const elementListenersList = ref<any[]>([]);
  const listenerEventTypeObject = ref(eventType);
  const listenerTypeObject = ref(listenerType);
  const listenerFormModelVisible = ref(false);
  const listenerForm = ref<any>({});
  const fieldTypeObject = ref(fieldType);
  const fieldsListOfListener = ref<any[]>([]);
  const listenerFieldFormModelVisible = ref(false); // 监听器 注入字段表单弹窗 显示状态
  const editingListenerIndex = ref(-1); // 监听器所在下标，-1 为新增
  const editingListenerFieldIndex = ref(-1); // 字段所在下标，-1 为新增
  const listenerFieldForm = ref<any>({}); // 监听器 注入字段 详情表单
  const bpmnElement = ref();
  const bpmnElementListeners = ref();
  const otherExtensionList = ref();
  const listenerFormRef = ref();
  const listenerFieldFormRef = ref();
  const bpmnInstances = () => (window as any)?.bpmnInstances;
  const elementListenersColumns = [
    {
      title: '事件类型',
      dataIndex: 'event',
      key: 'event',
      customRender: ({ record }) => {
        return listenerEventTypeObject.value[record.event];
      },
    },
    {
      title: '监听器类型',
      dataIndex: 'listenerType',
      key: 'listenerType',
      customRender: ({ record }) => {
        return listenerTypeObject.value[record.listenerType];
      },
    },
    { width: 90, title: '操作', dataIndex: 'action' },
  ];
  const fieldsListenersColumns = [
    {
      title: '字段名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '字段类型',
      dataIndex: 'fieldType',
      key: 'fieldType',
      customRender: ({ record }) => {
        return fieldTypeObject.value[record.fieldType];
      },
    },
    {
      title: '字段值/表达式',
      dataIndex: 'expression',
      key: 'expression',
      customRender: ({ record }) => {
        return record.string || record.expression;
      },
    },
    { width: 90, title: '操作', dataIndex: 'action' },
  ];
  const resetListenersList = () => {
    console.log(
      bpmnInstances().bpmnElement,
      'window.bpmnInstances.bpmnElementwindow.bpmnInstances.bpmnElementwindow.bpmnInstances.bpmnElementwindow.bpmnInstances.bpmnElementwindow.bpmnInstances.bpmnElementwindow.bpmnInstances.bpmnElement',
    );
    bpmnElement.value = bpmnInstances().bpmnElement;
    otherExtensionList.value = [];
    bpmnElementListeners.value =
      bpmnElement.value.businessObject?.extensionElements?.values.filter(
        (ex) => ex.$type === `${prefix}:TaskListener`,
      ) ?? [];
    elementListenersList.value = bpmnElementListeners.value.map((listener) =>
      initListenerType(listener),
    );
  };
  const openListenerForm = (listener, index?) => {
    if (listener) {
      listenerForm.value = initListenerForm(listener);
      editingListenerIndex.value = index;
    } else {
      listenerForm.value = {};
      editingListenerIndex.value = -1; // 标记为新增
    }
    if (listener && listener.fields) {
      fieldsListOfListener.value = listener.fields.map((field) => ({
        ...field,
        fieldType: field.string ? 'string' : 'expression',
      }));
    } else {
      fieldsListOfListener.value = [];
      listenerForm.value['fields'] = [];
    }
    // 打开侧边栏并清楚验证状态
    listenerFormModelVisible.value = true;
    nextTick(() => {
      if (listenerFormRef.value) listenerFormRef.value.clearValidate();
    });
  };
  // 移除监听器
  const removeListener = (listener, index?) => {
    console.log(listener, 'listener');
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确认移除该监听器吗？',
      onOk: () => {
        bpmnElementListeners.value.splice(index, 1);
        elementListenersList.value.splice(index, 1);
        updateElementExtensions(
          bpmnElement.value,
          otherExtensionList.value.concat(bpmnElementListeners.value),
        );
      },
    });
  };
  // 保存监听器
  const saveListenerConfig = async () => {
    let validateStatus = await listenerFormRef.value.validate();
    if (!validateStatus) return; // 验证不通过直接返回
    const listenerObject = createListenerObject(listenerForm.value, true, prefix);
    if (editingListenerIndex.value === -1) {
      bpmnElementListeners.value.push(listenerObject);
      elementListenersList.value.push(listenerForm.value);
    } else {
      bpmnElementListeners.value.splice(editingListenerIndex.value, 1, listenerObject);
      elementListenersList.value.splice(editingListenerIndex.value, 1, listenerForm.value);
    }
    // 保存其他配置
    otherExtensionList.value =
      bpmnElement.value.businessObject?.extensionElements?.values?.filter(
        (ex) => ex.$type !== `${prefix}:TaskListener`,
      ) ?? [];
    updateElementExtensions(
      bpmnElement.value,
      otherExtensionList.value.concat(bpmnElementListeners.value),
    );
    // 4. 隐藏侧边栏
    listenerFormModelVisible.value = false;
    listenerForm.value = {};
  };
  // 打开监听器字段编辑弹窗
  const openListenerFieldForm = (field, index?) => {
    listenerFieldForm.value = field ? JSON.parse(JSON.stringify(field)) : {};
    editingListenerFieldIndex.value = field ? index : -1;
    listenerFieldFormModelVisible.value = true;
    nextTick(() => {
      if (listenerFieldFormRef.value) listenerFieldFormRef.value.clearValidate();
    });
  };
  // 保存监听器注入字段
  const saveListenerFiled = async () => {
    let validateStatus = await listenerFieldFormRef.value.validate();
    if (!validateStatus) return; // 验证不通过直接返回
    if (editingListenerFieldIndex.value === -1) {
      fieldsListOfListener.value.push(listenerFieldForm.value);
      listenerForm.value.fields.push(listenerFieldForm.value);
    } else {
      fieldsListOfListener.value.splice(
        editingListenerFieldIndex.value,
        1,
        listenerFieldForm.value,
      );
      listenerForm.value.fields.splice(editingListenerFieldIndex.value, 1, listenerFieldForm.value);
    }
    listenerFieldFormModelVisible.value = false;
    nextTick(() => {
      listenerFieldForm.value = {};
    });
  };
  // 移除监听器字段
  const removeListenerField = (field, index) => {
    console.log(field, 'field');
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确认移除该字段吗？',
      onOk: () => {
        fieldsListOfListener.value.splice(index, 1);
        listenerForm.value.fields.splice(index, 1);
      },
    });
  };

  watch(
    () => props.id,
    (val) => {
      val &&
        val.length &&
        nextTick(() => {
          resetListenersList();
        });
    },
    { immediate: true },
  );
</script>
