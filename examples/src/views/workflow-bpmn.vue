<template>
  <div class="box-card">
    <MyProcessViewer
      key="designer"
      :activityData="activityList"
      :prefix="bpmnControlForm.prefix"
      :processInstanceData="processInstance"
      :taskData="tasks"
      :value="bpmnXml"
      v-bind="bpmnControlForm"
      :bpmProcessInstanceResult="bpmProcessInstanceResult"
    />
  </div>
</template>

<script setup lang="ts">
import { MyProcessViewer } from '@shy-plugins/workflow-bpmn';
import { ref } from 'vue';
const bpmProcessInstanceResult = [
    {
      value: null,
      label: '通过',
      colorType: 'success',
      cssClass: '',
    },
    {
        "value": 1,
        "label": "处理中",
        "colorType": "primary",
        "cssClass": ""
    },
    {
        "value": 2,
        "label": "通过",
        "colorType": "success",
        "cssClass": ""
    },
    {
        "value": 3,
        "label": "不通过",
        "colorType": "danger",
        "cssClass": ""
    },
    {
        "value": 4,
        "label": "已取消",
        "colorType": "info",
        "cssClass": ""
    },
    {
        "value": 5,
        "label": "驳回",
        "colorType": "danger",
        "cssClass": ""
    },
    {
        "value": 6,
        "label": "委派",
        "colorType": "info",
        "cssClass": ""
    },
    {
        "value": 7,
        "label": "待后加签任务完成",
        "colorType": "info",
        "cssClass": ""
    },
    {
        "value": 8,
        "label": "待前加签任务完成",
        "colorType": "info",
        "cssClass": ""
    },
    {
        "value": 9,
        "label": "待前置任务完成",
        "colorType": "info",
        "cssClass": ""
    }
  ]
  const bpmnXml=`<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://flowable.org/bpmn" id="diagram_Process_1708236724801">
  <process id="skip_test123" name="免审流程123" isExecutable="true">
    <startEvent id="Event_14016ux"></startEvent>
    <userTask id="Activity_1nkv739" name="abc" flowable:skipExpression="\${true == Activity_1nkv739_skip}"></userTask>
    <sequenceFlow id="Flow_0fyrtrd" sourceRef="Event_14016ux" targetRef="Activity_1nkv739"></sequenceFlow>
    <userTask id="Activity_0m8x9be" name="123" flowable:skipExpression="\${true == Activity_0m8x9be_skip}"></userTask>
    <sequenceFlow id="Flow_140531a" sourceRef="Activity_1nkv739" targetRef="Activity_0m8x9be"></sequenceFlow>
    <userTask id="Activity_0hynar5" name="hah" flowable:skipExpression="\${true == Activity_0hynar5_skip}"></userTask>
    <sequenceFlow id="Flow_003dmj6" sourceRef="Activity_0m8x9be" targetRef="Activity_0hynar5"></sequenceFlow>
    <endEvent id="Event_0pbmk5n"></endEvent>
    <sequenceFlow id="Flow_0u18zdq" sourceRef="Activity_0hynar5" targetRef="Event_0pbmk5n"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_skip_test123">
    <bpmndi:BPMNPlane bpmnElement="skip_test123" id="BPMNPlane_skip_test123">
      <bpmndi:BPMNShape bpmnElement="Event_14016ux" id="BPMNShape_Event_14016ux">
        <omgdc:Bounds height="36.0" width="36.0" x="202.0" y="262.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="Activity_1nkv739" id="BPMNShape_Activity_1nkv739">
        <omgdc:Bounds height="80.0" width="100.0" x="290.0" y="240.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="Activity_0m8x9be" id="BPMNShape_Activity_0m8x9be">
        <omgdc:Bounds height="80.0" width="100.0" x="450.0" y="240.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="Activity_0hynar5" id="BPMNShape_Activity_0hynar5">
        <omgdc:Bounds height="80.0" width="100.0" x="610.0" y="240.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="Event_0pbmk5n" id="BPMNShape_Event_0pbmk5n">
        <omgdc:Bounds height="36.0" width="36.0" x="772.0" y="262.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="Flow_0u18zdq" id="BPMNEdge_Flow_0u18zdq">
        <omgdi:waypoint x="710.0" y="280.0"></omgdi:waypoint>
        <omgdi:waypoint x="772.0" y="280.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="Flow_003dmj6" id="BPMNEdge_Flow_003dmj6">
        <omgdi:waypoint x="550.0" y="280.0"></omgdi:waypoint>
        <omgdi:waypoint x="610.0" y="280.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="Flow_140531a" id="BPMNEdge_Flow_140531a">
        <omgdi:waypoint x="390.0" y="280.0"></omgdi:waypoint>
        <omgdi:waypoint x="450.0" y="280.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="Flow_0fyrtrd" id="BPMNEdge_Flow_0fyrtrd">
        <omgdi:waypoint x="238.0" y="280.0"></omgdi:waypoint>
        <omgdi:waypoint x="290.0" y="280.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`
  const tasks=[
    {
        "id": "e4fac6ea-cefa-11ee-96f6-aa643deda0c3",
        "name": "hah",
        "claimTime": null,
        "createTime": 1708328747000,
        "suspensionState": null,
        "processInstance": {
            "id": "95ffed3f-cef9-11ee-8387-b0dcef2e0f58",
            "name": "免审流程123",
            "startUserId": 1,
            "startUserNickname": "admin",
            "processDefinitionId": "skip_test123:8:c7292376-cef7-11ee-96f6-aa643deda0c3"
        },
        "endTime": 1708478146000,
        "durationInMillis": 149398683,
        "result": 2,
        "reason": "wqw",
        "definitionKey": "Activity_0hynar5",
        "assigneeUser": {
            "id": 1,
            "nickname": "admin",
            "deptId": null,
            "deptName": "研发部"
        },
        "parentTaskId": null,
        "children": null
    },
    {
        "id": "a4882b85-cef9-11ee-96f6-aa643deda0c3",
        "name": "123",
        "claimTime": null,
        "createTime": 1708328210000,
        "suspensionState": null,
        "processInstance": {
            "id": "95ffed3f-cef9-11ee-8387-b0dcef2e0f58",
            "name": "免审流程123",
            "startUserId": 1,
            "startUserNickname": "admin",
            "processDefinitionId": "skip_test123:8:c7292376-cef7-11ee-96f6-aa643deda0c3"
        },
        "endTime": 1708328747000,
        "durationInMillis": 537617,
        "result": 2,
        "reason": "1",
        "definitionKey": "Activity_0m8x9be",
        "assigneeUser": {
            "id": 1,
            "nickname": "admin",
            "deptId": null,
            "deptName": "研发部"
        },
        "parentTaskId": null,
        "children": null
    },
    {
        "id": "a1dc4560-cef9-11ee-96f6-aa643deda0c3",
        "name": "abc",
        "claimTime": null,
        "createTime": 1708328205000,
        "suspensionState": null,
        "processInstance": {
            "id": "95ffed3f-cef9-11ee-8387-b0dcef2e0f58",
            "name": "免审流程123",
            "startUserId": 1,
            "startUserNickname": "admin",
            "processDefinitionId": "skip_test123:8:c7292376-cef7-11ee-96f6-aa643deda0c3"
        },
        "endTime": 1708328210000,
        "durationInMillis": 4478,
        "result": 2,
        "reason": "1",
        "definitionKey": "Activity_1nkv739",
        "assigneeUser": {
            "id": 1,
            "nickname": "admin",
            "deptId": null,
            "deptName": "研发部"
        },
        "parentTaskId": null,
        "children": null
    },
    {
        "id": "9c4fd48a-cef9-11ee-96f6-aa643deda0c3",
        "name": "hah",
        "claimTime": null,
        "createTime": 1708328196000,
        "suspensionState": null,
        "processInstance": {
            "id": "95ffed3f-cef9-11ee-8387-b0dcef2e0f58",
            "name": "免审流程123",
            "startUserId": 1,
            "startUserNickname": "admin",
            "processDefinitionId": "skip_test123:8:c7292376-cef7-11ee-96f6-aa643deda0c3"
        },
        "endTime": 1708328205000,
        "durationInMillis": 9341,
        "result": 5,
        "reason": "1",
        "definitionKey": "Activity_0hynar5",
        "assigneeUser": {
            "id": 1,
            "nickname": "admin",
            "deptId": null,
            "deptName": "研发部"
        },
        "parentTaskId": null,
        "children": null
    },
    {
        "id": "9601c20c-cef9-11ee-8387-b0dcef2e0f58",
        "name": "123",
        "claimTime": null,
        "createTime": 1708328185000,
        "suspensionState": null,
        "processInstance": {
            "id": "95ffed3f-cef9-11ee-8387-b0dcef2e0f58",
            "name": "免审流程123",
            "startUserId": 1,
            "startUserNickname": "admin",
            "processDefinitionId": "skip_test123:8:c7292376-cef7-11ee-96f6-aa643deda0c3"
        },
        "endTime": 1708328196000,
        "durationInMillis": 10513,
        "result": 2,
        "reason": "1",
        "definitionKey": "Activity_0m8x9be",
        "assigneeUser": {
            "id": 1,
            "nickname": "admin",
            "deptId": null,
            "deptName": "研发部"
        },
        "parentTaskId": null,
        "children": null
    },
    {
        "id": "9601c209-cef9-11ee-8387-b0dcef2e0f58",
        "name": "abc",
        "claimTime": null,
        "createTime": 1708328185393,
        "suspensionState": null,
        "processInstance": {
            "id": "95ffed3f-cef9-11ee-8387-b0dcef2e0f58",
            "name": "免审流程123",
            "startUserId": 1,
            "startUserNickname": "admin",
            "processDefinitionId": "skip_test123:8:c7292376-cef7-11ee-96f6-aa643deda0c3"
        },
        "endTime": 1708328185394,
        "durationInMillis": 1,
        "result": null,
        "reason": null,
        "definitionKey": "Activity_1nkv739",
        "assigneeUser": null,
        "parentTaskId": null,
        "children": null
    }
]
  const processInstance={
    "id": "2b781757-bf55-11ee-a1f3-b0dcef2e0f58",
    "name": "啊啊啊啊啊1",
    "category": "2",
    "status": 1,
    "result": 1,
    "createTime": 1706608302000,
    "endTime": null,
    "formVariables": {
        "baoxiaojine": "123123",
        "_FLOWABLE_SKIP_EXPRESSION_ENABLED": true
    },
    "businessKey": null,
    "startUser": {
        "id": 1,
        "nickname": "admin",
        "deptId": null,
        "deptName": "研发部"
    },
    "processDefinition": {
        "id": "zh_ceshi1:1:680dd77d-bf3a-11ee-b543-b0dcef2e0f58",
        "formType": 10,
        "formId": 8,
        "formConf": "{}",
        "formFields": [
            "{\"component\":\"Input\",\"label\":\"报销金额\",\"icon\":\"bi:input-cursor-text\",\"field\":\"baoxiaojine\",\"colProps\":{\"span\":24},\"componentProps\":{\"type\":\"text\"},\"key\":\"_input_1\",\"itemProps\":{\"labelCol\":{},\"wrapperCol\":{}}}",
            "{\"component\":\"DatePicker\",\"label\":\"日期选择\",\"icon\":\"healthicons:i-schedule-school-date-time-outline\",\"field\":\"_date_picker_2\",\"colProps\":{\"span\":24},\"componentProps\":{},\"key\":\"_date_picker_2\",\"itemProps\":{\"labelCol\":{},\"wrapperCol\":{}}}"
        ],
        "formCustomCreatePath": null,
        "formCustomViewPath": null,
        "bpmnXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:flowable=\"http://flowable.org/bpmn\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" typeLanguage=\"http://www.w3.org/2001/XMLSchema\" expressionLanguage=\"http://www.w3.org/1999/XPath\" targetNamespace=\"http://www.flowable.org/test\">\n  <process id=\"zh_ceshi1\" name=\"啊啊啊啊啊1\" isExecutable=\"true\">\n    <startEvent id=\"dingStartEvent\" name=\"流程启动\"></startEvent>\n    <userTask id=\"userTask_11a431201e7b4d4c8371e6ed2e3c454e\" name=\"发起人\" flowable:skipExpression=\"${true}\"></userTask>\n    <sequenceFlow id=\"sequenceFlow_1d9b3b95f9994d09b468635521aef481\" sourceRef=\"dingStartEvent\" targetRef=\"userTask_11a431201e7b4d4c8371e6ed2e3c454e\"></sequenceFlow>\n    <userTask id=\"userTask_eb36bea1dd3a49caaf7cdfec93968297\" name=\"审核人\"></userTask>\n    <sequenceFlow id=\"sequenceFlow_3fa62fa43d3248dfa968b23c9e434cd0\" sourceRef=\"userTask_11a431201e7b4d4c8371e6ed2e3c454e\" targetRef=\"userTask_eb36bea1dd3a49caaf7cdfec93968297\"></sequenceFlow>\n    <endEvent id=\"dingEndEvent\" name=\"流程结束\"></endEvent>\n    <sequenceFlow id=\"sequenceFlow_3e99a9c6faa84706858322e68641f4f2\" sourceRef=\"userTask_eb36bea1dd3a49caaf7cdfec93968297\" targetRef=\"dingEndEvent\"></sequenceFlow>\n  </process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_zh_ceshi1\">\n    <bpmndi:BPMNPlane bpmnElement=\"zh_ceshi1\" id=\"BPMNPlane_zh_ceshi1\">\n      <bpmndi:BPMNShape bpmnElement=\"dingEndEvent\" id=\"BPMNShape_dingEndEvent\">\n        <omgdc:Bounds height=\"30.0\" width=\"30.0\" x=\"380.0\" y=\"15.0\"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement=\"userTask_11a431201e7b4d4c8371e6ed2e3c454e\" id=\"BPMNShape_userTask_11a431201e7b4d4c8371e6ed2e3c454e\">\n        <omgdc:Bounds height=\"60.0\" width=\"100.0\" x=\"80.0\" y=\"0.0\"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement=\"userTask_eb36bea1dd3a49caaf7cdfec93968297\" id=\"BPMNShape_userTask_eb36bea1dd3a49caaf7cdfec93968297\">\n        <omgdc:Bounds height=\"60.0\" width=\"100.0\" x=\"230.0\" y=\"0.0\"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement=\"dingStartEvent\" id=\"BPMNShape_dingStartEvent\">\n        <omgdc:Bounds height=\"30.0\" width=\"30.0\" x=\"0.0\" y=\"15.0\"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge bpmnElement=\"sequenceFlow_3fa62fa43d3248dfa968b23c9e434cd0\" id=\"BPMNEdge_sequenceFlow_3fa62fa43d3248dfa968b23c9e434cd0\">\n        <omgdi:waypoint x=\"180.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"192.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"192.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"230.0\" y=\"30.0\"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement=\"sequenceFlow_3e99a9c6faa84706858322e68641f4f2\" id=\"BPMNEdge_sequenceFlow_3e99a9c6faa84706858322e68641f4f2\">\n        <omgdi:waypoint x=\"330.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"342.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"342.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"380.0\" y=\"30.0\"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement=\"sequenceFlow_1d9b3b95f9994d09b468635521aef481\" id=\"BPMNEdge_sequenceFlow_1d9b3b95f9994d09b468635521aef481\">\n        <omgdi:waypoint x=\"30.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"42.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"42.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"80.0\" y=\"30.0\"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>"
    }
}
  const bpmnControlForm = ref({
    prefix: 'flowable',
  });
  const activityList = [
    {
        "key": "Event_14016ux",
        "type": "startEvent",
        "startTime": 1708328185393,
        "endTime": 1708328185393,
        "taskId": null
    },
    {
        "key": "Flow_0fyrtrd",
        "type": "sequenceFlow",
        "startTime": 1708328185393,
        "endTime": 1708328185393,
        "taskId": null
    },
    {
        "key": "Activity_1nkv739",
        "type": "userTask",
        "startTime": 1708328185393,
        "endTime": 1708328185394,
        "taskId": "9601c209-cef9-11ee-8387-b0dcef2e0f58"
    },
    {
        "key": "Flow_140531a",
        "type": "sequenceFlow",
        "startTime": 1708328185394,
        "endTime": 1708328185394,
        "taskId": null
    },
    {
        "key": "Activity_0m8x9be",
        "type": "userTask",
        "startTime": 1708328185394,
        "endTime": 1708328195921,
        "taskId": "9601c20c-cef9-11ee-8387-b0dcef2e0f58"
    },
    {
        "key": "Flow_003dmj6",
        "type": "sequenceFlow",
        "startTime": 1708328195928,
        "endTime": 1708328195928,
        "taskId": null
    },
    {
        "key": "Activity_0hynar5",
        "type": "userTask",
        "startTime": 1708328195929,
        "endTime": 1708328205268,
        "taskId": "9c4fd48a-cef9-11ee-96f6-aa643deda0c3"
    },
    {
        "key": "Activity_1nkv739",
        "type": "userTask",
        "startTime": 1708328205278,
        "endTime": 1708328209759,
        "taskId": "a1dc4560-cef9-11ee-96f6-aa643deda0c3"
    },
    {
        "key": "Flow_140531a",
        "type": "sequenceFlow",
        "startTime": 1708328209760,
        "endTime": 1708328209760,
        "taskId": null
    },
    {
        "key": "Activity_0m8x9be",
        "type": "userTask",
        "startTime": 1708328209761,
        "endTime": 1708328747381,
        "taskId": "a4882b85-cef9-11ee-96f6-aa643deda0c3"
    },
    {
        "key": "Flow_0u18zdq",
        "type": "sequenceFlow",
        "startTime": 1708478146069,
        "endTime": 1708478146069,
        "taskId": null
    },
    {
        "key": "Event_0pbmk5n",
        "type": "endEvent",
        "startTime": 1708478146071,
        "endTime": 1708478146071,
        "taskId": null
    },
    {
        "key": "Flow_003dmj6",
        "type": "sequenceFlow",
        "startTime": 1708328747382,
        "endTime": 1708328747382,
        "taskId": null
    },
    {
        "key": "Activity_0hynar5",
        "type": "userTask",
        "startTime": 1708328747383,
        "endTime": 1708478146069,
        "taskId": "e4fac6ea-cefa-11ee-96f6-aa643deda0c3"
    }
]
 
