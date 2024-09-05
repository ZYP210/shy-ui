import { defineComponent, ref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { FilterOutlined } from '@ant-design/icons-vue'
import { Popover } from 'ant-design-vue'
import { schemasAdvancedSearch } from '../../types/table'
import TableAdvancedSearch from '../TableAdvancedSearch.vue'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyAdvancedSearch = defineComponent({
  props: {
    schemasAdvancedSearch: {
      default: () => [],
      type: Array as PropType<schemasAdvancedSearch[]>
    }
  },
  emits: ['ensure'],
  setup() {
    const { schemasAdvancedSearch, handleAdvancedEnsure } = useTableContext()

    const isVisibleAdvancedSearch = ref(false)

    return () => {
      return (
        <Tooltip
          placement="top"
          v-slots={{ title: () => <span>高级搜索</span> }}
        >
          <Popover
            v-model:open={isVisibleAdvancedSearch.value}
            trigger="click"
            v-slots={{
              content: () => (
                <TableAdvancedSearch
                  schemasAdvancedSearch={schemasAdvancedSearch.value}
                  onEnsure={handleAdvancedEnsure}
                />
              )
            }}
            placement="bottomRight"
          >
            <FilterOutlined
              class={{ 'icon-selected': isVisibleAdvancedSearch.value }}
            />
          </Popover>
        </Tooltip>
      )
    }
  }
})

export { ShyAdvancedSearch }
