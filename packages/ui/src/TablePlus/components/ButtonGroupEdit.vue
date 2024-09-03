<template>
  <ShyTableAction :actions="getActions" :show-count="4" :outside="true" />
</template>

<script setup lang="ts">
import ShyTableAction from '../../ShyTable/src/components/ShyTableAction'
import { computed } from 'vue'

const emit = defineEmits([
  'updateStatusEdit',
  'edit-ensure',
  'edit-cancel',
  'row-remove'
])

const props = defineProps({
  row: {
    default: null
  }
})

const getActions = computed(() => {
  return [
    {
      label: '编辑',
      onClick: () => {
        emit('updateStatusEdit', true)
      },
      ifShow: props?.row?._isEdit === false
    },
    {
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: () => {
          emit('row-remove', true)
        }
      },
      ifShow: props.row._isEdit === false
    },
    {
      label: '确定',
      onClick: () => {
        emit('updateStatusEdit', false)
        emit('edit-ensure')
      },
      ifShow: props.row._isEdit === true
    },
    {
      label: '取消',
      onClick: () => {
        emit('updateStatusEdit', false)
        emit('edit-cancel')
      },
      ifShow: props.row._isEdit === true
    }
  ]
})
</script>

<style scoped></style>
