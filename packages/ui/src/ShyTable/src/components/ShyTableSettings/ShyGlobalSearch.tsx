import { defineComponent, ref } from 'vue'
import { Input, Popover } from 'ant-design-vue'
import { SearchOutlined, AlignCenterOutlined } from '@ant-design/icons-vue'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyGlobalSearch = defineComponent({
  setup() {
    const { getBindValues } = useTableContext()

    const isVisibleGlobalSearch = ref(false)

    const timer = ref()
    const globalSearchValue = ref('')

    const handleInput = () => {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {}, 500)
    }

    return () => {
      return (
        <span>
          <Popover
            v-model:open={isVisibleGlobalSearch.value}
            trigger="click"
            v-slots={{
              content: () => <span></span>
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

export { ShyGlobalSearch }
