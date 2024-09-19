import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { useTableContext } from '../../hooks/useShyTableContext'
import Icon from '../../../../Icon'

const ShyShowMore = defineComponent({
  setup() {
    const { showAll } = useTableContext()

    return () => {
      return (
        <Tooltip
          placement="top"
          v-slots={{ title: () => <span>查看全部</span> }}
        >
          <Icon class="cursor-pointer" icon="tabler:fold-down" onClick={showAll} />
        </Tooltip>
      )
    }
  }
})

export { ShyShowMore }
