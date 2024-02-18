<template>
  <div class="dingflow-design-body">
    <div class="fd-nav-content">
      <Button type="primary" style="z-index: 999" class="ant-btn button-publish" @click="saveSet">
        <span v-if="!option.isLook">发 布</span>
      </Button>
      <section class="dingflow-design">
        <div class="zoom" v-if="!option.isLook">
          <div class="zoom-out" :class="nowVal == 50 && 'disabled'" @click="zoomSize(1)"></div>
          <span>{{ nowVal }}%</span>
          <div class="zoom-in" :class="nowVal == 300 && 'disabled'" @click="zoomSize(2)"></div>
        </div>
        <div
          v-if="!option.isStatus"
          class="box-scale"
          :style="`transform: scale(${nowVal / 100});`"
          :class="option.isLook ? 'no-click' : ''"
        >
          <nodeWrap
            v-model:nodeConfig="nodeConfig"
            v-model:rootFieldPermissions="rootFieldPermissions"
          />
          <div class="end-node">
            <div class="end-node-circle"></div>
            <div class="end-node-text">流程结束</div>
          </div>
        </div>

        <div
          v-else
          class="box-scale"
          :style="`transform: scale(${nowVal / 100});`"
          :class="option.isLook ? 'no-click' : ''"
        >
          <displayNodeWrap
            class="display"
            v-model:nodeConfig="nodeConfig"
            v-model:rootFieldPermissions="rootFieldPermissions"
          />
          <div class="end-node">
            <div class="end-node-circle"></div>
            <div class="end-node-text">流程结束</div>
          </div>
        </div>
      </section>
    </div>
    <errorDialog v-model:visible="tipVisible" :list="tipList" />
    <promoterDrawer />
    <approverDrawer />
    <copyerDrawer />
    <conditionDrawer />
    <branchDrawer />
  </div>
</template>

<script setup>
import errorDialog from "../components/dialog/errorDialog.vue";
import promoterDrawer from "../components/drawer/promoterDrawer.vue";
import approverDrawer from "../components/drawer/approverDrawer.vue";
import copyerDrawer from "../components/drawer/copyerDrawer.vue";
import conditionDrawer from "../components/drawer/conditionDrawer.vue";
import branchDrawer from "../components/drawer/branchDrawer.vue";
import $func from "../config/preload";
import { ref } from "vue";
import { mapMutations } from "../config/lib.js";
import { Button} from 'ant-design-vue'
let { setTableId, setNodeTypeList, setUserList, setRoleList, setDeptList, setIsLook, setAuthorityTableList ,setPostList,setUserGroupList,setScriptList,setTypeList} =
  mapMutations();

const emit = defineEmits(["getNodeJson"]);
const props = defineProps(["initData", "customApi", "option"]);

let tipList = ref([]);
let tipVisible = ref(false);
let nowVal = ref(100);
let processConfig = ref({});
let nodeConfig = ref({});
let workName = ref('');

const rootFieldPermissions = ref([]);

const data = props.initData;
processConfig.value = data;
let { nodeConfig: nodes,  name, deploymentId } = data;
nodeConfig.value = (!nodes || !Object.keys(nodes).length)? {nodeName: '发起人',
    type: 1,
    childNode: null,id:$func.buildShortUUID('userTask_')}:nodes
workName.value = name;
rootFieldPermissions.value = nodes?.fieldPermissions;

setTableId(deploymentId);
setNodeTypeList(props.option["nodeType"]);
setIsLook(props.option["isLook"]);

setUserList(props.customApi["user"]);
setRoleList(props.customApi["role"]);
setDeptList(props.customApi["dept"]);
setAuthorityTableList(props.customApi["authorityTableList"]);

setPostList(props.customApi["post"]);
setUserGroupList(props.customApi["userGroup"]);
setScriptList(props.customApi["script"]);
setTypeList(props.customApi["type"]);

//格式化子节点
const reErr = ({ type, childNode }) => {
  if (childNode) {
    let { type, error, nodeName, conditionNodes } = childNode;
    if (type == 1 || type == 2) {
      if (error) {
        tipList.value.push({
          name: nodeName,
          type: ["", "审核人", "抄送人"][type],
        });
      }
      reErr(childNode);
    } else if (type == 3) {
      reErr(childNode);
    } else if (type == 4) {
      reErr(childNode);
      for (var i = 0; i < conditionNodes.length; i++) {
        if (conditionNodes[i].error) {
          tipList.value.push({ name: conditionNodes[i].nodeName, type: "条件" });
        }
        reErr(conditionNodes[i]);
      }
    }
  } else {
    childNode = null;
  }
};

const saveSet = async () => {
  tipList.value = [];
  reErr(nodeConfig);
  if (tipList.value.length != 0) {
    tipVisible.value = true;
    return;
  }
  processConfig.value.nodeConfig = nodeConfig.value;
  emit("getNodeJson", JSON.stringify(processConfig.value));
};
const zoomSize = (type) => {
  if (type == 1) {
    if (nowVal.value == 50) {
      return;
    }
    nowVal.value -= 10;
  } else {
    if (nowVal.value == 300) {
      return;
    }
    nowVal.value += 10;
  }
};
</script>
<style>
@import "../css/workflow.css";
.error-modal-list {
  width: 455px;
}

.dingflow-design-body {
  position: absolute;
  top: -5px;
  right: -5px;
  bottom: -5px;
  left: -1px;
  z-index: 99;
  background: url("../images/bg.svg") 0 0 repeat;
  background-size: 11px;
  overflow: hidden;
}

.no-click {
  pointer-events: none;
}
</style>

