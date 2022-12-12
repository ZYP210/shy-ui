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
            <TabPane
              v-if="props.type === 'user' || props.type === 'all'"
              key="1"
              tab="组织架构"
            ></TabPane>
            <TabPane
              v-if="props.type === 'user' || props.type === 'all'"
              key="2"
              tab="成员"
            ></TabPane>
            <TabPane
              v-if="props.type === 'org' || props.type === 'all'"
              key="3"
              tab="组织"
            ></TabPane>
          </Tabs>
          <Input
            v-if="activeKey !== '3'"
            class="flex-input"
            placeholder="搜索"
            v-model:value="userName"
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
            <div class="tree-item">
              <template v-for="(item, index) in userList" :key="index">
                <div class="tree-row">
                  <div>
                    {{ item.name }}
                  </div>
                  <Checkbox v-model:checked="checkMap[item.id]"></Checkbox>
                </div>
              </template>
            </div>
          </div>
          <div class="all-user" v-else-if="activeKey === '2'">
            <template v-for="(item, index) in userList" :key="index">
              <div class="tree-row">
                <div>
                  {{ item.name }}
                </div>
                <Checkbox v-model:checked="checkMap[item.id]"></Checkbox>
              </div>
            </template>
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
import { ref, watchEffect, computed, nextTick, watch, reactive } from 'vue'
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
  type?: 'user' | 'org' | 'all'
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
  },
  type: 'all'
})

// 加载数据
const activeKey = ref('1')
//
watch(
  () => props.type,
  (value) => {
    if (value === 'all' || value === 'user') {
      activeKey.value = '1'
    } else if (value === 'org') {
      activeKey.value = '3'
    }
  }
)

const userName = ref('')

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

    res2.forEach((user) => {
      checkMap[user.id] = false
    })
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
  if (value === '1') {
    loadUser(selectedKeys.value[0], userName.value)
  }
  if (value === '2') {
    // selectedKeys.value = []
    loadUser(undefined, userName.value)
  }
}

// 组织架构
const selectedKeys = ref([])
const userSelected = ref([])
const userList = ref<{ name: string; id: string }[]>([])
const organization = ref([])
const checkMap = reactive({})

const loadUser = async (deptId = undefined, realName = undefined) => {
  try {
    const res = await props.userFun(deptId, realName)
    userList.value = res
  } catch (err) {
    console.log('err', err)
  }
}
const selectChangeEvent = (value) => {
  const deptId = value[0]
  loadUser(deptId, userName.value)
}
const inputChangeEvent = () => {
  if (activeKey.value === '2') {
    loadUser(undefined, userName.value)
  } else {
    loadUser(selectedKeys.value[0], userName.value)
  }
}

//全部成员
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
    checkMap[id] = false
  } else if (type === 2) {
    console.log('2标记')
  } else if (type === 3) {
    const index = organizationChecked.value.findIndex((item) => {
      return item === id
    })

    organizationChecked.value.splice(index, 1)
  }
}

// 根据 checkMap organizationChecked 修改tagList
watchEffect(() => {
  tagList.value = []

  Object.keys(checkMap).forEach((key) => {
    if (checkMap[key]) {
      tagList.value.push({
        id: key,
        color: '#108ee9',
        type: 1,
        name: titleMap.value[key]
      })
    }
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
    organizationChecked.value = []
    Object.keys(checkMap).forEach((key) => {
      checkMap[key] = false
    })
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
  overflow: auto;
  height: 300px;

  .tree-select {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    height: 300px;

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
  height: 80px;
  border: 1px solid #d9d9d9;
}
</style>
