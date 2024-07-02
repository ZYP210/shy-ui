import { defineComponent, unref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { FileSearchOutlined  } from '@ant-design/icons-vue'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyShowSearch = defineComponent({
  setup() {
    const table = useTableContext()

    const redo = () => {
      const useSearchForm = unref(table.getBindValues).useSearchForm
      table.setProps({ useSearchForm: !useSearchForm })
    }

    return () => {
      return (
        <Tooltip
          placement="top"
          v-slots={{ title: () => <span>显隐搜索</span> }}
        >
          <FileSearchOutlined onClick={redo} />
        </Tooltip>
      )
    }
  }
})

export { ShyShowSearch }
