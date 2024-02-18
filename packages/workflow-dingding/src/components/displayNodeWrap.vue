<template>
  <!-- 发起人，审批人，抄送人，触发器-->
  <div class="node-wrap" v-if="[0, 1, 2, 5].includes(nodeConfig.type)">
    <div
      class="node-wrap-box"
      :class="nodeConfig.type == 0 ? 'start-node ' : ''"
      :style="{ border: `1px solid ${bgColors[nodeConfig.completeState]}` }"
    >
      <div class="title" :style="{ background: bgColors[nodeConfig.completeState] }">
        <!--发起人，审批人，抄送人，触发器title-->
        <span class="mr-5">
          <clock-circle-outlined v-if="nodeConfig.completeState === 1" />
          <file-outlined v-else-if="nodeConfig.completeState === 2" />
          <node-index-outlined v-else />
        </span>
        <span>{{ nodeConfig.nodeName }}</span>
      </div>

      <div class="content">
        <div class="text">
          <span class="placeholder" v-if="!showText">请选择{{ defaultText }}</span>
          {{ showText }}
        </div>
        <!-- <RightOutlined class="content-close" /> -->
      </div>
    </div>
    <addNode v-model:childNodeP="nodeConfig.childNode" />
  </div>
  <!-- 条件分支 -->
  <div class="branch-wrap" v-if="nodeConfig.type == 4">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <button class="add-branch">条件</button>
        <div class="col-box" v-for="(item, index) in nodeConfig.conditionNodes" :key="index">
          <div class="condition-node">
            <div class="condition-node-box">
              <div class="node-wrap-box" :style="{ border: `1px solid ${bgColors[nodeConfig.completeState]}` }">
                <div class="title" :style="{ background: bgColors[nodeConfig.completeState] }">
                  <span class="mr-5">
                    <clock-circle-outlined v-if="nodeConfig.completeState === 1" />
                    <file-outlined v-else-if="nodeConfig.completeState === 2" />
                    <node-index-outlined v-else />
                  </span>
                  <span class="editable-title">{{ item.nodeName }}</span>
                </div>

                <div class="content">
                  {{ $func.conditionStr(nodeConfig, index) }}
                </div>
              </div>
              <addNode v-model:childNodeP="item.childNode" />
            </div>
          </div>
          <displayNodeWrap v-if="item.childNode" v-model:nodeConfig="item.childNode" />
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

  <!-- 并行分支 -->
  <div class="branch-wrap" v-if="nodeConfig.type == 3">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <button class="add-branch">分支</button>
        <div class="col-box" v-for="(item, index) in nodeConfig.conditionNodes" :key="index">
          <div class="condition-node">
            <div class="condition-node-box">
              <div class="node-wrap-box" :style="{ border: `1px solid ${bgColors[nodeConfig.completeState]}` }">
                <div class="title" :style="{ background: bgColors[nodeConfig.completeState] }">
                  <span class="mr-5">
                    <clock-circle-outlined v-if="nodeConfig.completeState === 1" />
                    <file-outlined v-else-if="nodeConfig.completeState === 2" />
                    <node-index-outlined v-else />
                  </span>
                  <span class="editable-title">{{ item.nodeName }}</span>
                </div>
                <div class="content">
                  {{ $func.conditionStr(nodeConfig, index) }}
                </div>
              </div>
              <addNode v-model:childNodeP="item.childNode" />
            </div>
          </div>
          <displayNodeWrap v-if="item.childNode" v-model:nodeConfig="item.childNode" />
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

  <displayNodeWrap v-if="nodeConfig.childNode" v-model:nodeConfig="nodeConfig.childNode" />
</template>
<script setup>
import $func from "../config/preload";
import { RightOutlined, ClockCircleOutlined, FileOutlined, NodeIndexOutlined } from "@ant-design/icons-vue";
import { onMounted, computed , defineProps, defineEmits } from "vue";
let bgColors = ["#464747", "#2991FF", "#21A64B"];
let placeholderList = [,"发起人", "审核人", "触发器","条件" ,"条件分支" ];
let props = defineProps({
  nodeConfig: {
    type: Object,
    default: () => {},
  },
  
});

let defaultText = computed(() => {
  return placeholderList[props.nodeConfig.type];
});

let showText = computed(() => {
  if (props.nodeConfig.type == 1) return $func.arrToStr(props.nodeConfig.approvalList) || "所有人";
  if (props.nodeConfig.type == 2) return $func.arrToStr(props.nodeConfig.approvalList) || "直接主管";
  if (props.nodeConfig.type == 3)
    return props.nodeConfig.conditionList.length > 0
      ? `${props.nodeConfig.conditionList.length}个触发器`
      : "请设置触发器";

  return $func.copyerStr(props.nodeConfig);
});

const resetConditionNodesErr = () => {
  for (var i = 0; i < props.nodeConfig.conditionNodes.length; i++) {
    props.nodeConfig.conditionNodes[i].error =
      $func.conditionStr(props.nodeConfig, i) == "请设置条件" && i != props.nodeConfig.conditionNodes.length - 1;
  }
};

onMounted(() => {
  if (props.nodeConfig.type == 1) {
    props.nodeConfig.error = !$func.setApproverStr(props.nodeConfig);
  } else if (props.nodeConfig.type == 2) {
    props.nodeConfig.error = !$func.copyerStr(props.nodeConfig);
  } else if ([3, 4].includes(props.nodeConfig.type)) {
    resetConditionNodesErr();
  }
});
</script>

<style scoped>
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

