<!-- <template>
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
  const bpmProcessInstanceResult=[
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
  const bpmnXml=`<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:flowable=\"http://flowable.org/bpmn\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" typeLanguage=\"http://www.w3.org/2001/XMLSchema\" expressionLanguage=\"http://www.w3.org/1999/XPath\" targetNamespace=\"http://www.flowable.org/test\">\n  <process id=\"zh_ceshi1\" name=\"啊啊啊啊啊1\" isExecutable=\"true\">\n    <startEvent id=\"dingStartEvent\" name=\"流程启动\"></startEvent>\n    <userTask id=\"userTask_11a431201e7b4d4c8371e6ed2e3c454e\" name=\"发起人\" flowable:skipExpression=\"${true}\"></userTask>\n    <sequenceFlow id=\"sequenceFlow_1d9b3b95f9994d09b468635521aef481\" sourceRef=\"dingStartEvent\" targetRef=\"userTask_11a431201e7b4d4c8371e6ed2e3c454e\"></sequenceFlow>\n    <userTask id=\"userTask_eb36bea1dd3a49caaf7cdfec93968297\" name=\"审核人\"></userTask>\n    <sequenceFlow id=\"sequenceFlow_3fa62fa43d3248dfa968b23c9e434cd0\" sourceRef=\"userTask_11a431201e7b4d4c8371e6ed2e3c454e\" targetRef=\"userTask_eb36bea1dd3a49caaf7cdfec93968297\"></sequenceFlow>\n    <endEvent id=\"dingEndEvent\" name=\"流程结束\"></endEvent>\n    <sequenceFlow id=\"sequenceFlow_3e99a9c6faa84706858322e68641f4f2\" sourceRef=\"userTask_eb36bea1dd3a49caaf7cdfec93968297\" targetRef=\"dingEndEvent\"></sequenceFlow>\n  </process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_zh_ceshi1\">\n    <bpmndi:BPMNPlane bpmnElement=\"zh_ceshi1\" id=\"BPMNPlane_zh_ceshi1\">\n      <bpmndi:BPMNShape bpmnElement=\"dingEndEvent\" id=\"BPMNShape_dingEndEvent\">\n        <omgdc:Bounds height=\"30.0\" width=\"30.0\" x=\"380.0\" y=\"15.0\"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement=\"userTask_11a431201e7b4d4c8371e6ed2e3c454e\" id=\"BPMNShape_userTask_11a431201e7b4d4c8371e6ed2e3c454e\">\n        <omgdc:Bounds height=\"60.0\" width=\"100.0\" x=\"80.0\" y=\"0.0\"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement=\"userTask_eb36bea1dd3a49caaf7cdfec93968297\" id=\"BPMNShape_userTask_eb36bea1dd3a49caaf7cdfec93968297\">\n        <omgdc:Bounds height=\"60.0\" width=\"100.0\" x=\"230.0\" y=\"0.0\"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement=\"dingStartEvent\" id=\"BPMNShape_dingStartEvent\">\n        <omgdc:Bounds height=\"30.0\" width=\"30.0\" x=\"0.0\" y=\"15.0\"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge bpmnElement=\"sequenceFlow_3fa62fa43d3248dfa968b23c9e434cd0\" id=\"BPMNEdge_sequenceFlow_3fa62fa43d3248dfa968b23c9e434cd0\">\n        <omgdi:waypoint x=\"180.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"192.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"192.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"230.0\" y=\"30.0\"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement=\"sequenceFlow_3e99a9c6faa84706858322e68641f4f2\" id=\"BPMNEdge_sequenceFlow_3e99a9c6faa84706858322e68641f4f2\">\n        <omgdi:waypoint x=\"330.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"342.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"342.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"380.0\" y=\"30.0\"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement=\"sequenceFlow_1d9b3b95f9994d09b468635521aef481\" id=\"BPMNEdge_sequenceFlow_1d9b3b95f9994d09b468635521aef481\">\n        <omgdi:waypoint x=\"30.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"42.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"42.0\" y=\"30.0\"></omgdi:waypoint>\n        <omgdi:waypoint x=\"80.0\" y=\"30.0\"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>`
  const tasks=[
    {
        "id": "2b802db2-bf55-11ee-a1f3-b0dcef2e0f58",
        "name": "审核人",
        "claimTime": null,
        "createTime": 1706608302000,
        "suspensionState": null,
        "processInstance": {
            "id": "2b781757-bf55-11ee-a1f3-b0dcef2e0f58",
            "name": "啊啊啊啊啊1",
            "startUserId": 1,
            "startUserNickname": "admin",
            "processDefinitionId": "zh_ceshi1:1:680dd77d-bf3a-11ee-b543-b0dcef2e0f58"
        },
        "endTime": null,
        "durationInMillis": null,
        "result": 1,
        "reason": null,
        "definitionKey": "userTask_eb36bea1dd3a49caaf7cdfec93968297",
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
        "id": "2b80069f-bf55-11ee-a1f3-b0dcef2e0f58",
        "name": "发起人",
        "claimTime": null,
        "createTime": 1706608301779,
        "suspensionState": null,
        "processInstance": {
            "id": "2b781757-bf55-11ee-a1f3-b0dcef2e0f58",
            "name": "啊啊啊啊啊1",
            "startUserId": 1,
            "startUserNickname": "admin",
            "processDefinitionId": "zh_ceshi1:1:680dd77d-bf3a-11ee-b543-b0dcef2e0f58"
        },
        "endTime": 1706608301801,
        "durationInMillis": 22,
        "result": null,
        "reason": null,
        "definitionKey": "userTask_11a431201e7b4d4c8371e6ed2e3c454e",
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
  const activityList = ref([
    {
        "key": "dingStartEvent",
        "type": "startEvent",
        "startTime": 1706608301775,
        "endTime": 1706608301778,
        "taskId": null
    },
    {
        "key": "sequenceFlow_1d9b3b95f9994d09b468635521aef481",
        "type": "sequenceFlow",
        "startTime": 1706608301779,
        "endTime": 1706608301779,
        "taskId": null
    },
    {
        "key": "userTask_11a431201e7b4d4c8371e6ed2e3c454e",
        "type": "userTask",
        "startTime": 1706608301779,
        "endTime": 1706608301801,
        "taskId": "2b80069f-bf55-11ee-a1f3-b0dcef2e0f58"
    },
    {
        "key": "sequenceFlow_3fa62fa43d3248dfa968b23c9e434cd0",
        "type": "sequenceFlow",
        "startTime": 1706608301801,
        "endTime": 1706608301801,
        "taskId": null
    },
    {
        "key": "userTask_eb36bea1dd3a49caaf7cdfec93968297",
        "type": "userTask",
        "startTime": 1706608301801,
        "endTime": null,
        "taskId": "2b802db2-bf55-11ee-a1f3-b0dcef2e0f58"
    }
]); 
 
</script>

<style lang="less" scoped>
  .box-card {
    border: 1px solid #e4e7ed;
    margin-top: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
  }
</style> -->

<template>
  <CollapseContainer style="position: relative">
    <!-- 流程设计器，负责绘制流程等 -->
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
    <!-- 流程属性器，负责编辑每个流程节点的属性 -->
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
    CustomPaletteProvider } from '@shy-plugins/workflow-bpmn';
  // 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
  // 自定义左侧菜单（修改 默认任务 为 用户任务）
  import { CollapseContainer } from '3h1-ui';
  defineOptions({ name: 'BpmModelEditor' });

  const xmlString = ref(undefined); // BPMN XML
  const modeler = ref(null); // BPMN Modeler
  const controlForm = ref({
    simulation: true,
    labelEditing: false,
    labelVisible: false,
    prefix: 'flowable',
    headerButtonSize: 'mini',
    additionalModel: [CustomContentPadProvider, CustomPaletteProvider],
  });
  const model = ref(); // 流程模型的信息

  /** 初始化 modeler */
  const initModeler = (item) => {
    setTimeout(() => {
      modeler.value = item;
    }, 10);
  };

  /** 添加/修改模型 */
  const save = async (bpmnXml) => {
   console.log('bpmnXml',bpmnXml);
   
  };


  /** 初始化 */
onMounted(async () => {
    xmlString.value=`<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="diagram_Process_1706597140854" targetNamespace="http://flowable.org/bpmn"><bpmn2:process id="yanshi123" name="演示流程2" isExecutable="true"><bpmn2:startEvent id="Event_0lihbt4"><bpmn2:outgoing>Flow_1kk0kmd</bpmn2:outgoing></bpmn2:startEvent><bpmn2:userTask id="Activity_14r2usp" name="提交"><bpmn2:incoming>Flow_1kk0kmd</bpmn2:incoming><bpmn2:outgoing>Flow_1xe01bc</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="Flow_1kk0kmd" sourceRef="Event_0lihbt4" targetRef="Activity_14r2usp" /><bpmn2:userTask id="Activity_09569ee" name="领导审批"><bpmn2:incoming>Flow_1xe01bc</bpmn2:incoming><bpmn2:outgoing>Flow_1kyc2ps</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="Flow_1xe01bc" sourceRef="Activity_14r2usp" targetRef="Activity_09569ee" /><bpmn2:userTask id="Activity_1fjzogd" name="老板审批"><bpmn2:incoming>Flow_1kyc2ps</bpmn2:incoming><bpmn2:outgoing>Flow_17dws2h</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="Flow_1kyc2ps" sourceRef="Activity_09569ee" targetRef="Activity_1fjzogd" /><bpmn2:endEvent id="Event_051gsrk"><bpmn2:incoming>Flow_17dws2h</bpmn2:incoming></bpmn2:endEvent><bpmn2:sequenceFlow id="Flow_17dws2h" sourceRef="Activity_1fjzogd" targetRef="Event_051gsrk" /></bpmn2:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="yanshi123_di" bpmnElement="yanshi123"><bpmndi:BPMNEdge id="Flow_17dws2h_di" bpmnElement="Flow_17dws2h"><di:waypoint x="720" y="260" /><di:waypoint x="782" y="260" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1kyc2ps_di" bpmnElement="Flow_1kyc2ps"><di:waypoint x="560" y="260" /><di:waypoint x="620" y="260" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1xe01bc_di" bpmnElement="Flow_1xe01bc"><di:waypoint x="400" y="260" /><di:waypoint x="460" y="260" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1kk0kmd_di" bpmnElement="Flow_1kk0kmd"><di:waypoint x="248" y="260" /><di:waypoint x="300" y="260" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="Event_0lihbt4_di" bpmnElement="Event_0lihbt4"><dc:Bounds x="212" y="242" width="36" height="36" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_14r2usp_di" bpmnElement="Activity_14r2usp"><dc:Bounds x="300" y="220" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_09569ee_di" bpmnElement="Activity_09569ee"><dc:Bounds x="460" y="220" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1fjzogd_di" bpmnElement="Activity_1fjzogd"><dc:Bounds x="620" y="220" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_051gsrk_di" bpmnElement="Event_051gsrk"><dc:Bounds x="782" y="242" width="36" height="36" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn2:definitions>`
   
  });
</script>
<style lang="less">
  .process-panel__container {
    position: absolute;
    top: 90px;
    right: 60px;
  }
</style>
