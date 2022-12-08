<template>
  <ShyDialog
    ref="dialogRef"
    width="50vw"
    title="任务选择器"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <div class="user-select">
      <div class="tags-selected">
        <template v-for="(item, index) in tagList" :key="index">
          <Tag
            closable
            @close.prevent="closeEvent(item.id, item.type)"
            :color="item.color"
            >{{ item.name }}</Tag
          >
        </template>
      </div>

      <div class="user-body">
        <div class="tab-wrapper">
          <Tabs
            class="flex-tab"
            v-model:activeKey="activeKey"
            @change="activeChangeEvent"
          >
            <TabPane key="1" tab="组织架构"></TabPane>
            <TabPane key="2" tab="成员"></TabPane>
            <TabPane key="3" tab="组织"></TabPane>
          </Tabs>
          <Input
            class="flex-input"
            placeholder="搜索"
            @change="inputChangeEvent"
          ></Input>
        </div>

        <div class="user-wrapper">
          <div class="tree-select" v-if="activeKey === '1'">
            <div class="tree-item">
              <Tree
                :autoExpandParent="true"
                :tree-data="organization"
                v-model:selectedKeys="selectedKeys"
                @select="selectChangeEvent"
              >
              </Tree>
            </div>

            <CheckboxGroup class="tree-item" v-model:value="userSelected">
              <template v-for="(item, index) in userList" :key="index">
                <div class="tree-row">
                  <div>
                    {{ item.name }}
                  </div>
                  <Checkbox :value="item.id"></Checkbox>
                </div>
              </template>
            </CheckboxGroup>
          </div>
          <div class="all-user" v-else-if="activeKey === '2'">
            <CheckboxGroup v-model:value="allUserSelected">
              <template v-for="(item, index) in allUserList" :key="index">
                <div class="tree-row">
                  <div>
                    {{ item.name }}
                  </div>
                  <Checkbox :value="item.id"></Checkbox>
                </div>
              </template>
            </CheckboxGroup>
          </div>
          <div class="all-organization" v-else>
            <Tree
              :selectable="false"
              :autoExpandParent="true"
              checkable
              :tree-data="organization"
              v-model:checkedKeys="organizationChecked"
            >
            </Tree>
          </div>
        </div>
      </div>
    </div>
  </ShyDialog>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, nextTick } from 'vue'
import {
  Tabs,
  TabPane,
  Input,
  Tree,
  Tag,
  Checkbox,
  CheckboxGroup
} from 'ant-design-vue'
import ShyDialog from '../ShyDialog/indexView.vue'

interface Props {
  userFun: any
  deptFun: any
}

const props = withDefaults(defineProps<Props>(), {
  userFun: () => {
    return []
  },
  deptFun: () => {
    return [
      {
        title: '国营机械厂',
        key: '0-0',
        id: '0-0',

        children: []
      }
    ]
  }
})

// 加载数据
const activeKey = ref('1')
const inputChangeEvent = (value) => {}

// 格式化组织代码
const format = (list: any) => {
  let array
  array = list.map((item: any) => {
    const obj: { title?: string; key?: string; children?: any[] } = {}

    obj.title = item.deptName
    obj.key = item.id

    if (item.children) {
      obj.children = format(item.children)
    }
    return obj
  })

  return array
}

// 加载人物与组织函数
const loadKv = async () => {
  try {
    const res = await props.deptFun()
    organization.value = format(res)
    const res2 = await props.userFun()
    userList.value = res2
    allUserList.value = res2
  } catch (err) {
    console.log('err', err)
  }
}
loadKv()

const getOrganizationName = (list) => {
  let obj: any = {}
  list.forEach((item) => {
    obj[item.key] = item.title
    if (item.children) {
      let childrenObj = getOrganizationName(item.children)
      obj = { ...obj, ...childrenObj }
    }
  })

  return obj
}

