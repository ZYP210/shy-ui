import { defineComponent, onMounted, ref } from 'vue'
import { Input, Popover } from 'ant-design-vue'
import { SearchOutlined, AlignCenterOutlined } from '@ant-design/icons-vue'
import { getGlobalAdvancedType } from '../../../../AdvancedSearch'
import TableGlobalSearch from '../TableGlobalSearch.vue'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyGlobalSearch = defineComponent({
  setup() {
    const table = useTableContext()

    const isVisibleGlobalSearch = ref(false)

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
        if (!globalSearchValue.value) return table.reload({ searchInfo: {} })
        if (type === 1) {
          const params = getGlobalAdvancedType(schemas, globalSearchValue.value)
          table.reload({ searchInfo: { ...params } })
          table.setCurSearchParams(params)
        } else {
          const fieldList = table.getGlobalSchemas()
          if (fieldList.length === 0) return
          const params = getGlobalAdvancedType(
            fieldList,
            globalSearchValue.value
          )
          table.reload({ searchInfo: { ...params } })
          table.setCurSearchParams(params)
        }
      }, 500)
    }

    onMounted(() => {
      table.getColumns({
        ignoreAction: true,
        ignoreIndex: true
      })
    })

    return () => {
      return (
        <span>
          <Input
            placeholder="请输入数据"
            onInput={handleInput}
            v-model:value={globalSearchValue.value}
          >
            {{
              prefix: () => (
                <SearchOutlined style={{ color: 'var(--gray-4)' }} />
              ),
              suffix: () => (
                <Popover
                  v-model:open={isVisibleGlobalSearch.value}
                  trigger="click"
                  v-slots={{
                    content: () => (
                      <TableGlobalSearch
                        schemasAdvancedSearch={
                          table.schemasAdvancedSearchGlobal.value
                        }
                      />
                    )
                  }}
                  placement="bottom"
                >
                  <AlignCenterOutlined
                    style={{
                      color: isVisibleGlobalSearch.value
                        ? 'var(--blue-5)'
                        : 'var(--gray-4)'
                    }}
                  />
                </Popover>
              )
            }}
          </Input>
        </span>
      )
    }
  }
})

export { ShyGlobalSearch }
