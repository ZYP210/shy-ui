<template>
  <div class="button-group">
    <!-- <a-space> </a-space> -->
    <div class="flex-button">
      <template v-for="(button, index) in baseButtonList" :key="index">
        <a-popconfirm title="确认删除" ok-text="确认" cancel-text="取消">
          <div class="button-item" @click="clickEvent(button.dataIndex)">
            <span :style="setStyle(button.dataIndex)">
              {{ button.title }}
            </span>
          </div>
        </a-popconfirm>

        <minus-outlined class="split-line" v-if="index < 2" />
      </template>

      <a-dropdown v-if="props.data.length > 3">
        <a class="ant-dropdown-link" @click.prevent>
          更多
          <down-outlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { DownOutlined, MinusOutlined } from '@ant-design/icons-vue'

interface Props {
  data: {
    title: string
    dataIndex: string
  }[]
}
const props = withDefaults(defineProps<Props>(), {})

const baseButtonList = ref()
const hideButtonList = ref()

watchEffect(() => {
  baseButtonList.value =
    props.data.length > 2 ? props.data.slice(0, 3) : props.data
  hideButtonList.value = props.data.slice(4)
})

const setStyle = (dataIndex: string) => {
  if (dataIndex === 'del') {
    return {
      color: 'red'
    }
  }
}

const emit = defineEmits(['click-event'])

const clickEvent = (dataIndex: string) => {
  emit('click-event', dataIndex)
}
</script>

<style scoped lang="less">
@import url('../style/var.less');

.flex-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-item {
  cursor: pointer;
  color: @primary-color;
}

.split-line {
  // margin: 0 5px;
  // width: 1px;
  // height: 16px;
  // background: @primary-color;
  // box-sizing: border-box;
  // flex: none;
  transform: rotate(90deg);
}
</style>
