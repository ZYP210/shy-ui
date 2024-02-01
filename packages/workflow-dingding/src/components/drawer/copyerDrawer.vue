<template>
  <a-drawer
    v-model:visible="visible"
    class="set_copyer"
    :width="550"
    title="触发器"
    placement="right"
    @close="saveCopyer"
    :footer-style="{ textAlign: 'right' }"
  >
    <a-form ref="formRef">
      <a-space v-for="(item, index) in conditionList" style="display: flex; margin-bottom: 8px" align="baseline">
        <a-form-item label="类型">
          <a-select
            v-model:value="item.type"
            :options="typeList"
            style="width: 130px"
            placeholder="请选择类型"
          ></a-select>
        </a-form-item>

        <a-form-item label="值">
          <a-input v-model:value="item.value" placeholder="请输入值" />
        </a-form-item>
        <MinusCircleOutlined @click="removeSight(item)" class="icon" />
      </a-space>

      <a-form-item>
        <a-button type="dashed" block @click="addSight">
          <PlusOutlined />
          添加
        </a-button>
      </a-form-item>
    </a-form>

    <template #footer>
      <a-space>
        <a-button type="primary" @click="saveCopyer">确 定</a-button>
        <a-button @click="closeDrawer">取 消</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script setup>
import $func from "../../config/preload";
import { mapState, mapMutations } from "../../config/lib.js";
import { ref, watch, computed } from "vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

let copyerConfig = ref({});
let conditionList = ref([]);
let { copyerDrawer, copyerConfig1 } = mapState();

let visible = computed({
  get() {
    return copyerDrawer.value;
  },
  set() {
    closeDrawer();
  },
});
let { setCopyerConfig, setCopyer } = mapMutations();
watch(copyerConfig1, (val) => {
  copyerConfig.value = val.value;
  if (copyerConfig.value.conditionList && copyerConfig.value.conditionList.length > 0) {
    conditionList.value = [...copyerConfig.value.conditionList];
  } else {
    conditionList.value = [{ type: "class", name: "" }];
  }
});

const saveCopyer = () => {
  copyerConfig.value.conditionList = conditionList.value;
  setCopyerConfig({
    value: copyerConfig.value,
    flag: true,
    id: copyerConfig1.value.id,
  });
  closeDrawer();
};
const closeDrawer = () => {
  setCopyer(false);
};

const typeList = [
  {
    label: "类",
    value: "class",
  },
];

const removeSight = (item) => {
  let index = conditionList.value.indexOf(item);
  if (index !== -1) {
    conditionList.value.splice(index, 1);
  }
};

const addSight = () => {
  conditionList.value.push({
    type: typeList[0].value,
    value: "",
  });
};
</script>

<style lang="less">
.set_copyer {
  .copyer_content {
    padding: 20px 20px 0;

    .a-button {
      margin-bottom: 20px;
    }

    .a-checkbox {
      margin-bottom: 20px;
    }
  }
}
</style>
