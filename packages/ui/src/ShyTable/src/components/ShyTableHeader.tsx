import { VNode, computed, defineComponent, unref } from 'vue'
import { ColumnChangeParam, TableSetting } from '../types/table'
import { useDesign } from '@shy-plugins/use'
import { useTableContext } from '../hooks/useShyTableContext'
import {
  ShyAdvancedSearch,
  ShyGlobalSearch,
  ShyShowSearch,
  ShyTableColumn,
  ShyTableFullScreen,
  ShyTableSize
} from './ShyTableSettings'
import '../style/tableHeader.less'
import { Divider } from 'ant-design-vue'
import { BarChartOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'
import { useRoute } from 'vue-router'

const ShyTableSetting = defineComponent({
  props: {
    setting: {
      type: Object as PropType<TableSetting>,
      default: () => ({})
    }
  },
  emits: ['columns-change'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('table-header-settings')

    const { getBindValues, ...table } = useTableContext()

    const getSetting = computed((): TableSetting => {
      return {
        redo: true,
        size: true,
        setting: true,
        fullScreen: false,
        ...props.setting
      }
    })

    const handleColumnChange = (data: ColumnChangeParam[]) => {
      emit('columns-change', data)
    }

    const getTableContainer = () => {
      return table ? unref(table.wrapRef) : document.body
    }

    const renderGlobalSearch = computed(() => {
      return getBindValues.value.useAdvancedSearch &&
        getBindValues.value.columns.some((item) => {
          return (
            item.dataIndex !== 'action' &&
            [true, undefined].includes(item.globalShow)
          )
        }) ? (
        <ShyGlobalSearch />
      ) : null
    })

    const renderAdvancedSearch = computed(() => {
      return getBindValues.value.useAdvancedSearch ? (
        <ShyAdvancedSearch getPopupContainer={getTableContainer} />
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
          {renderGlobalSearch.value}
          {renderAdvancedSearch.value}
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
  setup(props, { slots }) {
    const route = useRoute()

    const { useToken } = theme
    const { token } = useToken()
    const { prefixCls } = useDesign('table-header-title')

    return () => {
      return (
        <div class={prefixCls}>
          <BarChartOutlined style={{ color: token?.value?.colorPrimary }} />
          {slots?.title
            ? slots?.title?.()
            : route?.meta?.title || route?.name || ''}
        </div>
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
  emits: ['columns-change'],
  setup(props, { emit, slots }) {
    const { prefixCls } = useDesign('table-header')

    const isShowSetting = () => {
      return props.showTableSetting ? (
        <ShyTableSetting
          setting={props.tableSetting}
          onColumnsChange={handleColumnChange}
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
      ) : <div class={`${prefixCls}-placeholder`}></div>
    }

    const handleColumnChange = (data: ColumnChangeParam[]) => {
      emit('columns-change', data)
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
            <div class={`${prefixCls}-button`}>{slots?.toolbar?.()}</div>
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
