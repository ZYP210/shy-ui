<template>
  <div class="w-full h-full p-16px">
    <div class="w-288px h-full">
      <BasicTree
        title="测试"
        addable
        :treeData="treeData"
        :actionList="actionList"
        @plusClick="handleClick"
      ></BasicTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BasicTree, TreeItem } from '3h1-ui'
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

const handleClick = (node) => {
  console.log(node, 777)
}

const actionList = ref([
  {
    label: 777,
    onClick: handleClick
  }
])
</script>
