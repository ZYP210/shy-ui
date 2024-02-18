<template>
  <!-- 发起人，审批人，触发器,条件-->
  <div class="node-wrap" v-if="[1, 2, 3, 4].includes(nodeConfig.type)">
    <div
      class="node-wrap-box"
      :class="(nodeConfig.type == 1 ? 'start-node ' : '') + (isTried && nodeConfig.error ? 'active error' : '')"
    >
      <div class="title" :style="`background: rgb(${bgColors[nodeConfig.type]});`">
        <!-- 发起人title -->
        <span v-if="nodeConfig.type == 1">{{ nodeConfig.nodeName }}</span>
        <!--审批人，抄送人，触发器title-->
        <template v-else>
          <span class="mr-5">
            <user-outlined v-if="nodeConfig.type == 2" />
            <!-- <send-outlined v-else-if="nodeConfig.type == 2" /> -->
            <control-outlined v-else-if="nodeConfig.type == 3" />
          </span>
          <Input
            v-if="isInput"
            style="width: 120px"
            class="ant-input editable-title-input"
            @blur="blurEvent()"
            @focus="$event.currentTarget.select()"
            v-focus
            v-model:value="nodeConfig.nodeName"
            :placeholder="defaultText"
          />
          <span v-else class="editable-title" @click="clickEvent()">{{ nodeConfig.nodeName }}</span>
          <CloseOutlined class="close" @click.stop="delNode" />
        </template>
      </div>
      <div class="content" @click="setPerson">
        <div class="text">
          <span class="placeholder" v-if="!showText">请选择{{ defaultText }}</span>
          {{ showText }}
        </div>
        <RightOutlined class="content-close" />
      </div>
      <div class="error_tip" v-if="isTried && nodeConfig.error">
        <info-circle-outlined />
      </div>
    </div>
    <addNode v-model:childNodeP="nodeConfig.childNode" />
  </div>
  <!-- 条件分支 -->
  <div class="branch-wrap" v-if="nodeConfig.type == 5">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <button class="add-branch" @click="addTerm(4)">添加条件</button>
        <div class="col-box" v-for="(item, index) in nodeConfig.conditionNodes" :key="index">
          <div class="condition-node">
            <div class="condition-node-box">
              <div class="auto-judge" :class="isTried && item.error ? 'error active' : ''">
                <div class="sort-left" v-if="index != 0" @click="arrTransfer(index, -1)">&lt;</div>
                <div class="title-wrapper">
                  <Input
                    style="width: 120px"
                    v-if="isInputList[index]"
                    class="ant-input editable-title-input"
                    @blur="blurEvent(index)"
                    @focus="$event.currentTarget.select()"
                    v-focus
                    v-model:value="item.nodeName"
                  />
                  <span v-else class="editable-title" @click="clickEvent(index)">{{ item.nodeName }}</span>
                  <span class="priority-title" @click="setPerson(item.priorityLevel)"
                    >优先级{{ item.priorityLevel }}</span
                  >
                  <CloseOutlined class="close" @click.stop="delTerm(index, '条件')" />
                </div>
                <div
                  class="sort-right"
                  v-if="index != nodeConfig.conditionNodes.length - 1"
                  @click="arrTransfer(index)"
                >
                  &gt;
                </div>
                <div class="content" @click="setPerson(item.priorityLevel)">
                  {{ $func.conditionStr(nodeConfig, index) }}
                </div>
                <div class="error_tip" v-if="isTried && item.error">
                  <info-circle-outlined />
                </div>
              </div>
              <addNode v-model:childNodeP="item.childNode" />
            </div>
          </div>
          <nodeWrap v-if="item.childNode" v-model:nodeConfig="item.childNode" />
          <template v-if="index == 0">
            <div class="top-left-cover-line"></div>
            <div class="bottom-left-cover-line"></div>
          </template>
          <template v-if="index == nodeConfig.conditionNodes.length - 1">
            <div class="top-right-cover-line"></div>
            <div class="bottom-right-cover-line"></div>
          </template>
        </div>
      </div>
      <addNode v-model:childNodeP="nodeConfig.childNode" />
    </div>
  </div>

  <nodeWrap v-if="nodeConfig.childNode" v-model:nodeConfig="nodeConfig.childNode" />
