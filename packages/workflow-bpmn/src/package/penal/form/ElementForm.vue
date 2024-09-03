<template>
  <div class="panel-tab__content">
    <Form :label-col="{ style: { width: '80px' } }">
      <FormItem label="表单标识">
        <Input v-model:value="formKey" clearable @change="updateElementFormKey" />
      </FormItem>
      <FormItem label="业务标识">
        <Select v-model:value="businessKey" @change="updateElementBusinessKey">
          <SelectOption v-for="i in fieldList" :key="i.id" :value="i.id">{{
            i.label
          }}</SelectOption>
          <SelectOption value="">无</SelectOption>
        </Select>
      </FormItem>
    </Form>
    <!--字段列表-->
    <div class="element-property list-property">
      <Divider><Icon icon="ep:coin" /> 表单字段</Divider>
      <Table
        :dataSource="fieldList"
        :columns="fieldColumns"
        showIndexColumn
        :showTableSetting="false"
        :pagination="false"
        :canResize="false"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'action'">
            <ShyTableAction
              :actions="[
                {
                  label: '编辑',
                  onClick: openFieldForm.bind(null, record, index),
                },
                {
                  label: '移除',
                  onClick: removeField.bind(null, record, index),
                },
              ]"
            />
          </template>
        </template>
      </Table>
    </div>
    <div class="element-drawer__button">
      <Button type="primary" title="" @click="openFieldForm(null, -1)"
        ><Icon icon="ep:plus" />添加字段</Button
      >
    </div>

    <!--字段配置侧边栏-->
    <BasicDrawer
      v-model:visible="fieldModelVisible"
      title="字段配置"
      :width="`${width}px`"
      append-to-body
      destroy-on-close
    >
      <Form :model="formFieldForm" :label-col="{ style: { width: '90px' } }">
        <FormItem label="字段ID">
          <Input v-model:value="formFieldForm.id" clearable />
        </FormItem>
        <FormItem label="类型">
          <Select
            v-model:value="formFieldForm.typeType"
            placeholder="请选择字段类型"
            clearable
            @change="changeFieldTypeType"
          >
            <SelectOption v-for="(value, key) of fieldType" :value="key" :key="key">{{
              value
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="类型名称" v-if="formFieldForm.typeType === 'custom'">
          <Input v-model:value="formFieldForm.type" clearable />
        </FormItem>
        <FormItem label="名称">
          <Input v-model:value="formFieldForm.label" clearable />
        </FormItem>
        <FormItem label="时间格式" v-if="formFieldForm.typeType === 'date'">
          <Input v-model:value="formFieldForm.datePattern" clearable />
        </FormItem>
        <FormItem label="默认值">
          <Input v-model:value="formFieldForm.defaultValue" clearable />
        </FormItem>
      </Form>

      <!-- 枚举值设置 -->
      <template v-if="formFieldForm.type === 'enum'">
        <Divider key="enum-divider" />
        <p class="listener-filed__title" key="enum-title">
          <span><Icon icon="ep:menu" />枚举值列表：</span>
          <Button type="primary" @click="openFieldOptionForm(null, -1, 'enum')">添加枚举值</Button>
        </p>
        <Table
          :dataSource="fieldEnumList"
          :columns="fieldEnumColumns"
          showIndexColumn
          :showTableSetting="false"
          :pagination="false"
          :canResize="false"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'action'">
              <ShyTableAction
                :actions="[
                  {
                    label: '编辑',
                    onClick: openFieldOptionForm.bind(null, record, index, 'enum'),
                  },
                  {
                    label: '移除',
                    onClick: removeFieldOptionItem.bind(null, record, index, 'enum'),
                  },
                ]"
              />
            </template>
          </template>
        </Table>
      </template>

      <Divider key="validation-divider" />
      <p class="listener-filed__title" key="validation-title">
        <span><Icon icon="ep:menu" />约束条件列表：</span>
        <Button type="primary" @click="openFieldOptionForm(null, -1, 'constraint')"
          >添加约束</Button
        >
      </p>
      <Table
        :dataSource="fieldConstraintsList"
        :columns="fieldConstraintsColumns"
        showIndexColumn
        :showTableSetting="false"
        :pagination="false"
        :canResize="false"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'action'">
            <ShyTableAction
              :actions="[
                {
                  label: '编辑',
                  onClick: openFieldOptionForm.bind(null, record, index, 'constraint'),
                },
                {
                  label: '移除',
                  onClick: removeFieldOptionItem.bind(null, record, index, 'constraint'),
                },
              ]"
            />
          </template>
        </template>
      </Table>
      <Divider key="property-divider" />
      <p class="listener-filed__title" key="property-title">
        <span><Icon icon="ep:menu" />字段属性列表：</span>
        <Button type="primary" @click="openFieldOptionForm(null, -1, 'property')">添加属性</Button>
      </p>
      <Table
        :dataSource="fieldPropertiesList"
        :columns="fieldPropertiesColumns"
        showIndexColumn
        :showTableSetting="false"
        :pagination="false"
        :canResize="false"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'action'">
            <ShyTableAction
              :actions="[
                {
                  label: '编辑',
                  onClick: openFieldOptionForm.bind(null, record, index, 'property'),
                },
                {
                  label: '移除',
                  onClick: removeFieldOptionItem.bind(null, record, index, 'property'),
                },
              ]"
            />
          </template>
        </template>
      </Table>
      <div class="element-drawer__button">
        <Button>取 消</Button>
        <Button type="primary" @click="saveField">保 存</Button>
      </div>
    </BasicDrawer>

    <BasicModal
      v-model:visible="fieldOptionModelVisible"
      :title="optionModelTitle"
      width="600px"
      append-to-body
      destroy-on-close
    >
      <Form :model="fieldOptionForm" :label-col="{ style: { width: '96px' } }">
        <FormItem label="编号/ID" v-if="fieldOptionType !== 'constraint'" key="option-id">
          <Input v-model:value="fieldOptionForm.id" clearable />
        </FormItem>
        <FormItem label="名称" v-if="fieldOptionType !== 'property'" key="option-name">
          <Input v-model:value="fieldOptionForm.name" clearable />
        </FormItem>
        <FormItem label="配置" v-if="fieldOptionType === 'constraint'" key="option-config">
          <Input v-model:value="fieldOptionForm.config" clearable />
        </FormItem>
        <FormItem label="值" v-if="fieldOptionType === 'property'" key="option-value">
          <Input v-model:value="fieldOptionForm.value" clearable />
        </FormItem>
      </Form>
      <template #footer>
        <Button @click="fieldOptionModelVisible = false">取 消</Button>
        <Button type="primary" @click="saveFieldOption">确 定</Button>
      </template>
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import {
    Button,
    Form,
    FormItem,
    Input,
    Table,
    Select,
    SelectOption,
    Divider,
  } from 'ant-design-vue';
