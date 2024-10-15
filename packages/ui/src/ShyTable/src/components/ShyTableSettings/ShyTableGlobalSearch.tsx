import { defineComponent, ref } from 'vue'
import { Input, Popover } from 'ant-design-vue'
import { SearchOutlined, AlignCenterOutlined } from '@ant-design/icons-vue'
import { useDesign } from '@shy-plugins/use'
import { ShyGlobalSearch } from '../../../../ShyAdvancedSearch'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyTableGlobalSearch = defineComponent({
  emits: ['submit', 'reset'],
  setup(_, { emit }) {
    const { prefixCls } = useDesign('ant-table-advanced-search')

    const {
      registerAdvanced,
      advanceActions: { validate, resetFields }
    } = useTableContext()

    const isVisibleGlobalSearch = ref(false)

    const timer = ref()
    const globalSearchValue = ref('')

    const handleInput = () => {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {}, 500)
    }

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
        <span>
          <Popover
            v-model:open={isVisibleGlobalSearch.value}
            trigger="click"
            v-slots={{
              content: () => (
                <div class={prefixCls}>
                  <ShyGlobalSearch
                    onRegister={registerAdvanced}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                  />
                </div>
              )
            }}
            placement="bottomRight"
          >
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
                  <AlignCenterOutlined
                    style={{
                      color: isVisibleGlobalSearch.value
                        ? 'var(--primary-5)'
                        : 'var(--gray-4)'
                    }}
                  />
                )
              }}
            </Input>
          </Popover>
        </span>
      )
    }
  }
})

export { ShyTableGlobalSearch }
