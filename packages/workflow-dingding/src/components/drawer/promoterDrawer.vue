<template>
  <a-drawer
    v-model:visible="visible"
    class="set_promoter"
    :width="550"
    title="发起人"
    placement="right"
    @close="savePromoter"
    :footer-style="{ textAlign: 'right' }"
    :destroyOnClose="true"
  >
    <div class="btn-group">
      <a-radio-group v-model:value="type">
        <a-radio-button class="btn" value="2">设置字段权限</a-radio-button>
      </a-radio-group>
    </div>
    <template v-if="type==2"> <AuthorityTable v-model:fieldPermissions="fieldPermissions" /> </template>
    <!-- <template #footer>
      <a-space>
        <a-button type="primary" @click="savePromoter">确 定</a-button>
        <a-button @click="closeDrawer">取 消</a-button>
      </a-space>
    </template> -->
  </a-drawer>
</template>
<script setup>
import { mapState, mapMutations } from "../../config/lib";
import { computed } from "vue";
import AuthorityTable from "./authorityTable.vue";
const { types } = mapState();
const filterOption = (inputValue, option) => {
  return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
};
const type = ref("2");
let { promoterDrawer, flowPermission1} = mapState();
let visible = computed({
  get() {
    type.value = "2";
    return promoterDrawer.value;
  },
  set() {
    closeDrawer();
  },
});
const fieldPermissions = ref([]);
watch(flowPermission1, (val) => {
  fieldPermissions.value = val.fieldPermissions;
});

const { setPromoter, setFlowPermission } = mapMutations();
const savePromoter = () => {
  setFlowPermission({
    flag: true,
    id: flowPermission1.value.id,
    fieldPermissions: fieldPermissions.value,
  });
  closeDrawer();
};

const closeDrawer = () => {
  setPromoter(false);
};
</script>
<style lang="less" scoped>
.icon {
  font-size: 18px;
}
.tips {
  color: #8c8c8c;
}
.btn {
  &-group {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  width: 200px;
  text-align: center;
}

.form {
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
}

.list {
  display: flex;
  flex-direction: column;

  &-col {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  &-row {
    margin: 5px 8px;
    float: left;
    line-height: 26px;
    padding: 0 12px;
    border-radius: 4px;
    border: 1px solid #cbcfd3;
    color: #66f;
    background-color: #fff;
  }
}
</style>

