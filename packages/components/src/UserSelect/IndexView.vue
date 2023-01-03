<template>
  <BasicModal
    @register="registerModal"
    :width="600"
    title="任务选择器"
    ok-text="确认"
    cancel-text="取消"
    @ok="confirmEvent"
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
              v-if="
                tabType === 'user' || tabType === 'all' || tabType === 'other'
              "
              key="1"
              tab="组织架构"
            ></TabPane>
            <TabPane
              v-if="
                tabType === 'user' || tabType === 'all' || tabType === 'other'
              "
              key="2"
              tab="成员"
            ></TabPane>
            <TabPane
              v-if="
                tabType === 'org' || tabType === 'all' || tabType === 'other'
              "
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
            <div class="tree-item relative">
              <div class="spin" v-if="spinning">
                <Spin />
              </div>
              <template v-if="props.selectType === 'single'">
                <template v-if="userList.length === 0">
                  <Empty />
                </template>
                <template v-else v-for="(item, index) in userList" :key="index">
                  <CheckboxGroup
                    class="w-100"
                    v-model:value="userSelected"
                    @change="checkUserSingleEvent"
                  >
                    <div class="tree-row">
                      <div @click="checkClickEvent(item.id)">
                        {{ item.name }}
                      </div>
                      <Checkbox v-model:value="item.id"></Checkbox>
                    </div>
                  </CheckboxGroup>
                </template>
              </template>

              <template v-else>
                <Empty v-if="userList.length === 0" />

                <template v-else v-for="(item, index) in userList" :key="index">
                  <div class="tree-row">
                    <div @click="checkClickEvent(item.id)">
                      {{ item.name }}
                    </div>
                    <Checkbox v-model:checked="checkMap[item.id]"></Checkbox>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <div class="all-user" v-else-if="activeKey === '2'">
            <div class="spin" v-if="spinning">
              <Spin />
            </div>
            <template v-if="props.selectType === 'single'">
              <Empty v-if="userList.length === 0" />
              <template v-else>
                <template v-for="(item, index) in userList" :key="index">
                  <CheckboxGroup
                    v-model:value="userSelected"
                    @change="checkUserSingleEvent"
                  >
                    <div class="tree-row">
                      <div
                        style="cursor: pointer"
                        @click="checkClickEvent(item.id)"
                      >
                        {{ item.name }}
                      </div>
                      <Checkbox v-model:value="item.id"></Checkbox>
                    </div>
                  </CheckboxGroup>
                </template>
              </template>
            </template>
            <template v-else>
              <Empty v-if="userList.length === 0" />

              <template v-else>
                <template v-for="(item, index) in userList" :key="index">
                  <div class="tree-row">
                    <div
                      style="cursor: pointer"
                      @click="checkClickEvent(item.id)"
                    >
                      {{ item.name }}
                    </div>
                    <Checkbox v-model:checked="checkMap[item.id]"></Checkbox>
                  </div>
                </template>
              </template>
            </template>
          </div>
          <div class="all-organization" v-else>
            <Tree
              v-if="props.selectType === 'single'"
              :selectable="false"
              :autoExpandParent="true"
              checkable
              :tree-data="organization"
              v-model:checkedKeys="singleCheckedKeys"
              :checkStrictly="true"
              @check="checkSingleEvent"
            >
            </Tree>
            <Tree
              v-else
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
  </BasicModal>
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
  CheckboxGroup,
  Spin,
  Empty
} from 'ant-design-vue'
import ShyDialog from '../ShyDialog/indexView.vue'
import { BasicModal, useModal } from '../Modal/'

interface Props {
  userFun: any // 人物请求函数
  deptFun: any // 不猛请求函数
  type?: 'user' | 'org' | 'all' // 类别 人物选择 组织选择 全部选择
  selectType?: 'single' | 'multiple' // 单选/多选
}

const spinning = ref(false)

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
  type: 'all',
  selectType: 'multiple'
})

