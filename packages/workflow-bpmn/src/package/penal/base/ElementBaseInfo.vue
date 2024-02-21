<template>
  <div class="panel-tab__content">
    <Form :label-col="labelCol" labelAlign="right" :model="needProps" :rules="rules">
      <div v-if="needProps.type == 'bpmn:Process'">
        <!-- 如果是 Process 信息的时候，使用自定义表单 -->
        <Button
          href="https://doc.iocoder.cn/bpm/#_3-%E6%B5%81%E7%A8%8B%E5%9B%BE%E7%A4%BA%E4%BE%8B"
          type="link"
          target="_blank"
        >
          如何实现会签、或签？
        </Button>
        <FormItem label="流程标识" name="id">
          <Input
            v-model:value="needProps.id"
            placeholder="请输入流标标识"
            :disabled="needProps.id !== undefined && needProps.id.length > 0"
            @change="handleKeyUpdate"
          />
        </FormItem>
        <FormItem label="流程名称" name="name">
          <Input
            v-model:value="needProps.name"
            placeholder="请输入流程名称"
            clearable
            @change="handleNameUpdate"
          />
        </FormItem>
      </div>
      <div v-else>
        <FormItem label="ID" name="id" key="id">
          <Input v-model:value="elementBaseInfo.id" clearable @change="updateBaseInfo('id')" />
        </FormItem>
        <FormItem label="名称" name="name" key="name">
          <Input v-model:value="elementBaseInfo.name" clearable @change="updateBaseInfo('name')" />
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { Form, FormItem, Input, Button } from 'ant-design-vue';
import { ref, reactive, toRaw, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { updateElementProperties} from '../../utils'
  // defineOptions({ name: 'ElementBaseInfo' });
  const labelCol = {
    style: { width: '90px' },
  };
  const props = defineProps({
    businessObject: {
      type: Object,
      default: () => {},
    },
    model: {
      type: Object,
      default: () => {},
    },
  });
  const needProps = ref<any>({});
  const bpmnElement = ref();
  const elementBaseInfo = ref<any>({});
  // 流程表单的下拉框的数据
  // const forms = ref([])
  // 流程模型的校验
  const rules = reactive({
    id: [{ required: true, message: '流程标识不能为空', trigger: 'blur' }],
    name: [{ required: true, message: '流程名称不能为空', trigger: 'blur' }],
  });

  const bpmnInstances = () => (window as any)?.bpmnInstances;
  const resetBaseInfo = () => {
    bpmnElement.value = bpmnInstances()?.bpmnElement;
    elementBaseInfo.value = bpmnElement.value.businessObject;
    needProps.value['type'] = bpmnElement.value.businessObject.$type;
    // elementBaseInfo.value['typess'] = bpmnElement.value.businessObject.$type

    // elementBaseInfo.value = JSON.parse(JSON.stringify(bpmnElement.value.businessObject))
  };
  const handleKeyUpdate = (value) => {
    // 校验 value 的值，只有 XML NCName 通过的情况下，才进行赋值。否则，会导致流程图报错，无法绘制的问题
    if (!value) {
      return;
    }
    if (!value.match(/[a-zA-Z_][\-_.0-9a-zA-Z$]*/)) {
      return;
    }

    // 在 BPMN 的 XML 中，流程标识 key，其实对应的是 id 节点
    elementBaseInfo.value['id'] = value;
    setTimeout(() => {
      updateBaseInfo('id');
    }, 100);
  };
  const handleNameUpdate = (value) => {
    if (!value) {
      return;
    }
    elementBaseInfo.value['name'] = value;

    setTimeout(() => {
      updateBaseInfo('name');
    }, 100);
  };
  // const handleDescriptionUpdate=(value)=> {
  // TODO 芋艿：documentation 暂时无法修改，后续在看看
  // this.elementBaseInfo['documentation'] = value;
  // this.updateBaseInfo('documentation');
  // }
  const updateBaseInfo = (key) => {
    // 触发 elementBaseInfo 对应的字段
    const attrObj = Object.create(null);
    attrObj[key] = elementBaseInfo.value[key];
    // const attrObj = {
    //   id: elementBaseInfo.value[key]
    //   // di: { id: `${elementBaseInfo.value[key]}_di` }
    // }
    needProps.value = { ...elementBaseInfo.value, ...needProps.value };
    if (key === 'id') {
      bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), {
        id: elementBaseInfo.value[key],
        di: { id: `${elementBaseInfo.value[key]}_di` },
      });
    } else {
      bpmnInstances().modeling.updateProperties(toRaw(bpmnElement.value), attrObj);
    }
  };
onMounted(() => {    
    // 针对上传的 bpmn 流程图时，需要延迟 1 秒的时间，保证 key 和 name 的更新
    setTimeout(() => {
      handleKeyUpdate(props.model?.key);
      handleNameUpdate(props.model?.name);
    }, 1000);
});
  //userTask添加flowable:skipExpression属性
watch(() => props.businessObject.id, (id) => { 
  if (props.businessObject.$type === 'bpmn:UserTask') { 
    const bpmnElement = bpmnInstances()?.bpmnElement;
    console.log('userTask add skipExpression',toRaw(bpmnElement),props.businessObject.id)
    //在xml中追加属性
    nextTick(() => { 
      updateElementProperties(toRaw(bpmnElement),id)
    })
  }
})
  watch(
    () => props.businessObject,
    (val) => {
      if (val) {
        resetBaseInfo();
      }
    },

  );
    onBeforeUnmount(() => {
    bpmnElement.value = null;
  });
</script>