</template>
<script setup>
import $func from "../config/preload";
import {
  CloseOutlined,
  RightOutlined,
  UserOutlined,
  SendOutlined,
  MenuOutlined,
  ControlOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import { mapState, mapMutations } from "../config/lib.js";
import { onMounted, ref, watch, getCurrentInstance, computed , toRaw } from "vue";
import { Input, Select } from "ant-design-vue";
import { cloneDeep } from "lodash";
let _uid = getCurrentInstance().uid;
let bgColors = ["87, 106, 149", "255, 148, 62", "50, 150, 250", , , "71, 188, 130"];
let placeholderList = [,"发起人", "审核人", "触发器","条件" ,"条件分支" ];
let props = defineProps({
  nodeConfig: {
    type: Object,
    default: () => { },
  },

  rootFieldPermissions: {
    type: Array,
    default: () => [],
  },
});

let defaultText = computed(() => {
  return placeholderList[props.nodeConfig.type];
});

let showText = computed(() => {
  if (props.nodeConfig.type == 1) return $func.arrToStr(props.nodeConfig.approvalList) || "所有人";
  if (props.nodeConfig.type == 2) { 
    if(!props.nodeConfig.approvalList?.length) return ""
    const ruleTypeDic = $func.getRuleTypeDic();
    const itemVal = props.nodeConfig.approvalList[0];
    const options = ruleTypeDic[itemVal.type]?.options ?? [];
    const fieldNames = ruleTypeDic[itemVal.type]?.fieldNames;
    return itemVal.options.map(data => { 
      const result = $func.findTreeNode(options.value, (node) => { return node[fieldNames?.value || 'value'] == data })
      return result[fieldNames?.label || 'label'];
    }).toString()    
  }
 
  if (props.nodeConfig.type == 3)
    return props.nodeConfig.conditionList.length > 0
      ? `${props.nodeConfig.conditionList.length}个触发器`
      : "请设置触发器";

  return $func.copyerStr(props.nodeConfig);
});

let isInputList = ref([]);
let isInput = ref(false);
const resetConditionNodesErr = () => {
  for (var i = 0; i < props.nodeConfig.conditionNodes.length; i++) {
    props.nodeConfig.conditionNodes[i].error =
      $func.conditionStr(props.nodeConfig, i) == "请设置条件" && i != props.nodeConfig.conditionNodes.length - 1;
  }
};
onMounted(() => {
  if (props.nodeConfig.type == 2) {
    props.nodeConfig.error = !$func.setApproverStr(props.nodeConfig);
  }
  else if ([4, 5].includes(props.nodeConfig.type)) {
    resetConditionNodesErr();
  }
});
let emits = defineEmits(["update:nodeConfig", "update:rootFieldPermissions"]);
let { isTried,  approverConfig1, copyerConfig1, conditionsConfig1, branchConfig1, authorityTableList,flowPermission1 } =
  mapState();
watch(
  [approverConfig1, copyerConfig1, conditionsConfig1, branchConfig1],
  ([flow, approver, copyer, condition, branch]) => {
    if (flow.flag && flow.id === _uid) {
      setTimeout(() => { 
        flow.flag = false;
      },100)
      emits("update:rootFieldPermissions", flow.value.fieldPermissions);
    }
    if (flow?.flag && flow.id === _uid) {
      const obj = cloneDeep(flow.value);
      approver.flag = false;
      emits("update:nodeConfig", { ...obj, fieldPermissions: flow.value.fieldPermissions });
    }
    if (copyer?.flag && copyer?.id === _uid) {
      copyer.flag = false;
      emits("update:nodeConfig", copyer.value);
    }
    if (condition?.flag && condition?.id === _uid) {
      condition.flag = false;
      emits("update:nodeConfig", condition.value);
    }
    if (branch?.flag && branch?.id === _uid) {
      branch.flag = false;
      emits("update:nodeConfig", branch.value);
    }
  },
);

let {
  setPromoter,
  setApprover,
  setCopyer,
  setCondition,
  setFlowPermission,
  setApproverConfig,
  setCopyerConfig,
  setConditionsConfig,
  setBranch,
  setBranchConfig,
} = mapMutations();
const clickEvent = (index) => {
  if (index || index === 0) {
    isInputList.value[index] = true;
  } else {
    isInput.value = true;
  }
};
const blurEvent = (index, title = "条件") => {
  if (index || index === 0) {
    isInputList.value[index] = false;
    props.nodeConfig.conditionNodes[index].nodeName = props.nodeConfig.conditionNodes[index].nodeName || title;
  } else {
    isInput.value = false;
    props.nodeConfig.nodeName = props.nodeConfig.nodeName || defaultText;
  }
};
const delNode = () => {
  emits("update:nodeConfig", props.nodeConfig.childNode);
};
const addTerm = (type) => {
  let len = props.nodeConfig.conditionNodes.length + 1;
  props.nodeConfig.conditionNodes.push({
    nodeName: type === 4 ? "条件" : "分支" + len,
    type: type,
    priorityLevel: len,
    expression: '',
    childNode: null,
  });
  resetConditionNodesErr();
  emits("update:nodeConfig", props.nodeConfig);
};
const delTerm = (index, title) => {
  props.nodeConfig.conditionNodes.splice(index, 1);
  props.nodeConfig.conditionNodes.map((item, index) => {
    item.priorityLevel = index + 1;
    item.nodeName = `${title}${index + 1}`;
  });
  resetConditionNodesErr();
  emits("update:nodeConfig", props.nodeConfig);
  if (props.nodeConfig.conditionNodes.length == 1) {
    if (props.nodeConfig.childNode) {
      if (props.nodeConfig.conditionNodes[0].childNode) {
        reData(props.nodeConfig.conditionNodes[0].childNode, props.nodeConfig.childNode);
      } else {
        props.nodeConfig.conditionNodes[0].childNode = props.nodeConfig.childNode;
      }
    }
    emits("update:nodeConfig", props.nodeConfig.conditionNodes[0].childNode);
  }
};
const reData = (data, addData) => {
  if (!data.childNode) {
    data.childNode = addData;
  } else {
    reData(data.childNode, addData);
  }
};
const setPerson = (priorityLevel) => {
  const { type, fieldPermissions } = props.nodeConfig;
  const hasVal = toRaw(flowPermission1.value?.fieldPermissions)?.length;
  if (type == 1) {
    setPromoter(true);
    if (hasVal) return;
    const fieldPermissions = props.rootFieldPermissions;
    setFlowPermission({
      flag: false,
      id: _uid,
      fieldPermissions:fieldPermissions && fieldPermissions.length > 0 ? fieldPermissions : authorityTableList.value,
    });
  } else if ([2].includes(type)) {
    setApprover(true);
    const obj = {
      ...props.nodeConfig,
      fieldPermissions: fieldPermissions && fieldPermissions.length > 0 ? fieldPermissions : authorityTableList.value,
    };
    setApproverConfig({
      value: {
        ...JSON.parse(JSON.stringify(obj)),
      },
      flag: false,
      id: _uid,
    });
  } else if (type == 3) {
    setCopyer(true);
    setCopyerConfig({
      value: JSON.parse(JSON.stringify(props.nodeConfig)),
      flag: false,
      id: _uid,
    });
  } else if (type == 5) {
    setCondition(true);
    setConditionsConfig({
      value: JSON.parse(JSON.stringify(props.nodeConfig)),
      priorityLevel,
      flag: false,
      id: _uid,
    });
  } else if (type == 4) {
    
    setBranch(true);
    setBranchConfig({
      value: JSON.parse(JSON.stringify(props.nodeConfig)),
      priorityLevel,
      flag: false,
      id: _uid,
    });
  }
};
const arrTransfer = (index, type = 1) => {
  //向左-1,向右1
  props.nodeConfig.conditionNodes[index] = props.nodeConfig.conditionNodes.splice(
    index + type,
    1,
    props.nodeConfig.conditionNodes[index],
  )[0];
  props.nodeConfig.conditionNodes.map((item, index) => {
    item.priorityLevel = index + 1;
  });
  resetConditionNodesErr();
  emits("update:nodeConfig", props.nodeConfig);
};
</script>
<style>
.error_tip {
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(150%, 0px);
  font-size: 24px;
  border-radius: 50%;
  color: red;
}

.promoter_person .a-modal__body {
  padding: 10px 20px 14px 20px;
}

.selected_list {
  margin-bottom: 20px;
  line-height: 30px;
}

.selected_list span {
  margin-right: 10px;
  padding: 3px 6px 3px 9px;
  line-height: 12px;
  white-space: nowrap;
  border-radius: 2px;
  border: 1px solid rgba(220, 220, 220, 1);
}

.selected_list img {
  margin-left: 5px;
  width: 7px;
  height: 7px;
  cursor: pointer;
}
.content-close {
  position: absolute;
  top: calc(50% - 7px);
  right: 10px;
}
.mr-5 {
  margin-right: 5px;
}
</style>

