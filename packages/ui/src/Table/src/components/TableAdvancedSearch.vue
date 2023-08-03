<template>
  <div class="shy-basic-table-advanced-search">
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
import { defineComponent, ref } from 'vue'
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

    const handleEnsure = () => {
      const form = advancedSearchRef.value.getSearchFrom()
      emit('ensure', form)
    }

    const handleReset = () => {
      advancedSearchRef.value.resetFields()
    }

    return { handleEnsure, handleReset, advancedSearchRef }
  }
})
</script>
