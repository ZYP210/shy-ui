import { defineComponent, ref } from 'vue'
import type { SizeType } from '../../types/table'
import { Tooltip, Dropdown, Menu } from 'ant-design-vue'
import { ColumnHeightOutlined } from '@ant-design/icons-vue'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyTableSize = defineComponent({
  props: {
    getPopupContainer: {
      type: Function
    }
  },
  setup() {
    const table = useTableContext()
    const selectedKeysRef = ref<SizeType[]>([table.getSize()!])

    const handleTitleClick = ({ key }: { key: SizeType }) => {
      selectedKeysRef.value = [key]
      table.setProps({
        size: key
      })
    }

    return () => {
      return (
        <Tooltip placement="top" v-slots={{ title: () => <span>密度</span> }}>
          <Dropdown
            placement="bottom"
            trigger={['click']}
            v-slots={{
              overlay: () => (
                <Menu
                  onClick={handleTitleClick}
                  selectable
                  v-model:selectedKeys={selectedKeysRef.value}
                >
                  <Menu.Item key="default">
                    <span>默认</span>
                  </Menu.Item>
                  <Menu.Item key="middle">
                    <span>中等</span>
                  </Menu.Item>
                  <Menu.Item key="small">
                    <span>紧凑</span>
                  </Menu.Item>
                </Menu>
              )
            }}
          >
            <ColumnHeightOutlined />
          </Dropdown>
        </Tooltip>
      )
    }
  }
})

export { ShyTableSize }
