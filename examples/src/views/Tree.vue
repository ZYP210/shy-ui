<template>
  <div class="w-full h-full p-16px">
    {{ searchValue }}
    <Input v-model:value="searchValue" />
    <div class="w-288px h-full">
      <BasicTree
        :treeData="treeData"
        @plusClick="handleClick"
        :filter-fn="() => true"
        :search="false"
        title="777"
      >
        <template #appendHeader>
          <BasicButton type="primary">搜索</BasicButton>
        </template>
        <!-- <template #searchExtra>
          <BasicButton type="primary">搜索</BasicButton>
        </template>
        <template #action="item">
          <ShyTableAction :showCount="0" :actions="getActions(item)" />
        </template> -->
      </BasicTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from 'ant-design-vue'
import { BasicTree, TreeItem, ShyTableAction, BasicButton } from '3h1-ui'
import { ref } from 'vue'

const treeData = ref<TreeItem[]>([])

const searchValue = ref('0.0')

const handleClick = (...args) => {
  console.log(args, 777)
}

const handleRemove = (record) => {
  console.log(record, 'remove')
}

const getActions = (record) => {
  return [
    {
      label: '777',
      onClick: handleClick.bind(null, record)
    },
    {
      label: '888',
      popConfirm: {
        title: '确定删除吗？',
        confirm: handleRemove.bind(null, record)
      }
    }
  ]
}

onMounted(() => {
  treeData.value = Array.from({ length: 100 }, (_, i) => {
    return {
      title: `${Math.random()}`,
      key: i,
      children: Array.from({ length: 100 }, (_, j) => {
        return {
          title: `${Math.random()}`,
          key: `${i}-${j}`
        }
      })
    }
  })
  // setInterval(() => {
  //   treeData.value = Array.from({ length: 100 }, (_, i) => {
  //     return {
  //       title: `${Math.random()}`,
  //       key: i
  //     }
  //   })
  // }, 1000)
})

onUnmounted(() => {})
</script>
