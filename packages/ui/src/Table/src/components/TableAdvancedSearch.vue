<template>
  <div
    class="shy-basic-table-advanced-search"
    ref="tableAdvancedSearchWrapperRef"
    :style="setStyle()"
  >
    <AdvancedSearch
      ref="advancedSearchRef"
      :schemas="schemasAdvancedSearch"
    ></AdvancedSearch>
    <div class="shy-basic-table-advanced-search-footer">
      <Space>
        <BasicButton type="primary" @click="handleEnsure">搜索</BasicButton>
        <BasicButton @click="handleReset">重置</BasicButton>
      </Space>
    </div>
  </div>
</template>

<script lang="ts">
import { Space } from 'ant-design-vue'
import { BasicButton } from '../../../Button'
import { AdvancedSearch } from '../../../AdvancedSearch/'
import { defineComponent, onMounted, ref } from 'vue'
import { useTableContext } from '../hooks/useTableContext'
import { nextTick } from 'vue'
import { onUnmounted } from 'vue'
export default defineComponent({
  props: {
    schemasAdvancedSearch: {
      default: () => [],
      type: Array
    }
  },
  components: {
    BasicButton,
    Space,
    AdvancedSearch
  },
  emits: ['ensure'],
  setup(props, { emit }) {
    const advancedSearchRef = ref()

    const table = useTableContext()

    const setStyle = () => {
      const dom = document.querySelector('.table-settings')
      if (dom) {
        return { left: `${dom.offsetLeft - 370}px` }
      } else {
        return {}
      }
    }

    const handleEnsure = () => {
      const form = advancedSearchRef.value.getSearchFrom()
      emit('ensure', form)
    }

    const handleReset = () => {
      advancedSearchRef.value.resetFields()
    }

    const tableAdvancedSearchWrapperRef = ref()
    const clickOutside = (e) => {
      if (document.querySelector('.table-settings').contains(e.target)) return
      if (tableAdvancedSearchWrapperRef.value.contains(e.target)) return
      const selectList = document.getElementsByClassName('ant-select-dropdown')
      const pickList = document.getElementsByClassName('ant-picker-dropdown')
      const domList = [...Array.from(selectList), ...Array.from(pickList)]

      const flag =
        domList?.length &&
        domList.some((dom) => {
          return dom.contains(e.target)
        })
      if (flag) return

      table.closeAdvancedSearch()
    }

    onMounted(() => {
      document.addEventListener('click', clickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickOutside)
    })

    return {
      handleEnsure,
      handleReset,
      advancedSearchRef,
      setStyle,
      tableAdvancedSearchWrapperRef
    }
  }
})
</script>