</script>

<style lang="less" scoped>
  .box-card {
    border: 1px solid #e4e7ed;
    margin-top: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
  }
</style>

<!-- <template>
  <CollapseContainer style="position: relative">
    <MyProcessDesigner
      key="designer"
      v-if="xmlString !== undefined"
      v-model="xmlString"
      :value="xmlString"
      v-bind="controlForm"
      keyboard
      ref="processDesigner"
      @init-finished="initModeler"
      :additionalModel="controlForm.additionalModel"
      @save="save"
    />
    <MyProcessPenal
      key="penal"
      :bpmnModeler="modeler as any"
      :prefix="controlForm.prefix"
      class="process-panel"
      :model="model"
    />
  </CollapseContainer>
</template>

<script lang="ts" setup>
  import { MyProcessDesigner, MyProcessPenal, CustomContentPadProvider,
  CustomPaletteProvider
} from '@shy-plugins/workflow-bpmn';
  import { ref, onMounted } from 'vue';
  import { CollapseContainer } from '3h1-ui';
  const xmlString = ref(undefined); 
  const modeler = ref(null); 
  const controlForm = ref({
    simulation: true,
    labelEditing: false,
    labelVisible: false,
    prefix: 'flowable',
    headerButtonSize: 'mini',
    additionalModel: [CustomContentPadProvider, CustomPaletteProvider],
  });
  const model = ref(); 

  const initModeler = (item) => {
    modeler.value = item;
  };

  const save = async (bpmnXml) => {
   console.log('bpmnXml',bpmnXml);
   
  };


