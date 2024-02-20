<template>
  <div class="panel-tab__content">
    <Table
      :dataSource="elementListenersList"
      :columns="listenerColumns"
      showIndexColumn
      :showTableSetting="false"
      :pagination="false"
      :canResize="false"
      :customRow="customRow"
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
                onClick: removeListener.bind(null, index),
              },
            ]"
          />
        </template>
      </template>
    </Table>

    <div class="element-drawer__button">
      <Button type="primary" @click="openListenerForm(null)">
        <Icon icon="ep:plus" />
        添加监听器</Button
      >
    </div>

    <!-- 监听器 编辑/创建 部分 -->
    <BasicDrawer
      v-model:visible="listenerFormModelVisible"
      title="执行监听器"
      :width="`${width}px`"
      append-to-body
      destroy-on-close
    >
      <Form :model="listenerForm" :label-col="{ style: { width: '100px' } }" ref="listenerFormRef">
        <FormItem
          label="事件类型"
          name="event"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Select v-model:value="listenerForm.event">
            <SelectOption label="start" value="start" />
            <SelectOption label="end" value="end" />
          </Select>
        </FormItem>
        <FormItem
          label="监听器类型"
          name="listenerType"
          :rules="{ required: true, trigger: ['blur', 'change'] }"
        >
          <Select v-model:value="listenerForm.listenerType" showSearch>
            <SelectOption
              v-for="i in Object.keys(listenerTypeObject)"
              :key="i"
              :label="listenerTypeObject[i]"
              :value="i"
              >{{ listenerTypeObject[i] }}</SelectOption
            >
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
      </Form>
      <p class="listener-filed__title">
        <span class="flex"><Icon icon="ep:menu" />注入字段：</span>
        <Button type="primary" @click="openListenerFieldForm(null)" style="width: 80px"
          >添加字段</Button
        >
      </p>
      <Table
        :dataSource="fieldsListOfListener"
        :columns="fieldListColumns"
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
                  onClick: removeListenerField.bind(null, index),
                },
              ]"
            />
          </template>
        </template>
      </Table>
      <div class="element-drawer__button">
        <Button @click="listenerFormModelVisible = false" style="width: 200px">取 消</Button>
        <Button type="primary" @click="saveListenerConfig" style="width: 200px">保 存</Button>
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
        :label-col="{ style: { width: '90px' } }"
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
  import { Button, Form, FormItem, Select, SelectOption, Input, Table } from 'ant-design-vue';
  import { BasicDrawer, BasicModal, TableAction } from '3h1-ui';
  import { createListenerObject, updateElementExtensions } from '../../utils';
  import { initListenerType, initListenerForm, listenerType, fieldType } from './utilSelf';
  import { Icon } from '3h1-ui';
import { useMessage } from '@shy-plugins/use';
import { ref,inject,nextTick,watch} from 'vue'
  const { createConfirm } = useMessage();
  // defineOptions({ name: 'ElementListeners' });
const sourceObj = ref({})
  const listenerObject=ref({})
    const targetObj = ref({})
    let sourceIndex
    let targetIndex
