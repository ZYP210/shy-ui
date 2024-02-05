<template>
  <div class="panel-tab__content">
    <Table
      :dataSource="elementPropertyList"
      :columns="elementPropertyColumns"
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
                onClick: openAttributesForm.bind(null, record, index),
              },
              {
                label: '移除',
                onClick: removeAttributes.bind(null, record, index),
              },
            ]"
          />
        </template>
      </template>
    </Table>
    <div class="element-drawer__button">
      <Button type="primary" @click="openAttributesForm(null, -1)"
        ><Icon icon="ep:plus" />添加属性</Button
      >
    </div>

    <BasicModal
      v-model:visible="propertyFormModelVisible"
      title="属性配置"
      width="600px"
      append-to-body
      destroy-on-close
    >
      <Form :model="propertyForm" label-width="80px" ref="attributeFormRef">
        <FormItem label="属性名：" name="name">
          <Input v-model:value="propertyForm.name" clearable />
        </FormItem>
        <FormItem label="属性值：" name="value">
          <Input v-model:value="propertyForm.value" clearable />
        </FormItem>
      </Form>
      <template #footer>
        <Button @click="propertyFormModelVisible = false">取 消</Button>
        <Button type="primary" @click="saveAttribute">确 定</Button>
      </template>
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Form, FormItem, Input, Table } from 'ant-design-vue';
  import { BasicModal, TableAction } from '3h1-ui';
import { useMessage } from '@shy-plugins/use';
import { inject,ref,nextTick,toRaw,watch} from 'vue'
  // defineOptions({ name: 'ElementProperties' });
  const { createConfirm } = useMessage();
  const props = defineProps({
    id: String,
    type: String,
  });
  const prefix = inject('prefix');
  // const width = inject('width')
  const elementPropertyColumns = [
    {
      title: '属性名',
      dataIndex: 'name',
    },
    {
      title: '属性值',
      dataIndex: 'value',
    },
    { width: 80, title: '操作', dataIndex: 'action' },
  ];
  const elementPropertyList = ref<any[]>([]);
  const propertyForm = ref<any>({});
  const editingPropertyIndex = ref(-1);
  const propertyFormModelVisible = ref(false);
  const bpmnElement = ref();
  const otherExtensionList = ref();
  const bpmnElementProperties = ref();
  const bpmnElementPropertyList = ref();
  const attributeFormRef = ref();
  const bpmnInstances = () => (window as any)?.bpmnInstances;

  const resetAttributesList = () => {
    bpmnElement.value = bpmnInstances().bpmnElement;
    otherExtensionList.value = []; // 其他扩展配置
    bpmnElementProperties.value =
      // bpmnElement.value.businessObject?.extensionElements?.filter((ex) => {
      bpmnElement.value.businessObject?.extensionElements?.values.filter((ex) => {
        if (ex.$type !== `${prefix}:Properties`) {
          otherExtensionList.value.push(ex);
        }
        return ex.$type === `${prefix}:Properties`;
      }) ?? [];

    // 保存所有的 扩展属性字段
    bpmnElementPropertyList.value = bpmnElementProperties.value.reduce(
      (pre, current) => pre.concat(current.values),
      [],
    );
    // 复制 显示
    elementPropertyList.value = JSON.parse(JSON.stringify(bpmnElementPropertyList.value ?? []));
  };
  const openAttributesForm = (attr, index) => {
    editingPropertyIndex.value = index;
    propertyForm.value = index === -1 ? {} : JSON.parse(JSON.stringify(attr));
    propertyFormModelVisible.value = true;
    nextTick(() => {
      if (attributeFormRef.value) attributeFormRef.value.clearValidate();
    });
  };
  const removeAttributes = (attr, index) => {
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确认移除该属性吗？',
      onOk: () => {
        elementPropertyList.value.splice(index, 1);
        bpmnElementPropertyList.value.splice(index, 1);
        // 新建一个属性字段的保存列表
        const propertiesObject = bpmnInstances().moddle.create(`${prefix}:Properties`, {
          values: bpmnElementPropertyList.value,
        });
        updateElementExtensions(propertiesObject);
        resetAttributesList();
      },
    });
  };
  const saveAttribute = () => {
    const { name, value } = propertyForm.value;
    if (editingPropertyIndex.value !== -1) {
      bpmnInstances().modeling.updateModdleProperties(
        toRaw(bpmnElement.value),
        toRaw(bpmnElementPropertyList.value)[toRaw(editingPropertyIndex.value)],
        {
          name,
          value,
        },
      );
    } else {
      // 新建属性字段
      const newPropertyObject = bpmnInstances().moddle.create(`${prefix}:Property`, {
        name,
        value,
      });
      // 新建一个属性字段的保存列表
      const propertiesObject = bpmnInstances().moddle.create(`${prefix}:Properties`, {
        values: bpmnElementPropertyList.value.concat([newPropertyObject]),
      });
      updateElementExtensions(propertiesObject);
    }
    propertyFormModelVisible.value = false;
    resetAttributesList();
  };
  const updateElementExtensions = (properties) => {
    const extensions = bpmnInstances().moddle.create('bpmn:ExtensionElements', {
      values: otherExtensionList.value.concat([properties]),
    });
    bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {
      extensionElements: extensions,
    });
  };

  watch(
    () => props.id,
    (val) => {
      if (val) {
        val && val.length && resetAttributesList();
      }
    },
    { immediate: true },
  );
</script>