const titleMap = computed(() => {
  const obj: any = {}

  allUserList.value.forEach((item: { id: string; name: string }) => {
    obj[item.id] = item.name
  })

  const organizationObj = getOrganizationName(organization.value)

  return { ...obj, ...organizationObj }
})

const activeChangeEvent = (value) => {
  console.log('value', value)
}

// 组织架构
const selectedKeys = ref([])
const userSelected = ref([])
const userList = ref<{ name: string; id: string }[]>([])
const organization = ref([])

const loadUser = async (deptId) => {
  try {
    const res = await props.userFun(deptId)
    userList.value = res
  } catch (err) {
    console.log('err', err)
  }
}
const selectChangeEvent = (value) => {
  const deptId = value[0]
  loadUser(deptId)
}

//成员
const allUserList = ref<{ name: string; id: string }[]>([])
const allUserSelected = ref<string[]>([])

//组织
const organizationChecked = ref([])

// 已选择tags
const tagList = ref<
  { id: string; color: string; type: 1 | 2 | 3; name: string }[]
>([])

const closeEvent = (id: string, type: 1 | 2 | 3) => {
  if (type === 1) {
    const index = userSelected.value.findIndex((item) => {
      return item === id
    })

    userSelected.value.splice(index, 1)
  } else if (type === 2) {
    const index = allUserSelected.value.findIndex((item) => {
      return item === id
    })

    allUserSelected.value.splice(index, 1)
  } else if (type === 3) {
    const index = organizationChecked.value.findIndex((item) => {
      return item === id
    })

    organizationChecked.value.splice(index, 1)
  }
}

watchEffect(() => {
  tagList.value = []

  userSelected.value.forEach((item) => {
    tagList.value.push({
      id: item,
      color: '#108ee9',
      type: 1,
      name: titleMap.value[item]
    })
  })

  allUserSelected.value.forEach((item) => {
    tagList.value.push({
      id: item,
      color: '#108ee9',
      type: 2,
      name: titleMap.value[item]
    })
  })

  organizationChecked.value.forEach((item) => {
    tagList.value.push({
      id: item,
      color: '#87d068',
      type: 3,

      name: titleMap.value[item]
    })
  })
})

// dialog 显示隐藏
const dialogRef = ref()
const open = () => {
  dialogRef.value.open()
}
const emit = defineEmits(['confirm', 'cancel'])

// 确定点击事件
const confirmEvent = ({ close }) => {
  emit('confirm', tagList.value)
  close()
}

// 取消点击事件
const cancelEvent = () => {
  resetFields()
  emit('cancel')
}

// 重置数据
const resetFields = () => {
  nextTick(() => {
    userSelected.value = []
    allUserSelected.value = []
    organizationChecked.value = []
  })
}
defineExpose({ open })
</script>

<style scoped lang="less">
.user-body {
  border: 1px solid #d9d9d9;
}

.tab-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 15px;

  &::v-deep(.ant-tabs-nav) {
    padding-left: 15px;
    margin-bottom: 0;
    border: none !important;

    &::before {
      border-color: #d9d9d9;
    }
  }

  .flex-tab {
    flex: auto;
  }

  .flex-input {
    position: absolute;
    right: 0;
    margin-right: 15px;
    width: 200px;
  }
}

.user-wrapper {
  .tree-select {
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    .tree-item {
      flex: 1 1 0 !important;
      overflow: hidden;
      box-sizing: border-box;

      .tree-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &:first-child {
        border-right: 1px solid #d9d9d9;
        padding: 10px 15px;
      }

      &:last-child {
        padding: 10px 15px;
      }
    }
  }
}

.all-user {
  padding: 15px;

  &::v-deep(.ant-checkbox-group) {
    width: 100%;
  }

  .tree-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.all-organization {
  padding: 15px;
}

.tags-selected {
  overflow: auto;
  padding: 8px;
  margin-bottom: 15px;
  height: 150px;
  border: 1px solid #d9d9d9;
}
</style>
