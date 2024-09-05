<template>
  <div class="shy-basic-table-global-search">
    <div
      class="shy-basic-table-global-search-item-global"
      :class="{ 'selected-bg': curSelected === 1 }"
      @click="handleSelectedClick(1)"
    >
      <div>搜索全部</div>
      <CheckOutlined v-if="curSelected === 1" />
    </div>
    <div
      class="shy-basic-table-global-search-item-special"
      :class="{ 'selected-bg': curSelected === 2 }"
      @click="handleSelectedClick(2)"
    >
      <div>搜索特定字段</div>
      <CheckOutlined v-if="curSelected === 2" />
    </div>

    <div></div>
    <div class="shy-basic-table-global-search-checkbox-wrapper">
      <CheckboxGroup v-model:value="fieldList" @change="handleCheckboxChange">
        <template v-for="(item, _index) in schemasAdvancedSearch" :key="_index">
          <div style="height: 22px">
            <Checkbox :value="item.field">
              <span style="color: #131415; font-size: 12px">
                {{ item.label }}
              </span>
            </Checkbox>
          </div>
        </template>
      </CheckboxGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Checkbox, CheckboxGroup } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { useTableContext } from '../hooks/useShyTableContext'
import { getGlobalAdvancedType } from '../../../AdvancedSearch/'
import { schemasAdvancedSearch } from '../types/table'

export default defineComponent({
  props: {
    schemasAdvancedSearch: {
      default: () => [],
      type: Array as PropType<schemasAdvancedSearch[]>
    }
  },
  components: { CheckboxGroup, Checkbox, CheckOutlined },
  emits: ['ensure'],
  setup(props) {
    const table = useTableContext()
    const fieldList = ref([])

    const curSelected = ref(1)
    watch(
      curSelected,
      (value) => {
        table.setGlobalSearchType(value)
      },
      { immediate: true }
    )
    table.setGlobalSchemas(props.schemasAdvancedSearch)
    const handleSelectedClick = (value: 1 | 2) => {
      curSelected.value = value

      if (value === 1) {
        table.setGlobalSchemas(props.schemasAdvancedSearch)
        const searchValue = table.getGlobalSearchValue()
        const schemas = props.schemasAdvancedSearch.map((item) => {
          return item.field
        })
        if (!searchValue) return
        const params = getGlobalAdvancedType(schemas, searchValue)
        table.reload({ searchInfo: { ...params } })
        table.setCurSearchParams(params)
      } else {
        table.setGlobalSchemas(fieldList.value)
        const searchValue = table.getGlobalSearchValue()
        if (!searchValue) return
        if (fieldList.value.length === 0) return
        const params = getGlobalAdvancedType(fieldList.value, searchValue)
        table.reload({ searchInfo: { ...params } })
        table.setCurSearchParams(params)
      }
    }

    const handleCheckboxChange = (value) => {
      curSelected.value = 2
      table.setGlobalSchemas(value)
      const searchValue = table.getGlobalSearchValue()
      if (!searchValue) return
      if (value.length === 0) return
      const params = getGlobalAdvancedType(value, searchValue)
      table.reload({ searchInfo: { ...params } })
      table.setCurSearchParams(params)
    }

    return {
      fieldList,
      curSelected,
      handleSelectedClick,
      handleCheckboxChange
    }
  }
})
</script>

<style lang="less" scoped>
.shy-basic-table-global-search {
  width: 200px;
  max-height: 800px;
  overflow: auto;
  background-color: var(--theme);
  &-item-global {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #131415;
    cursor: pointer;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-item-special {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #131415;
    cursor: pointer;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-checkbox-wrapper {
    padding-inline: 8px;

    .ant-checkbox-group {
      justify-content: space-between;
    }
  }

  .selected-bg {
    background-color: #ebf1ff;
  }
}
</style>
