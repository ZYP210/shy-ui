<template>
  <BasicTree
    title=""
    :toolbar="searchToolbar"
    search
    :clickRowToExpand="false"
    :treeData="treeData"
    :fieldNames="{ key: 'id', title: 'deptName' }"
    @select="handleSelect"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { BasicTree, TreeItem } from '../../../../Tree'
import { getList } from '/@/api/business/base/deptTree'
const treeData = ref<TreeItem[]>([])
const searchToolbar = ref(!!false)
const emit = defineEmits(['select'])

async function fetch() {
  treeData.value = (await getList()) as unknown as TreeItem[]
}

function handleSelect(keys: string) {
  emit('select', keys[0])
}

onMounted(() => {
  fetch()
})
</script>
