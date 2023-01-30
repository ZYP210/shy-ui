<template>
  <div class="p-4">
    <BasicTable
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="data"
      :canResize="true"
      :loading="false"
      :striped="true"
      :bordered="true"
      :pagination="{ pageSize: 20 }"
    >
      <template #toolbar>
        <a-button type="primary"> 操作按钮 </a-button>
      </template>
    </BasicTable>
    <BasicModal
      cancel-text="取消"
      ok-text="确定"
      :loading="false"
      :visible="true"
      title="999"
      :maskClosable="false"
      :width="600"
    >
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { BasicTable } from '3h1-ui'
import { useModal, BasicModal } from '3h1-ui'

const columns = [
  {
    title: '123',
    dataIndex: 'a'
  }
]

const data = [{ a: 1 }]
</script>
