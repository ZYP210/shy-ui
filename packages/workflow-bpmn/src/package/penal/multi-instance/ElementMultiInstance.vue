<template>
  <div class="panel-tab__content">
    <Form :label-col="{ style: { width: '90px' } }">
      <!-- <FormItem label="回路特性">
        <Select v-model:value="loopCharacteristics" @change="changeLoopCharacteristicsType">
          <SelectOption value="ParallelMultiInstance">并行多重事件</SelectOption>
          <SelectOption value="SequentialMultiInstance">时序多重事件</SelectOption>
          <SelectOption value="StandardLoop">循环事件</SelectOption>
          <SelectOption value="Null">无</SelectOption>
        </Select>
      </FormItem> -->
      <FormItem label="多实例">
        <RadioGroup v-model:value="loopInstanceForm.completionCondition" @change="updateLoopCondition">
          <Radio value="${nrOfCompletedInstances== nrOfInstances}">会签</Radio>
          <Radio value="${nrOfCompletedInstances==1}">或签</Radio>
          <Radio value="Null">无</Radio>
        </RadioGroup>
      </FormItem>
      <template
        v-if="
          loopCharacteristics === 'ParallelMultiInstance' ||
          loopCharacteristics === 'SequentialMultiInstance'
        "
      >
        <!-- <FormItem label="循环基数" name="loopCardinality">
          <Input
            v-model:value="loopInstanceForm.loopCardinality"
            clearable
            @change="updateLoopCardinality"
          />
        </FormItem> -->
        <!-- <FormItem label="集合" name="collection" v-show="false">
          <Input v-model:value="loopInstanceForm.collection" clearable @change="updateLoopBase" />
        </FormItem>
        <FormItem label="元素变量" name="elementVariable">
          <Input
            v-model:value="loopInstanceForm.elementVariable"
            clearable
            @change="updateLoopBase"
          />
        </FormItem> -->
        <!-- <FormItem label="完成条件" name="completionCondition">
          <Input
            v-model:value="loopInstanceForm.completionCondition"
            clearable
            @change="updateLoopCondition"
          />
        </FormItem> -->
        <!-- <FormItem label="异步状态" name="async">
          <Checkbox
            v-model:checked="loopInstanceForm.asyncBefore"
            @change="updateLoopAsync('asyncBefore')"
            >异步前</Checkbox
          >
          <Checkbox
            v-model:checked="loopInstanceForm.asyncAfter"
            @change="updateLoopAsync('asyncAfter')"
            >异步后</Checkbox
          >
          <Checkbox
            v-model:checked="loopInstanceForm.exclusive"
            v-if="loopInstanceForm.asyncAfter || loopInstanceForm.asyncBefore"
            @change="updateLoopAsync('exclusive')"
            >排除</Checkbox
          >
        </FormItem> -->
        <!-- <FormItem
          label="重试周期"
          name="timeCycle"
          v-if="loopInstanceForm.asyncAfter || loopInstanceForm.asyncBefore"
          key="timeCycle"
        >
          <Input
            v-model:value="loopInstanceForm.timeCycle"
            clearable
            @change="updateLoopTimeCycle"
          />
        </FormItem> -->
      </template>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { Checkbox, Form, FormItem, Input, Select, SelectOption, RadioGroup,Radio } from 'ant-design-vue';
import { ref,inject,toRaw,onBeforeUnmount,watch, onMounted} from 'vue'
  // defineOptions({ name: 'ElementMultiInstance' });

  const props = defineProps({
    businessObject: Object,
    type: String,
  });
  const prefix = inject('prefix');
  const loopCharacteristics = ref('');
  //默认配置，用来覆盖原始不存在的选项，避免报错
  const defaultLoopInstanceForm = ref({
    completionCondition: 'Null',
    loopCardinality: '',
    extensionElements: [],
    asyncAfter: false,
    asyncBefore: false,
    exclusive: false,
  });
  const loopInstanceForm = ref<any>({});
  const bpmnElement = ref(null);
  const multiLoopInstance = ref(null);
  const bpmnInstances = () => (window as any)?.bpmnInstances;

