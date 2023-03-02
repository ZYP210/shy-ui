<template>
  <BasicTree
    title=""
    :toolbar="searchToolbar"
    search
    :clickRowToExpand="false"
    :treeData="treeData"
    :fieldNames="props.fieldNames as any"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { BasicTree, TreeItem } from '../../../../Tree'

const treeData = ref<any>([])
const searchToolbar = ref(!!false)
const emit = defineEmits(['select'])

const props = defineProps({
  api: {
    default: () => {
      return () =>
        new Promise((resolve) =>
          resolve([
            {
              title: 'father',
              key: '1',
              children: [{ title: '1-son', key: '1-1' }]
            },
            {
              title: 'father2',
              key: '2',
              children: [{ title: '2-son', key: '2-1' }]
            }
          ])
        )
    }
  },
  fieldNames: {
    default: () => ({ label: 'title', value: 'key' })
  }
})
console.log('props', props)

async function fetch() {
  const res = await props.api()
  treeData.value = res
}

function handleSelect(keys: string) {
  emit('select', keys[0])
}

onMounted(() => {
  fetch()
})
</script>