const customRow = (record, index) => {
      
      return {
        style: {
          cursor: 'pointer'
        },
        // 鼠标移入
        onMouseenter: event => {
          // 兼容IE
          const ev = event || window.event
          ev.target.draggable = true
        },
        // 开始拖拽
        onDragstart: event => {
          // 兼容IE
          const ev = event || window.event
          ev.stopPropagation()
          // 得到源目标数据
           listenerObject.value= createListenerObject(record, false, prefix);
          sourceObj.value = record
          sourceIndex = index
        },
        // 拖动元素经过的元素
        onDragover: event => {
          // 兼容 IE
          const ev = event || window.event
          // 阻止默认行为
          ev.preventDefault()
          ev.dataTransfer.dropEffect = 'move'   // 可以去掉拖动时那个＋号
          targetIndex = index
        },
        // 鼠标松开
        onDrop: event => {
          // 兼容IE
          const ev = event || window.event
          // 阻止冒泡
          ev.stopPropagation()
          // 得到目标数据
          targetObj.value = record
         // 将源数据插入目标数据前面
          targetIndex = index
          if (targetIndex === sourceIndex) return
          elementListenersList.value.splice(sourceIndex, 1)
          elementListenersList.value.splice(targetIndex, 0, sourceObj.value)
          bpmnElementListeners.value.splice(sourceIndex, 1)
          bpmnElementListeners.value.splice(targetIndex, 0, listenerObject.value)
          updateElementExtensions(
            bpmnElement.value,
            otherExtensionList.value.concat(bpmnElementListeners.value),
        );
        }
      }
    }
  const props = defineProps({
    id: String,
    type: String,
  });
  const prefix = inject('prefix');
  const width = inject('width');
  const elementListenersList = ref<any[]>([]); // 监听器列表
  const listenerForm = ref<any>({}); // 监听器详情表单
  const listenerFormModelVisible = ref(false); // 监听器 编辑 侧边栏显示状态
  const fieldsListOfListener = ref<any[]>([]);
  const listenerFieldForm = ref<any>({}); // 监听器 注入字段 详情表单
  const listenerFieldFormModelVisible = ref(false); // 监听器 注入字段表单弹窗 显示状态
  const editingListenerIndex = ref(-1); // 监听器所在下标，-1 为新增
  const editingListenerFieldIndex = ref(-1); // 字段所在下标，-1 为新增
  const listenerTypeObject = ref(listenerType);
  const fieldTypeObject = ref(fieldType);
  const bpmnElement = ref();
  const otherExtensionList = ref();
  const bpmnElementListeners = ref();
  const listenerFormRef = ref();
  const listenerFieldFormRef = ref();
  const bpmnInstances = () => (window as any)?.bpmnInstances;
  const listenerColumns = [
    {
      title: '事件类型',
      dataIndex: 'event',
    },
    {
      title: '监听器类型',
      dataIndex: 'listenerType',
      customRender: ({ record }) => {
        return listenerTypeObject.value[record.listenerType];
      },
    },
    { width: 80, title: '操作', dataIndex: 'action' },
  ];
  const fieldListColumns = [
    {
      title: '字段名称',
      dataIndex: 'name',
    },
    {
      title: '字段类型',
      dataIndex: 'fieldType',
      customRender: ({ record }) => {
        return fieldTypeObject.value[record.fieldType];
      },
    },
    {
      title: '字段值/表达式',
      dataIndex: 'expression',
      customRender: ({ record }) => {
        return record.string || record.expression;
      },
    },
    { width: 90, title: '操作', dataIndex: 'action' },
  ];
  const resetListenersList = () => {
    bpmnElement.value = bpmnInstances().bpmnElement;
    otherExtensionList.value = [];
    bpmnElementListeners.value =
      bpmnElement.value.businessObject?.extensionElements?.values?.filter(
        (ex) => ex.$type === `${prefix}:ExecutionListener`,
      ) ?? [];
    elementListenersList.value = bpmnElementListeners.value.map((listener) =>
      initListenerType(listener),
    );
  };
  // 打开 监听器详情 侧边栏
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
      if (listenerFormRef.value) {
        listenerFormRef.value.clearValidate();
      }
    });
  };
  // 打开监听器字段编辑弹窗
  const openListenerFieldForm = (field, index?) => {
    listenerFieldForm.value = field ? JSON.parse(JSON.stringify(field)) : {};
    editingListenerFieldIndex.value = field ? index : -1;
    listenerFieldFormModelVisible.value = true;
    nextTick(() => {
      if (listenerFieldFormRef.value) {
        listenerFieldFormRef.value.clearValidate();
      }
    });
  };
  // 保存监听器注入字段
  const saveListenerFiled = async () => {
    let validateStatus = await listenerFieldFormRef.value.validate();

    if (!validateStatus) return; // 验证不通过直接返回
    if (editingListenerFieldIndex.value === -1) {
      fieldsListOfListener.value.push(validateStatus);
      listenerForm.value.fields.push(validateStatus);
    } else {
      fieldsListOfListener.value.splice(editingListenerFieldIndex.value, 1, validateStatus);
      listenerForm.value.fields.splice(editingListenerFieldIndex.value, 1, validateStatus);
    }
    listenerFieldFormRef.value.resetFields();
    listenerFieldFormModelVisible.value = false;
  };
  // 移除监听器字段
  const removeListenerField = (index) => {
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
  // 移除监听器
  const removeListener = (index) => {
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
  // 保存监听器配置
  const saveListenerConfig = async () => {
    let validateStatus = await listenerFormRef.value.validate();
    if (!validateStatus) return; // 验证不通过直接返回
    const listenerObject = createListenerObject(listenerForm.value, false, prefix);
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
        (ex) => ex.$type !== `${prefix}:ExecutionListener`,
      ) ?? [];
    updateElementExtensions(
      bpmnElement.value,
      otherExtensionList.value.concat(bpmnElementListeners.value),
    );
    // 4. 隐藏侧边栏
    listenerFormModelVisible.value = false;
    listenerForm.value = {};
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
