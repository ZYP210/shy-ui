<template>
  <Tooltip placement="top">
    <template #title>
      <span>高级搜索</span>
    </template>
    <FilterOutlined
      :class="{ 'icon-selected': isVisibleAdvancedSearch }"
      @click="handleIconClick"
    />
  </Tooltip>
</template>
<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { FilterOutlined } from '@ant-design/icons-vue'
import { useTableContext } from '../../hooks/useShyTableContext'

export default defineComponent({
  name: 'AdvancedSearchSetting',
  components: {
    Tooltip,
    FilterOutlined
  },

  setup() {
    const { isVisibleAdvancedSearch, closeGlobalSearch } = useTableContext()

    const handleIconClick = () => {
      nextTick(() => {
        isVisibleAdvancedSearch.value = !isVisibleAdvancedSearch.value
        closeGlobalSearch()
      })
    }

    return { isVisibleAdvancedSearch, handleIconClick }
  }
})
</script>

<style lang="less" scoped>
.icon-selected {
  color: #498bf8;
}
</style>
