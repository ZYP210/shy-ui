import { Pagination, Button } from 'ant-design-vue'
import { computed, defineComponent } from 'vue'
import { paginationProps } from '../props'
import { useDesign } from '@shy-plugins/use'
import { useTableContext } from '../hooks/useShyTableContext'
import '../style/tableFooter.less'

export const TableSettingBar = defineComponent({
  props: {

  },
  setup(props) {
    return () => {
      return (<div></div>)
    }
  },
});

const TableFooter = defineComponent({
  emits: ['pageChange'],
  props: {
    isShowSettings: {
      type: Boolean,
      default: true
    },
    isShowPagination: {
      type: Boolean
    },
    pagination: paginationProps
  },
  setup(props, { emit }) {
    const { prefixCls } = useDesign('table-footer')

    const { getSelectRowKeys } = useTableContext()

    const getSelectTotal = computed(() => {
      return `已选择${getSelectRowKeys()?.length}条`
    })

    const handlePageChange = (current, pageSize) => {
      emit('pageChange', { current, pageSize })
    }

    return () => {
      const isShowSettings = () => {
        return props.isShowSettings ? (
          <div class={`${prefixCls}-settings`}>
            <div class={`${prefixCls}-count-box`}>{getSelectTotal.value}</div>
            <div class={`${prefixCls}-setting-box`}></div>
          </div>
        ) : null
      }

      return (
        <div class={prefixCls}>
          {isShowSettings()}
          <Pagination {...props.pagination} onChange={handlePageChange} />
        </div>
      )
    }
  }
})

export default TableFooter
