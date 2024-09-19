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
    const menuItems = [
      {
        label: '默认',
        key: 'default'
      },
      {
        label: '中等',
        key: 'middle'
      },
      {
        label: '紧凑',
        key: 'small'
      }
    ]

    const handleTitleClick = ({ key }) => {
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
                  items={menuItems}
                ></Menu>
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
