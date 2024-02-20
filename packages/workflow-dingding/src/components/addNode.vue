<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <Popover v-model="visible" placement="right" v-if="!isLook">
        <template #content>
          <ul class="node-select">
            <li @click="addType(2)" v-if="hasNode(2)">
              <team-outlined class="icon" style="color: rgb(255, 148, 62)" />
              <span class="title">审批人</span>
            </li>
            <li @click="addType(5)" v-if="hasNode(5)">
              <share-alt-outlined class="icon" style="color: rgb(21, 188, 131)"></share-alt-outlined>
              <span class="title">条件分支</span>
            </li>
          </ul>
        </template>
        <button class="btn" type="button">
          <plus-outlined class="iconfont" />
        </button>
      </Popover>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import {
  TeamOutlined,
  PlusOutlined,
  ShareAltOutlined,
  ControlOutlined,
  SendOutlined,
  FieldTimeOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";
import { mapState } from "../config/lib.js";
import $func from "../config/preload";
import { ref ,defineProps, defineEmits} from "vue";
import { Popover} from "ant-design-vue";
let props = defineProps({
  childNodeP: {
    type: Object,
    default: () => null,
  },
});
const emits = defineEmits(["update:childNodeP"]);

const { nodeList, isLook } = mapState();

const hasNode = computed(() => {
  return (type) => {
    return nodeList.value.some((item) => item === type);
  };
});

let visible = ref(false);
const addType = (type) => {
  visible.value = false;
  if (type === 2) {    
    emits("update:childNodeP", {
      nodeName: "审核人",
      type: 2,
      examineMode: "",
      noHanderAction: "",
      childNode: props.childNodeP,
      approvalList: [],
      id:$func.buildShortUUID('userTask_')
    });
  }  else if (type === 5) {
    emits("update:childNodeP", {
      nodeName: "条件分支",
      type: 5,
      childNode: null,
      conditionNodes: [
        {
          nodeName: "条件1",
          type: 4,
          priorityLevel: 1,
          expression: '',
          childNode: props.childNodeP,
        },
        {
          nodeName: "条件2",
          type: 4,
          priorityLevel: 2,
          expression: '',
          childNode: null,
        },
      ],
    });
  } else if (type === 3) {
    emits("update:childNodeP", {
      nodeName: "触发器",
      type: 3,
      childNode: props.childNodeP,
      conditionList: [],
    });
  }
};
</script>
<style scoped lang="less">
.node-select {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // grid-template-rows: repeat(3, 1fr);
  width: 300px;
  padding-left: 0px;
  li {
    display: inline-block;
    margin: 5px 5px;
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #f8f9f9;
    background-color: #f8f9f9;
    border-radius: 10px;
    width: 130px;
    position: relative;
    .title {
      position: absolute;
      left: 65px;
      top: 18px;
    }
    &:hover {
      background-color: #fff;
      box-shadow: 0 0 8px 2px #d6d6d6;
    }
    .icon {
      font-size: 25px;
      padding: 5px;
      border: 1px solid #dedfdf;
      border-radius: 14px;
    }
  }
}
.add-node-btn-box {
  width: 240px !important;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }
  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 20px 0 32px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    flex-grow: 1;
    .btn {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      width: 30px;
      height: 30px;
      background: #3296fa;
      border-radius: 50%;
      position: relative;
      border: none;
      line-height: 30px;
      -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        color: #fff;
        font-size: 20px;
      }
      &:hover {
        transform: scale(1.3);
        box-shadow: 0 13px 27px 0 rgba(0, 0, 0, 0.1);
      }
      &:active {
        transform: none;
        background: #1e83e9;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>

