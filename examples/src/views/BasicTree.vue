<template>
  <div class="w-300px ml-200px mt-200px h-600px">
    <BasicTree :tree-data="treeData" title="123" @plus-click="handleClick" />
  </div>
</template>
<script lang="ts" setup>
import { BasicTree } from '3h1-ui'

const handleClick = () => {}

// 悬停图标
const actionList: any[] = [
  {
    label: '新增子节点',
    handler: () => {}
  },

  {
    label: '编辑',
    handler: () => {}
  },
  {
    label: '删除',
    handler: () => {}
  }
]

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' }
        ]
      }
    ]
  }
]
</script>
