import { Pagination } from 'ant-design-vue'
import { computed, defineComponent, unref } from 'vue'
import { paginationProps } from '../props'
import { useDesign } from '@shy-plugins/use'
import { useTableContext } from '../hooks/useShyTableContext'
import '../style/tableFooter.less'

const ShyTableFooter = defineComponent({
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
  setup(props, { emit, slots }) {
    const { prefixCls } = useDesign('ant-table-footer')

    const { getSelectRowKeys, getSelectRows } = useTableContext()

    const getSelectTotal = computed(() => {
      return getSelectRowKeys()?.length ? (
        <>
          已选中
          <span class={`${prefixCls}-count`}>{getSelectRowKeys()?.length}</span>
          条
        </>
      ) : (
        <>选中激活</>
      )
    })

    const getSelections = computed(() => {
      return {
        rowKeys: getSelectRowKeys(),
        rows: getSelectRows(),
        disabled: !getSelectRowKeys()?.length
      }
    })

    const handlePageChange = (current, pageSize) => {
      emit('pageChange', { current, pageSize })
    }

    return () => {
      const isShowSettings = () => {
        return props.isShowSettings ? (
          <div class={`${prefixCls}-settings`}>
            <div class={`${prefixCls}-count-box`}>{getSelectTotal.value}</div>
            <div class={`${prefixCls}-settings-box`}>
              {slots.default?.(unref(getSelections))}
            </div>
          </div>
        ) : null
      }

      const isShowPagination = () => {
        return props.isShowPagination ? (
          <Pagination {...props.pagination} onChange={handlePageChange} />
        ) : null
      }

      return (
        <div class={prefixCls}>
          {isShowSettings()}
          {isShowPagination()}
        </div>
      )
    }
  }
})

export default ShyTableFooter
