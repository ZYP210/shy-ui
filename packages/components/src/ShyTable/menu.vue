<template>
  <div class="shy-menu">
    <div class="menu-left">
      <a-space align="center">
        <a-button type="primary" @click="addEvent">
          <template #icon>
            <plus-outlined />
          </template>
          新增
        </a-button>

        <a-button @click="removeEvent">
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
        <slot name="menuLeft"></slot>
      </a-space>
    </div>
    <div class="menu-right">
      <a-space>
        <slot name="menuRight"></slot>
        <a-button class="btn-setting">
          <template #icon>
            <setting-outlined :style="{ fontSize: '16px' }" />
          </template>
          <TooltipView />
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

import {
  Space as ASpace,
  Button as AButton,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Row as ARow,
  Col as ACol,
  Popconfirm as APopconfirm
} from 'ant-design-vue'
</script>

<style scoped>
.btn-setting {
  position: relative;
}
</style>
