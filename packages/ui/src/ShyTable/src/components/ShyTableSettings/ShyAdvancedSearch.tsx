import { defineComponent, nextTick } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { FilterOutlined } from '@ant-design/icons-vue'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyAdvancedSearch = defineComponent({
  setup() {
    const { isVisibleAdvancedSearch, closeGlobalSearch } = useTableContext()

    const handleIconClick = () => {
      nextTick(() => {
        isVisibleAdvancedSearch.value = !isVisibleAdvancedSearch.value
        closeGlobalSearch()
      })
    }

    return () => {
      return (
        <Tooltip
          placement="top"
          v-slots={{ title: () => <span>高级搜索</span> }}
        >
          <FilterOutlined
            class={{ 'icon-selected': isVisibleAdvancedSearch.value }}
            onClick={handleIconClick}
          />
        </Tooltip>
      )
    }
  }
})

export { ShyAdvancedSearch }