onMounted(async () => {
  setTimeout(() => {
    xmlString.value=`<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="diagram_Process_1706597140854" targetNamespace="http://flowable.org/bpmn"><bpmn2:process id="yanshi123" name="演示流程2" isExecutable="true"><bpmn2:startEvent id="Event_0lihbt4"><bpmn2:outgoing>Flow_1kk0kmd</bpmn2:outgoing></bpmn2:startEvent><bpmn2:userTask id="Activity_14r2usp" name="提交"><bpmn2:incoming>Flow_1kk0kmd</bpmn2:incoming><bpmn2:outgoing>Flow_1xe01bc</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="Flow_1kk0kmd" sourceRef="Event_0lihbt4" targetRef="Activity_14r2usp" /><bpmn2:userTask id="Activity_09569ee" name="领导审批"><bpmn2:incoming>Flow_1xe01bc</bpmn2:incoming><bpmn2:outgoing>Flow_1kyc2ps</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="Flow_1xe01bc" sourceRef="Activity_14r2usp" targetRef="Activity_09569ee" /><bpmn2:userTask id="Activity_1fjzogd" name="老板审批"><bpmn2:incoming>Flow_1kyc2ps</bpmn2:incoming><bpmn2:outgoing>Flow_17dws2h</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="Flow_1kyc2ps" sourceRef="Activity_09569ee" targetRef="Activity_1fjzogd" /><bpmn2:endEvent id="Event_051gsrk"><bpmn2:incoming>Flow_17dws2h</bpmn2:incoming></bpmn2:endEvent><bpmn2:sequenceFlow id="Flow_17dws2h" sourceRef="Activity_1fjzogd" targetRef="Event_051gsrk" /></bpmn2:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="yanshi123_di" bpmnElement="yanshi123"><bpmndi:BPMNEdge id="Flow_17dws2h_di" bpmnElement="Flow_17dws2h"><di:waypoint x="720" y="260" /><di:waypoint x="782" y="260" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1kyc2ps_di" bpmnElement="Flow_1kyc2ps"><di:waypoint x="560" y="260" /><di:waypoint x="620" y="260" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1xe01bc_di" bpmnElement="Flow_1xe01bc"><di:waypoint x="400" y="260" /><di:waypoint x="460" y="260" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1kk0kmd_di" bpmnElement="Flow_1kk0kmd"><di:waypoint x="248" y="260" /><di:waypoint x="300" y="260" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="Event_0lihbt4_di" bpmnElement="Event_0lihbt4"><dc:Bounds x="212" y="242" width="36" height="36" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_14r2usp_di" bpmnElement="Activity_14r2usp"><dc:Bounds x="300" y="220" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_09569ee_di" bpmnElement="Activity_09569ee"><dc:Bounds x="460" y="220" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1fjzogd_di" bpmnElement="Activity_1fjzogd"><dc:Bounds x="620" y="220" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_051gsrk_di" bpmnElement="Event_051gsrk"><dc:Bounds x="782" y="242" width="36" height="36" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn2:definitions>`

  },1000)
    
   
  });
</script>
<style lang="less">
  .process-panel__container {
    position: absolute;
    top: 90px;
    right: 60px;
  }
</style> -->
