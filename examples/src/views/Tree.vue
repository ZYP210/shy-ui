<template>
  <div class="w-full h-full p-16px">
    <div class="w-288px h-full">
      <BasicTree
        title="测试"
        addable
        :treeData="treeData"
        @plusClick="handleClick"
      >
        <template #action="item">
          <ShyTableAction :showCount="0" :actions="getActions(item)" />
        </template>
      </BasicTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BasicTree, TreeItem, ShyTableAction } from '3h1-ui'
import { ref } from 'vue'

const treeData = ref<TreeItem[]>(
  Array.from({ length: 100 }, (_, i) => {
    return {
      title: '77111111111111111111111111111111111111111111111111111111117',
      key: i,
      children: [
        {
          title: '999',
          key: `${i}-${i}`
        }
      ]
    }
  })
)

const handleClick = (...args) => {
  console.log(args, 777)
}

const handleRemove = (record) => {
  console.log(record, 'remove')
}

const getActions = (record) => {
  return [
    {
      label: 777,
      onClick: handleClick.bind(null, record)
    },
    {
      label: 888,
      popConfirm: {
        title: '确定删除吗？',
        confirm: handleRemove.bind(null, record)
      }
    }
  ]
}
</script>
