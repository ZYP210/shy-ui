<template>
  <a-row class="shy-table-menu">
    <!-- 查看按钮 -->
    <a-col :order="btnOption.viewOrder" v-if="!btnOption.viewHide">
      <a-button type="link" @click="menuHanlder('view')"> <EyeOutlined />{{ btnOption.viewText }} </a-button>
    </a-col>
    <!-- 修改按钮 -->
    <a-col :order="btnOption.editOrder" v-if="!btnOption.editHide">
      <a-button type="link" @click="menuHanlder('edit')"> <FormOutlined />{{ btnOption.editText }} </a-button>
      <!-- 删除按钮 -->
    </a-col>
    <a-col :order="btnOption.delOrder" v-if="!btnOption.delHide && totalBtnLength <= 3">
      <a-popconfirm title="是否删除选中数据？" ok-text="确认" cancel-text="取消" @confirm="menuHanlder('del')">
        <template #icon>
          <question-circle-outlined style="color: red" />
        </template>
        <a-button type="link" danger>
          <DeleteOutlined />
          {{ btnOption.delText }}
        </a-button>
      </a-popconfirm>
    </a-col>
    <a-col v-for="(node, i) in noMoreBtn" :key="i">
      <btnVNode :node="node"></btnVNode>
    </a-col>
    <!-- 更多菜单 -->
    <a-col :order="10" v-if="moreShow">
      <a-dropdown>
        <a class="menu-dropdown-link" @click.prevent>
          更多
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-if="!btnOption.delHide && totalBtnLength > 3">
              <a-popconfirm title="是否删除选中数据？" ok-text="确认" cancel-text="取消" @confirm="menuHanlder('del')">
                <template #icon>
                  <question-circle-outlined style="color: red" />
                </template>
                <a-button type="link" danger>
                  <DeleteOutlined />
                  {{ btnOption.delText }}
                </a-button>
              </a-popconfirm>
              <a-menu-divider />
            </a-menu-item>
            <a-menu-item v-for="(node, i) in moreBtn" :key="i">
              <btnVNode :node="node"></btnVNode>
              <a-menu-divider />
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-col>
    <!-- 传进来后重新处理显示 -->
    <template>
      <!-- 外部按钮插槽 -->
      <slot name="default"></slot>
    </template>
  </a-row>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, reactive, watch, onMounted } from "vue";
import btnVNode from "./getNode";
const { proxy } = getCurrentInstance();

const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const btnLimit = 3;
let moreShow = ref(false);
let defaultBtnLength = ref(3);
let slotBtnLength = ref(0);
let totalBtnLength = ref(0);
let noMoreBtn = reactive([]);
let moreBtn = reactive([]);
//按钮初始值
const btnOption = reactive({
  viewHide: false,
  viewText: "查看",
  viewOrder: 1,
  editHide: false,
  editText: "修改",
  editOrder: 2,
  delHide: false,
  delText: "删除",
  delOrder: 3,
});

watch(
  () => props.option,
  (newVal) => {
    Object.assign(btnOption, newVal);
  },
  {
    immediate: true,
  }
);

//抛出点击事件
const emit = defineEmits(["menuHanlder"]);
const menuHanlder = (type: string) => {
  emit("menuHanlder", type);
};

//判断全部按钮数量
const judgeLength = (slotLength: number) => {
  if (btnOption.viewHide) {
    defaultBtnLength.value--;
  }
  if (btnOption.editHide) {
    defaultBtnLength.value--;
  }
  if (btnOption.delHide) {
    defaultBtnLength.value--;
  }
  slotBtnLength.value = slotLength;
  totalBtnLength.value = slotBtnLength.value + defaultBtnLength.value;
};

//控制节点
const colNode = (slotBtn: Array<any>) => {
  //判断外部传入slotBtn
  if (slotBtn.length > 0) {
    if (totalBtnLength.value <= btnLimit) {
      moreShow.value = false;
      noMoreBtn.push(...slotBtn);
    } else {
      if (defaultBtnLength.value == 2) {
        moreBtn.push(...slotBtn);
      } else {
        noMoreBtn.push(...slotBtn.slice(0, btnLimit - defaultBtnLength.value));
        moreBtn.push(...slotBtn.slice(btnLimit - defaultBtnLength.value));
      }
      moreShow.value = true;
    }
  }
};

onMounted(() => {
  if (proxy.$slots.default) {
    judgeLength(proxy.$slots.default().length);
    colNode(proxy.$slots?.default());
  } else {
    judgeLength(0);
    colNode([]);
  }
});
</script>

<style lang="less" scoped>
.shy-table-menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-dropdown-link {
  line-height: 32px;
  font-size: 14px;
}
</style>
