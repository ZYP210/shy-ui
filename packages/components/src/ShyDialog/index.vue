<template>
  <a-modal
    :width="modalOption.width"
    v-model:visible="visible"
    :title="modalOption.title"
    :maskClosable="modalOption.maskClosable"
    :footer="modalOption.footer"
    :getContainer="getContainer"
    @cancel="handleCancel"
  >
    <a-spin tip="数据加载中..." :spinning="spinningShow" :delay="500">
      <div class="common-dialog-main">
        <slot name="content"></slot>
      </div>
    </a-spin>

    <template #footer>
      <div class="footer-main">
        <slot name="footer">
          <a-button v-if="modalOption.type !== 'view'" key="submit" type="primary" :loading="confirmLoading" @click="handleOk">
            <template #icon><check-circle-outlined /></template>提 交</a-button
          >
        </slot>
        <a-button key="back" @click="handleCancel">
          <template #icon><close-circle-outlined /></template>取 消</a-button
        >
      </div>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { watch, reactive, defineExpose, ref } from "vue";
const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {};
    },
  },
  apiErrorCode: {
    type: Number,
    default: 0,
  },
});
const spinningShow = ref(false);

const getContainer = () => {
  return document.getElementById("fullScreenContent");
};

let modalOption = reactive({
  type: "add",
  title: "新增",
  width: "60%",
  maskClosable: false,
  footer: undefined,
});

watch(
  () => props.option,
  (newVal) => {
    Object.assign(modalOption, newVal);
  },
  {
    deep: true,
    immediate: true,
  }
);

//监听接口最外层状态码不等于200
watch(
  () => props.apiErrorCode,
  (newVal) => {
    if (newVal > 0) {
      confirmLoading.value = false;
    }
  }
);

const visible = ref<boolean>(false);
const contentRef = ref(null);
const confirmLoading = ref<boolean>(false);
defineExpose({
  visible,
  spinningShow,
  contentRef,
});

const handleOk = async () => {
  emit("submitHandler", {
    begin: () => {
      confirmLoading.value = true;
    },
    done: () => {
      handleCancel();
    },
    hiatus: () => {
      confirmLoading.value = false;
    },
  });
};

const handleCancel = () => {
  visible.value = false;
  spinningShow.value = false;
  formStore.clearForm();
  confirmLoading.value = false;
  emit("dialogClosed");
};

const emit = defineEmits(["submitHandler", "dialogClosed"]);
</script>

<style lang="less" scoped>
.common-dialog-main {
  width: 100%;
  min-height: 100px;
}
.footer-main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