// 加载数据
const activeKey = ref('1')
//
const tabType = ref()
watch(
  () => props.type,
  (value) => {
    if (value === 'all' || value === 'user') {
      activeKey.value = '1'
    } else if (value === 'org') {
      activeKey.value = '3'
    } else {
      activeKey.value = '1'
    }

    if (value === 'all' || value === 'user' || value === 'org') {
      tabType.value = value
    } else {
      tabType.value = 'other'
    }
  },
  { immediate: true }
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
    spinning.value = true
    const res = await props.deptFun()
    organization.value = format(res)
    const res2 = await props.userFun()
    userList.value = res2
    allUserList.value = res2

    res2.forEach((user) => {
      checkMap[user.id] = false
    })
    spinning.value = false
  } catch (err) {
    console.log('err', err)
    spinning.value = false
  }
}

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
const userList = ref<{ name: string; id: string }[]>([])
const organization = ref([])
const checkMap = reactive({})
const lastSelected = ref([])

const loadUser = async (deptId = undefined, realName = undefined) => {
  try {
    spinning.value = true
    const res = await props.userFun(deptId, realName)
    userList.value = res
    spinning.value = false
  } catch (err) {
    spinning.value = false
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

const checkClickEvent = (id) => {
  if (props.selectType === 'single') {
    nextTick(() => {
      singleCheckedKeys.value.checked = []
    })
    if (id === userSelected.value[0]) {
      userSelected.value = []
    } else {
      userSelected.value = [id]
    }
    curKey.value = userSelected.value
  } else {
    checkMap[id] = !checkMap[id]
  }
}

//全部成员
const allUserList = ref<{ name: string; id: string }[]>([])
const allUserSelected = ref<string[]>([])

//组织
const organizationChecked = ref<any>([])

// 人物单选
const userSelected = ref([])
// 选中的组织
const singleCheckedKeys = ref<any>({ checked: [] })

// 当前key
const curKey = ref([])

// 组织选择
const checkSingleEvent = (keys, { checked, node }) => {
  nextTick(() => {
    userSelected.value = []
  })
  if (checked) {
    singleCheckedKeys.value.checked = [node.key]

    curKey.value = singleCheckedKeys.value.checked
  }
}

// 人物
const checkUserSingleEvent = (value) => {
  nextTick(() => {
    singleCheckedKeys.value.checked = []
  })

  curKey.value = userSelected.value
}

// 已选择tags
const tagList = ref<
  { id: string; color: string; type: 1 | 2 | 3; name: string }[]
>([])

const closeEvent = (id: string, type: 1 | 2 | 3) => {
  if (props.selectType === 'single') {
    nextTick(() => {
      userSelected.value = []
      curKey.value = []
      singleCheckedKeys.value.checked = []
    })
  } else {
    if (type === 1) {
      checkMap[id] = false
    } else if (type === 3) {
      const index = organizationChecked.value.findIndex((item) => {
        return item === id
      })

      organizationChecked.value.splice(index, 1)
    }
  }
}

// 根据 checkMap organizationChecked selectType 修改tagList
watchEffect(() => {
  tagList.value = []
  if (props.selectType === 'multiple') {
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
  } else {
    curKey.value.forEach((item) => {
      tagList.value.push({
        id: item,
        color: '#87d068',
        type: 1,
        name: titleMap.value[item]
      })
    })
  }
})

// dialog 显示隐藏
const [registerModal, { openModal }] = useModal()

const dialogRef = ref()
const open = () => {
  // dialogRef.value.open()
  loadKv()

  openModal(true, {})
}
const emit = defineEmits(['confirm', 'cancel'])

// 确定点击事件
const confirmEvent = () => {
  emit('confirm', tagList.value)
  openModal(false)
  cancelEvent()
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
    userSelected.value = []
    singleCheckedKeys.value.checked = []
    curKey.value = []
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
        cursor: pointer;
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

.w-100 {
  width: 100%;
}

.spin {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 4px;
}

.relative {
  position: relative;
}
</style>
