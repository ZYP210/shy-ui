import { defineComponent, ref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { FilterOutlined } from '@ant-design/icons-vue'
import { Popover } from 'ant-design-vue'
import { useDesign } from '@shy-plugins/use'
import { ShyAdvancedSearch } from '../../../../ShyAdvancedSearch'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyTableAdvancedSearch = defineComponent({
  emits: ['submit', 'reset'],
  setup(_, { emit }) {
    const { prefixCls } = useDesign('ant-table-advanced-search')

    const {
      registerAdvanced,
      advanceActions: { validate, resetFields }
    } = useTableContext()

    const isVisibleAdvancedSearch = ref(false)

    const handleSubmit = async () => {
      const values = await validate()
      emit('submit', values)
    }

    const handleReset = () => {
      resetFields()
      emit('reset')
    }

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
                <div class={prefixCls}>
                  <ShyAdvancedSearch
                    onRegister={registerAdvanced}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                  />
                </div>
              )
            }}
            placement="bottomRight"
          >
            <FilterOutlined
              style={{
                color: isVisibleAdvancedSearch.value
                  ? 'var(--primary-5)'
                  : 'var(--dark)'
              }}
            />
          </Popover>
        </Tooltip>
      )
    }
  }
})

export { ShyTableAdvancedSearch }