const getElementLoop = (businessObject) => {    
    if (!businessObject.loopCharacteristics) {
      loopCharacteristics.value = 'Null';
      loopInstanceForm.value = {completionCondition:'Null'};
      return;
    }
    if (businessObject.loopCharacteristics.$type === 'bpmn:StandardLoopCharacteristics') {
      loopCharacteristics.value = 'StandardLoop';
      loopInstanceForm.value = {};
      return;
    }
    if (businessObject.loopCharacteristics.isSequential) {
      loopCharacteristics.value = 'SequentialMultiInstance';
    } else {
      loopCharacteristics.value = 'ParallelMultiInstance';
    }
    // 合并配置
    loopInstanceForm.value = {
      ...defaultLoopInstanceForm.value,
      ...businessObject.loopCharacteristics,
      completionCondition: businessObject.loopCharacteristics?.completionCondition?.body ?? '',
      loopCardinality: businessObject.loopCharacteristics?.loopCardinality?.body ?? '',
    };
    // 保留当前元素 businessObject 上的 loopCharacteristics 实例
    multiLoopInstance.value = bpmnInstances().bpmnElement.businessObject.loopCharacteristics;
    // 更新表单
    if (
      businessObject.loopCharacteristics.extensionElements &&
      businessObject.loopCharacteristics.extensionElements.values &&
      businessObject.loopCharacteristics.extensionElements.values.length
    ) {
      loopInstanceForm.value['timeCycle'] =
        businessObject.loopCharacteristics.extensionElements.values[0].body;
    }
  };
  const changeLoopCharacteristicsType = (type) => {
    // this.loopInstanceForm = { ...this.defaultLoopInstanceForm }; // 切换类型取消原表单配置
    // 取消多实例配置
    if (type === 'Null') {
      bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {
        loopCharacteristics: null,
      });
      return;
    }
    // 配置循环
    if (type === 'StandardLoop') {
      const loopCharacteristicsObject = bpmnInstances().moddle.create(
        'bpmn:StandardLoopCharacteristics',
      );
      bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {
        loopCharacteristics: loopCharacteristicsObject,
      });
      multiLoopInstance.value = null;
      return;
    }
    // 时序
    if (type === 'SequentialMultiInstance') {
      multiLoopInstance.value = bpmnInstances().moddle.create(
        'bpmn:MultiInstanceLoopCharacteristics',
        { isSequential: true },
      );
    } else {
      multiLoopInstance.value = bpmnInstances().moddle.create(
        'bpmn:MultiInstanceLoopCharacteristics',
        { collection: '${coll_userList}' },
      );
    }
    bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {
      loopCharacteristics: toRaw(multiLoopInstance.value),
    });
  };
  // 循环基数
  const updateLoopCardinality = (e) => {
    const cardinality = e.target.value;
    let loopCardinality = null;
    if (cardinality && cardinality.length) {
      loopCardinality = bpmnInstances().moddle.create('bpmn:FormalExpression', {
        body: cardinality,
      });
    }
    bpmnInstances().modeling.updateModdleProperties(
      toRaw(bpmnElement.value),
      multiLoopInstance.value,
      {
        loopCardinality,
      },
    );
  };
  // 完成条件
const updateLoopCondition = (e) => {  
  const condition = e.target.value;    
    if (condition === 'Null') {
      changeLoopCharacteristicsType('Null');
    } else { 
      changeLoopCharacteristicsType('ParallelMultiInstance');
    }
    let completionCondition = null;
    if (condition && condition.length) {
      completionCondition = bpmnInstances().moddle.create('bpmn:FormalExpression', {
        body: condition,
      });
    }
    bpmnInstances().modeling.updateModdleProperties(
      toRaw(bpmnElement.value),
      multiLoopInstance.value,
      {
        completionCondition,
      },
    );
  };
  // 重试周期
  const updateLoopTimeCycle = (e) => {
    const value = e.target.value;
    const extensionElements = bpmnInstances().moddle.create('bpmn:ExtensionElements', {
      values: [
        bpmnInstances().moddle.create(`${prefix}:FailedJobRetryTimeCycle`, {
          body: value,
        }),
      ],
    });
    bpmnInstances().modeling.updateModdleProperties(
      toRaw(bpmnElement.value),
      multiLoopInstance.value,
      {
        extensionElements,
      },
    );
  };
  // 直接更新的基础信息
  const updateLoopBase = () => {
    bpmnInstances().modeling.updateModdleProperties(
      toRaw(bpmnElement.value),
      multiLoopInstance.value,
      {
        collection: loopInstanceForm.value.collection || null,
        elementVariable: loopInstanceForm.value.elementVariable || null,
      },
    );
  };
  // 各异步状态
  const updateLoopAsync = (key) => {
    const { asyncBefore, asyncAfter } = loopInstanceForm.value;
    let asyncAttr = Object.create(null);
    if (!asyncBefore && !asyncAfter) {
      // this.$set(this.loopInstanceForm, "exclusive", false);
      loopInstanceForm.value['exclusive'] = false;
      asyncAttr = {
        asyncBefore: false,
        asyncAfter: false,
        exclusive: false,
        extensionElements: null,
      };
    } else {
      asyncAttr[key] = loopInstanceForm.value[key];
    }
    bpmnInstances().modeling.updateModdleProperties(
      toRaw(bpmnElement.value),
      multiLoopInstance.value,
      asyncAttr,
    );
  };

  onBeforeUnmount(() => {
    multiLoopInstance.value = null;
    bpmnElement.value = null;
  });
  watch(
    () => props.businessObject,
    (val) => {
      bpmnElement.value = bpmnInstances().bpmnElement;
      getElementLoop(val);
    },
    { immediate: true },
  );
</script>
