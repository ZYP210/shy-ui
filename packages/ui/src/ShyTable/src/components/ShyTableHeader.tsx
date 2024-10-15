import { VNode, computed, defineComponent, unref } from 'vue'
import { ColumnChangeParam, TableSetting } from '../types/table'
import { useDesign } from '@shy-plugins/use'
import { useTableContext } from '../hooks/useShyTableContext'
import {
  ShyTableAdvancedSearch,
  ShyTableGlobalSearch,
  ShyShowMore,
  ShyShowSearch,
  ShyTableColumn,
  ShyTableFullScreen,
  ShyTableSize
} from './ShyTableSettings'
import '../style/tableHeader.less'
import { Divider } from 'ant-design-vue'
import { useRoute } from 'vue-router'
import { BasicTitle } from '../../../Basic'

const ShyTableSetting = defineComponent({
  props: {
    setting: {
      type: Object as PropType<TableSetting>,
      default: () => ({})
    }
  },
  emits: ['columns-change', 'columns-reset'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('ant-table-header-settings')

    const { getBindValues, ...table } = useTableContext()

    const getSetting = computed((): TableSetting => {
      return {
        redo: true,
        size: true,
        setting: true,
        fullScreen: false,
        showMore: false,
        advancedSearch: false,
        globalSearch: false,
        ...props.setting
      }
    })

    const handleColumnChange = (data: ColumnChangeParam[]) => {
      emit('columns-change', data)
    }

    const handleColumnsReset = () => {
      emit('columns-reset')
    }

    const getTableContainer = () => {
      return table ? unref(table.wrapRef) : document.body
    }

    const renderGlobalSearch = computed(() => {
      return getSetting.value.globalSearch ? <ShyTableGlobalSearch /> : null
    })

    const renderAdvancedSearch = computed(() => {
      return getSetting.value.advancedSearch ? <ShyTableAdvancedSearch /> : null
    })

    const renderShowMore = computed(() => {
      return getSetting.value.showMore ? (
        <ShyShowMore getPopupContainer={getTableContainer} />
      ) : null
    })

    const renderShowSearch = computed(() => {
      return getBindValues.value?.formConfig?.schemas &&
        getBindValues.value?.formConfig?.schemas?.length !== 0 ? (
        <ShyShowSearch getPopupContainer={getTableContainer} />
      ) : null
    })

    const renderTableSize = computed(() => {
      return getSetting.value.size ? (
        <ShyTableSize getPopupContainer={getTableContainer} />
      ) : null
    })

    const renderTableColumn = computed(() => {
      return getSetting.value.setting ? (
        <ShyTableColumn
          onColumnsChange={handleColumnChange}
          onColumnsReset={handleColumnsReset}
          getPopupContainer={getTableContainer}
        />
      ) : null
    })

    const renderFullScreen = computed(() => {
      return getSetting.value.fullScreen ? (
        <ShyTableFullScreen getPopupContainer={getTableContainer} />
      ) : null
    })

    return () => {
      return (
        <div class={prefixCls}>
          {/* {renderGlobalSearch.value} */}
          {renderAdvancedSearch.value}
          {renderShowMore.value}
          {renderShowSearch.value}
          {renderTableSize.value}
          {renderTableColumn.value}
          {renderFullScreen.value}
        </div>
      )
    }
  }
})

const ShyTableTitle = defineComponent({
  setup(_, { slots }) {
    const route = useRoute()

    return () => {
      return (
        <BasicTitle>
          {slots?.title
            ? slots?.title?.()
            : route?.meta?.title || route?.name || ''}
        </BasicTitle>
      )
    }
  }
})

const ShyTableHeader = defineComponent({
  props: {
    title: {
      type: [Function, Object, String] as PropType<
        VNode | Element | ((data: Recordable) => string | undefined)
      >,
      default: null
    },
    tableSetting: {
      type: Object as PropType<TableSetting>
    },
    showTableSetting: {
      type: Boolean
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: ''
    },
    headerAlign: {
      type: String as PropType<'left' | 'right'>,
      default: 'left'
    },
    isShowTitle: {
      type: Boolean
    }
  },
  emits: ['columns-change', 'columns-reset'],
  setup(props, { emit, slots }) {
    const { prefixCls } = useDesign('ant-table-header')

    const { getSelectRowKeys, getSelectRows } = useTableContext()

    const getSelections = computed(() => {
      return {
        rowKeys: getSelectRowKeys(),
        rows: getSelectRows(),
        disabled: !getSelectRowKeys()?.length
      }
    })

    const handleColumnChange = (data: ColumnChangeParam[]) => {
      emit('columns-change', data)
    }

    const handleColumnsReset = () => {
      emit('columns-reset')
    }

    const isShowSetting = () => {
      return props.showTableSetting ? (
        <ShyTableSetting
          setting={props.tableSetting}
          onColumnsChange={handleColumnChange}
          onColumnsReset={handleColumnsReset}
        />
      ) : null
    }

    const isShowTitle = () => {
      return props.isShowTitle ? (
        <ShyTableTitle>
          {{
            title:
              props.title || slots?.title
                ? () => props.title || slots?.title?.()
                : null
          }}
        </ShyTableTitle>
      ) : (
        <div class={`${prefixCls}-placeholder`}></div>
      )
    }

    const getAlignClass = computed(() => [
      `${prefixCls}-align`,
      `${prefixCls}-align-${props.headerAlign}`
    ])

    return () => {
      return (
        <div class={prefixCls}>
          <div class={getAlignClass.value}>
            {isShowTitle()}
            <div class={`${prefixCls}-button`}>
              {slots?.toolbar?.(unref(getSelections))}
            </div>
          </div>
          <div class={`${prefixCls}-toolbar`}>
            <Divider type="vertical" class="action-divider" />
            {isShowSetting()}
          </div>
        </div>
      )
    }
  }
})

export default ShyTableHeader
