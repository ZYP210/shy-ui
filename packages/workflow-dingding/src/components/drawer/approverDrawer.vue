<template>
  <Drawer
    v-model:visible="visible"
    class="set_promoter"
    :width="550"
    title="审批人设置"
    placement="right"
    @close="saveApprover"
    :destroyOnClose="true"
    :footer-style="{ textAlign: 'right' }"
  >
    <div class="btn-group">
      <RadioGroup v-model:value="type">
        <RadioButton class="btn" value="1">审核人</RadioButton>
        <RadioButton class="btn" value="2">设置字段权限</RadioButton>
      </RadioGroup>
    </div>

    <template v-if="type === '1'">
      <Form class="form" ref="formRef" name="dynamic_form_nest_item">
        <FormItem>
          <span class="tips">选择能发起该审批的人员/部门，不选则默认开放给所有人</span>
        </FormItem>
        <Space v-for="(item, index) in approvalList" style="display: flex; margin-bottom: 8px" align="baseline">
          <FormItem label="类型">
            <Select
              v-model:value="item.type"
              :options="approveTypes"
              style="width: 130px"
              placeholder="请选择类型"
              @change="selectChange($event,item)"
            ></Select>
          </FormItem>

          <FormItem label="值">
            <Select
              v-if="!ruleTypeDic[item.type]?.component"
              v-model:value="item.options"
              mode="multiple"
              style="width: 200px"
              placeholder="请选择"
              :options="getOptions(item.type)"
              :labelInValue="true"
              :fieldNames="ruleTypeDic[item.type]?.fieldNames"
              treeCheckStrictly
              :show-checked-strategy="TreeSelect.SHOW_ALL"
              :filter-option="filterOption"
              @change="valueChange($event,item)"
            ></Select>
            <TreeSelect
              v-if="ruleTypeDic[item.type]?.component"
              v-model:value="item.options"
              style="width: 200px"
              :tree-data="getOptions(item.type)"
              tree-checkable
              allow-clear
              placeholder="请选择"
              :labelInValue="true"
              :fieldNames="ruleTypeDic[item.type]?.fieldNames"
              treeCheckStrictly
              :show-checked-strategy="TreeSelect.SHOW_ALL"
              tree-node-filter-prop="deptName"
              @change="valueChange($event,item)"
            />
          </FormItem>
          <!-- <MinusCircleOutlined @click="removeSight(item)" class="icon" /> -->
        </Space>

        <!-- <a-form-item v-if="approvalList.length < 3">
          <a-button type="dashed" block @click="addSight">
            <PlusOutlined />
            添加
          </a-button>
        </a-form-item> -->
      </Form>

      <div class="list" v-if="approvalList[0] && approvalList[0].type">
        <div class="list-col" v-for="node in approvalList">
          {{ approveTypes.find((type) => node.type == type.value)?.label }}：
          <span class="list-row" v-for="value in node.options"> {{ getOptionsLabel(node.type,value) }}</span>
        </div>
      </div>
    </template>

    <template v-else>
      <AuthorityTable v-model:fieldPermissions="fieldPermissions" :options="authorityTableOptions" />
    </template>

    <!-- <template #footer>
      <a-space>
        <a-button type="primary" @click="saveApprover">确 定</a-button>
        <a-button @click="closeDrawer">取 消</a-button>
      </a-space>
    </template> -->
  </Drawer>
</template>

<script setup>
import { mapState, mapMutations } from "../../config/lib";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { computed, ref, watch } from "vue";
import { TreeSelect,Drawer,RadioButton,RadioGroup,Form,FormItem,Input,Select,Button,Space } from "ant-design-vue";
import AuthorityTable from "./authorityTable.vue";
import $func from "../../config/preload";
let emits = defineEmits(["update:nodeConfig"]);
const ruleTypeDic = $func.getRuleTypeDic();
const type = ref("1");

const authorityTableOptions = computed(() => {
  if (+approverConfig.value.type === 2) {
    return { columns: ["operate", "readonly", "hidden"] };
  } else {
    return { columns: ["readonly", "hidden"] };
  }
});
const getOptions = (type) => {
  return type ? ruleTypeDic[type].options.value : [];
  
 }
const getOptionsLabel = (type, value) => { 
 
  const options = ruleTypeDic[type]?.options ?? [];
  const fieldNames = ruleTypeDic[type].fieldNames;
  const result = $func.findTreeNode(options.value, (node) => { return node[ fieldNames?.value || 'value'] == value })
  return result[fieldNames?.label || 'label'];
}


const filterOption = (inputValue, option) => {
  return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
};

const approvalList = ref([]);

const formRef = ref();

const removeSight = (item) => {
  let index = approvalList.value.indexOf(item);
  if (index !== -1) {
    approvalList.value.splice(index, 1);
  }
};

// const addSight = () => {
//   const list = typeList.reduce((pre, { label, value }) => {
//     if (unref(approvalList).findIndex((item) => item.type === value) === -1) {
//       pre.push(value);
//     }
//     return pre;
//   }, []);
//   approvalList.value.push({
//     type: list[0],
//     name: [],
//   });
// };

const selectChange = (value, form) => {
  form.options = [];
};
const valueChange = (value, form) => { 
  form.options = value.map(ele => ele.value);
}
let approverConfig = ref({});
let { approverConfig1, approverDrawer, users, roles, depts,types:approveTypes,posts,userGroups,scripts } = mapState();

let visible = computed({
  get() {
    return approverDrawer.value;
  },
  set() {
    closeDrawer();
  },
});

const fieldPermissions = ref([]);

watch(approverConfig1, (val) => {
  fieldPermissions.value = val.value.fieldPermissions;
  if (val.value?.approvalList?.length > 0) {
    approvalList.value = val.value.approvalList
  } else {
    approvalList.value = [{ type: null, options: [], name: '' }];
  }
  approverConfig.value = val.value;
 
});

let { setApproverConfig, setApprover } = mapMutations();

const saveApprover = () => {
  if (approvalList.value.length > 0) {
    approverConfig.value.approvalList = [...approvalList.value];
  }
  const obj={
    value: { ...approverConfig.value, fieldPermissions: fieldPermissions.value },
    flag: true,
    id: approverConfig1.value.id,
  }
  setApproverConfig(obj);
  closeDrawer();
};

const closeDrawer = () => {
  setApprover(false);
};
</script>
<style lang="less" scoped>
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

