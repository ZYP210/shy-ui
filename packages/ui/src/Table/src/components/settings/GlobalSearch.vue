<template>
  <span>
    <Input
      style="width: 200px"
      placeholder="请输入数据"
      @focus="handleFocus"
      @input="handleInput"
      v-model:value="globalSearchValue"
    >
      <template #prefix>
        <SearchOutlined style="color: #c8c8c8" />
      </template>
      <template #suffix>
        <AlignCenterOutlined
          :style="{
            color: table.isVisibleGlobalSearch.value ? '#498bf8' : '#c8c8c8'
          }"
          @click="handleClick"
        />
      </template>
    </Input>
  </span>
</template>

<script setup lang="ts">
import { Input } from 'ant-design-vue'
import { SearchOutlined, AlignCenterOutlined } from '@ant-design/icons-vue'
import { useTableContext } from '../../hooks/useTableContext'
import { onMounted, ref } from 'vue'
import { getGlobalAdvancedType } from '../../../../AdvancedSearch'

const table = useTableContext()

const handleClick = () => {
  table.isVisibleGlobalSearch.value = !table.isVisibleGlobalSearch.value
  table.closeAdvancedSearch()
}

const handleFocus = () => {
  table.closeAdvancedSearch()
}

const timer = ref()
const globalSearchValue = ref('')

const handleInput = () => {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    table.setGlobalSearchValue(globalSearchValue.value)
    const type = table.getGlobalSearchType()
    const schemas = table.getGlobalSchemas().map((item) => {
      return item.field
    })
    if (type === 1) {
      const params = getGlobalAdvancedType(schemas, globalSearchValue.value)
      table.reload({ searchInfo: { ...params } })
      table.setCurSearchParams(params)
    } else {
      const fieldList = table.getGlobalSchemas()
      if (fieldList.length === 0) return
      const params = getGlobalAdvancedType(fieldList, globalSearchValue.value)
      table.reload({ searchInfo: { ...params } })
      table.setCurSearchParams(params)
    }
  }, 500)
}

onMounted(() => {
  const columns = table.getColumns({ ignoreAction: true, ignoreIndex: true })
})
</script>

<style scoped></style>