import { BasicModal, Icon, ShyTableAction, BasicDrawer } from '3h1-ui';
  import {ref,inject,toRaw,watch,nextTick} from 'vue'
  // defineOptions({ name: 'ElementForm' });
  const fieldPropertiesColumns = [
    {
      title: '属性编号',
      dataIndex: 'id',
    },
    {
      title: '属性值',
      dataIndex: 'value',
    },
    { width: 90, title: '操作', dataIndex: 'action' },
  ];
  const fieldColumns = [
    {
      title: '字段名称',
      dataIndex: 'label',
    },
    {
      title: '字段类型',
      dataIndex: 'type',
      customRender: ({ record }) => {
        return fieldType.value[record.type] || record.type;
      },
    },
    {
      title: '默认值',
      dataIndex: 'defaultValue',
    },
    { width: 90, title: '操作', dataIndex: 'action' },
  ];
  const fieldEnumColumns = [
    {
      title: '枚举值编号',
      dataIndex: 'id',
    },
    {
      title: '枚举值名称',
      dataIndex: 'name',
    },
    { width: 90, title: '操作', dataIndex: 'action' },
  ];
  const fieldConstraintsColumns = [
    {
      title: '约束名称',
      dataIndex: 'name',
    },
    {
      title: '约束配置',
      dataIndex: 'config',
    },
    { width: 90, title: '操作', dataIndex: 'action' },
  ];
  const props = defineProps({
    id: String,
    type: String,
  });
  const prefix = inject('prefix');
  const width = inject('width');

  const formKey = ref('');
  const businessKey = ref('');
  const optionModelTitle = ref('');
  const fieldList = ref<any[]>([]);
  const formFieldForm = ref<any>({});
  const fieldType = ref({
    long: '长整型',
    string: '字符串',
    boolean: '布尔类',
    date: '日期类',
    enum: '枚举类',
    custom: '自定义类型',
  });
  const formFieldIndex = ref(-1); // 编辑中的字段， -1 为新增
  const formFieldOptionIndex = ref(-1); // 编辑中的字段配置项， -1 为新增
  const fieldModelVisible = ref(false);
  const fieldOptionModelVisible = ref(false);
  const fieldOptionForm = ref<any>({}); // 当前激活的字段配置项数据
  const fieldOptionType = ref(''); // 当前激活的字段配置项弹窗 类型
  const fieldEnumList = ref<any[]>([]); // 枚举值列表
  const fieldConstraintsList = ref<any[]>([]); // 约束条件列表
  const fieldPropertiesList = ref<any[]>([]); // 绑定属性列表
  const bpmnELement = ref();
  const elExtensionElements = ref();
  const formData = ref();
  const otherExtensions = ref();

  const bpmnInstances = () => (window as any)?.bpmnInstances;
  const resetFormList = () => {
    bpmnELement.value = bpmnInstances().bpmnElement;
    formKey.value = bpmnELement.value.businessObject.formKey;
    // 获取元素扩展属性 或者 创建扩展属性
    elExtensionElements.value =
      bpmnELement.value.businessObject.get('extensionElements') ||
      bpmnInstances().moddle.create('bpmn:ExtensionElements', { values: [] });
    // 获取元素表单配置 或者 创建新的表单配置
    formData.value =
      elExtensionElements.value.values.filter((ex) => ex.$type === `${prefix}:FormData`)?.[0] ||
      bpmnInstances().moddle.create(`${prefix}:FormData`, { fields: [] });

    // 业务标识 businessKey， 绑定在 formData 中
    businessKey.value = formData.value.businessKey;

    // 保留剩余扩展元素，便于后面更新该元素对应属性
    otherExtensions.value = elExtensionElements.value.values.filter(
      (ex) => ex.$type !== `${prefix}:FormData`,
    );

    // 复制原始值，填充表格
    fieldList.value = JSON.parse(JSON.stringify(formData.value.fields || []));

    // 更新元素扩展属性，避免后续报错
    updateElementExtensions();
  };
  const updateElementFormKey = () => {
    bpmnInstances().modeling.updateProperties(toRaw(bpmnELement.value), {
      formKey: formKey.value,
    });
  };
  const updateElementBusinessKey = () => {
    bpmnInstances().modeling.updateModdleProperties(toRaw(bpmnELement.value), formData.value, {
      businessKey: businessKey.value,
    });
  };
  // 根据类型调整字段type
  const changeFieldTypeType = (type) => {
    // this.$set(this.formFieldForm, "type", type === "custom" ? "" : type);
    formFieldForm.value['type'] = type === 'custom' ? '' : type;
  };

  // 打开字段详情侧边栏
  const openFieldForm = (field, index) => {
    formFieldIndex.value = index;
    if (index !== -1) {
      const FieldObject = formData.value.fields[index];
      formFieldForm.value = JSON.parse(JSON.stringify(field));
      // 设置自定义类型
      // this.$set(this.formFieldForm, "typeType", !this.fieldType[field.type] ? "custom" : field.type);
      formFieldForm.value['typeType'] = !fieldType.value[field.type] ? 'custom' : field.type;
      // 初始化枚举值列表
      field.type === 'enum' &&
        (fieldEnumList.value = JSON.parse(JSON.stringify(FieldObject?.values || [])));
      // 初始化约束条件列表
      fieldConstraintsList.value = JSON.parse(
        JSON.stringify(FieldObject?.validation?.constraints || []),
      );
      // 初始化自定义属性列表
      fieldPropertiesList.value = JSON.parse(JSON.stringify(FieldObject?.properties?.values || []));
    } else {
      formFieldForm.value = {};
      // 初始化枚举值列表
      fieldEnumList.value = [];
      // 初始化约束条件列表
      fieldConstraintsList.value = [];
      // 初始化自定义属性列表
      fieldPropertiesList.value = [];
    }
    fieldModelVisible.value = true;
  };
  // 打开字段 某个 配置项 弹窗
  const openFieldOptionForm = (option, index, type) => {
    fieldOptionModelVisible.value = true;
    fieldOptionType.value = type;
    formFieldOptionIndex.value = index;
    if (type === 'property') {
      fieldOptionForm.value = option ? JSON.parse(JSON.stringify(option)) : {};
      return (optionModelTitle.value = '属性配置');
    }
    if (type === 'enum') {
      fieldOptionForm.value = option ? JSON.parse(JSON.stringify(option)) : {};
      return (optionModelTitle.value = '枚举值配置');
    }
    fieldOptionForm.value = option ? JSON.parse(JSON.stringify(option)) : {};
    return (optionModelTitle.value = '约束条件配置');
  };

  // 保存字段 某个 配置项
  const saveFieldOption = () => {
    if (formFieldOptionIndex.value === -1) {
      if (fieldOptionType.value === 'property') {
        fieldPropertiesList.value.push(fieldOptionForm.value);
      }
      if (fieldOptionType.value === 'constraint') {
        fieldConstraintsList.value.push(fieldOptionForm.value);
      }
      if (fieldOptionType.value === 'enum') {
        fieldEnumList.value.push(fieldOptionForm.value);
      }
    } else {
      fieldOptionType.value === 'property' &&
        fieldPropertiesList.value.splice(formFieldOptionIndex.value, 1, fieldOptionForm.value);
      fieldOptionType.value === 'constraint' &&
        fieldConstraintsList.value.splice(formFieldOptionIndex.value, 1, fieldOptionForm.value);
      fieldOptionType.value === 'enum' &&
        fieldEnumList.value.splice(formFieldOptionIndex.value, 1, fieldOptionForm.value);
    }
    fieldOptionModelVisible.value = false;
    fieldOptionForm.value = {};
  };
  // 保存字段配置
  const saveField = () => {
    const { id, type, label, defaultValue, datePattern } = formFieldForm.value;
    const Field = bpmnInstances().moddle.create(`${prefix}:FormField`, { id, type, label });
    defaultValue && (Field.defaultValue = defaultValue);
    datePattern && (Field.datePattern = datePattern);
    // 构建属性
    if (fieldPropertiesList.value && fieldPropertiesList.value.length) {
      const fieldPropertyList = fieldPropertiesList.value.map((fp) => {
        return bpmnInstances().moddle.create(`${prefix}:Property`, {
          id: fp.id,
          value: fp.value,
        });
      });
      Field.properties = bpmnInstances().moddle.create(`${prefix}:Properties`, {
        values: fieldPropertyList,
      });
    }
    // 构建校验规则
    if (fieldConstraintsList.value && fieldConstraintsList.value.length) {
      const fieldConstraintList = fieldConstraintsList.value.map((fc) => {
        return bpmnInstances().moddle.create(`${prefix}:Constraint`, {
          name: fc.name,
          config: fc.config,
        });
      });
      Field.validation = bpmnInstances().moddle.create(`${prefix}:Validation`, {
        constraints: fieldConstraintList,
      });
    }
    // 构建枚举值
    if (fieldEnumList.value && fieldEnumList.value.length) {
      Field.values = fieldEnumList.value.map((fe) => {
        return bpmnInstances().moddle.create(`${prefix}:Value`, { name: fe.name, id: fe.id });
      });
    }
    // 更新数组 与 表单配置实例
    if (formFieldIndex.value === -1) {
      fieldList.value.push(formFieldForm.value);
      formData.value.fields.push(Field);
    } else {
      fieldList.value.splice(formFieldIndex.value, 1, formFieldForm.value);
      formData.value.fields.splice(formFieldIndex.value, 1, Field);
    }
    updateElementExtensions();
    fieldModelVisible.value = false;
  };

  // 移除某个 字段的 配置项
  const removeFieldOptionItem = (option, index, type) => {
    console.log(option, 'option');
    if (type === 'property') {
      fieldPropertiesList.value.splice(index, 1);
      return;
    }
    if (type === 'enum') {
      fieldEnumList.value.splice(index, 1);
      return;
    }
    fieldConstraintsList.value.splice(index, 1);
  };
  // 移除 字段
  const removeField = (field, index) => {
    console.log(field, 'field');
    fieldList.value.splice(index, 1);
    formData.value.fields.splice(index, 1);
    updateElementExtensions();
  };

  const updateElementExtensions = () => {
    // 更新回扩展元素
    const newElExtensionElements = bpmnInstances().moddle.create(`bpmn:ExtensionElements`, {
      values: otherExtensions.value.concat(formData.value),
    });
    // 更新到元素上
    bpmnInstances().modeling.updateProperties(toRaw(bpmnELement.value), {
      extensionElements: newElExtensionElements,
    });
  };

  watch(
    () => props.id,
    (val) => {
      val &&
        val.length &&
        nextTick(() => {
          resetFormList();
        });
    },
    { immediate: true },
  );
</script>
