<template>
  <div class="shy-search">
    <a-row>
      <a-col :span="18">
        <ShyForm v-model="form" :column="currentColumn" />
      </a-col>
      <a-col :span="6">
        <div class="button-wrapper">
          <a-button class="button-search" type="primary">
            查询
            <template #icon>
              <search-outlined />
            </template>
          </a-button>
          <a-button>
            <template #icon>
              <clear-outlined />
            </template>
            重置
          </a-button>
        </div>
      </a-col>
    </a-row>

    <div class="expand-line">
      <div v-if="isExpandFlag" class="expand-flag" @click="expandEvent">
        <up-outlined :style="iconStyle" v-if="isExpanded" />
        <down-outlined :style="iconStyle" v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { computed } from 'vue'
import ShyForm from '../ShyForm/IndexView.vue'
import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  ClearOutlined
} from '@ant-design/icons-vue'

interface Props {
  column: { label: string; span?: number }[]
}
const props = withDefaults(defineProps<Props>(), { column: () => [] })
const form = reactive({})

// 切换展示收缩
// 搜索列
const searchColumn = computed(() => {
  return props.column.map((item) => {
    item.span = 8
    return item
  })
})
const baseColumn = computed(() => {
  return searchColumn.value.length >= 3
    ? searchColumn.value.slice(0, 3)
    : searchColumn.value
})
const currentColumn = ref()
const isExpanded = ref(false)
const expandEvent = () => {
  isExpanded.value = !isExpanded.value
}
watchEffect(() => {
  if (isExpanded.value) {
    currentColumn.value = searchColumn.value
  } else {
    currentColumn.value = baseColumn.value
  }
})
//
const isExpandFlag = computed(() => {
  return searchColumn.value.length >= 3 ? true : false
})
const iconStyle = {
  fontSize: '7px',
  color: '#919191'
}
</script>

<style scoped lang="less">
@import url('../style/var.less');

.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
}

.button-search {
  margin-right: 15px;
}

.shy-search {
  padding: 15px 0;

  &::v-deep(.ant-form-item) {
    margin-bottom: 15px;
  }
}

.expand-line {
  position: relative;
  margin-top: 5px;
  height: 1px;
  background-color: #f0f0f0;
}

.expand-flag {
  position: absolute;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 32px;
  height: 12px;
  text-align: center;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  transform: translate(-50%, -50%);
  cursor: pointer;

  &:hover {
    border-color: @primary-color;
  }
}
</style>
