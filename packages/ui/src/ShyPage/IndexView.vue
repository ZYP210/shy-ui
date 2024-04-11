<template>
  <!-- <ConfigProvider :locale="zhCN"> -->
    <a-pagination
      class="shy-page"
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="total"
      show-quick-jumper
      show-size-changer
      hideOnSinglePage
      @change="changeEvent"
    ></a-pagination>
  <!-- </ConfigProvider> -->
</template>
<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ref, defineProps, watchEffect, watch } from 'vue'
import { ConfigProvider, Pagination as APagination } from 'ant-design-vue'
interface Props {
  page?: {
    current: number
    pageSize: number
    total: number
  }
}
const props = withDefaults(defineProps<Props>(), {
  page: () => {
    return {
      current: 1,
      pageSize: 10,
      total: 100
    }
  }
})
const emit = defineEmits(['update:page'])
const current = ref(0)
const pageSize = ref(0)
const total = ref(0)

watch(
  props.page,
  (page) => {
    current.value = page.current
    pageSize.value = page.pageSize
    total.value = page.total
  },
  { immediate: true }
)
const changeEvent = (current: number, pageSize: number) => {
  emit('update:page', {
    current: current,
    pageSize: pageSize,
    total: total.value
  })
}
</script>

<style scoped lang="less">
.shy-page {
  margin-top: 10px;
  text-align: right;
}
</style>
