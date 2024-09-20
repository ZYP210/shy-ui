import type { PropType, RendererElement, RendererNode, VNode } from 'vue'
import { reactive } from 'vue'
import type { PaginationProps } from './types/pagination'
import type {
  ShyColumn,
  FetchSetting,
  TableSetting,
  SorterResult,
  TableCustomRecord,
  TableRowSelection,
  SizeType,
  InfoConfig
} from './types/table'
import type { FormProps } from '../../ShyForm'
import {
  DEFAULT_FILTER_FN,
  DEFAULT_SORT_FN,
  FETCH_SETTING,
  DEFAULT_SIZE,
  PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  ACTION_COLUMN_WIDTH
} from './const'

const searchProps = {
  // 普通搜索
  useSearchForm: {
    type: Boolean
  },
  // 高级搜索
  useAdvancedSearch: {
    type: Boolean,
    default: false
  },
  isSortFetch: {
    type: Boolean,
    default: true
  },
  sortFn: {
    type: Function as PropType<(sortInfo: SorterResult) => any>,
    default: DEFAULT_SORT_FN
  },
  filterFn: {
    type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
    default: DEFAULT_FILTER_FN
  },
  // 额外的请求参数
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null
  },
  // 默认的排序参数
  defSort: {
    type: Object as PropType<Recordable>,
    default: null
  },
  handleSearchInfoFn: {
    type: Function as PropType<Fn>,
    default: null
  }
}

const formProps = {
  formLayout: {
    type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
    default: 'horizontal'
  },
  formLabelInInput: {
    type: Boolean,
    default: true
  },
  // 表单配置
  formConfig: {
    type: Object as PropType<Partial<FormProps>>,
    default: null
  }
}

const infoProps = {
  useInfo: {
    type: Boolean,
    default: false
  },
  infoConfig: {
    type: Object as PropType<InfoConfig>,
    default: () => ({}),
  }
}

const summaryProps = {
  showSummary: {
    type: Boolean,
    default: false
  },
  summaryFunc: {
    type: [Function, Array] as PropType<(...arg: any[]) => any[]>,
    default: null
  },
  summaryData: {
    type: Array as PropType<Recordable[]>,
    default: null
  },
  summaryTotalFields: {
    type: Array as PropType<string[]>,
    default: null
  },
  showSummaryTotal: {
    type: Boolean,
    default: false
  },
  summaryPrecision: {
    type: Number,
    default: 2
  }
}

const columnsProps = {
  actionColWidth: {
    type: Number,
    default: ACTION_COLUMN_WIDTH
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  indexColumnProps: {
    type: Object as PropType<ShyColumn>,
    default: null
  },
  actionColumn: {
    type: Object as PropType<ShyColumn>,
    default: null
  },
  ellipsis: {
    type: Boolean,
    default: true
  },
  resizable: {
    type: Boolean,
    default: false
  },
  columns: {
    type: [Array] as PropType<ShyColumn[]>,
    default: () => []
  }
}

const fetchProps = {
  loading: {
    type: Boolean
  },
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null
  },
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => FETCH_SETTING
  },
  immediate: {
    type: Boolean,
    default: true
  },
  emptyDataIsShowTable: {
    type: Boolean,
    default: true
  },
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null
  },
  isTreeTable: {
    type: Boolean,
    default: false
  },
  beforeEditSubmit: {
    type: Function as PropType<
      (data: {
        record: Recordable
        index: number
        key: string | number
        value: any
      }) => Promise<any>
    >
  }
}

const headerProps = {
  isShowHeader: {
    type: Boolean,
    default: true
  },
  headerAlign: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  isShowTitle: {
    type: Boolean,
    default: true
  },
  title: {
    type: [Function, Object, String] as PropType<
      | VNode<RendererNode, RendererElement, { [key: string]: any }>
      | Element
      | ((data: Recordable) => string | undefined)
    >
  },
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>
  },
  showTableSetting: {
    type: Boolean,
    default: true
  },
  tableSetting: {
    type: Object as PropType<TableSetting>,
    default: () => {
      return {}
    }
  }
}

const selectionProps = {
  clickToRowSelect: {
    type: Boolean,
    default: true
  },
  autoCreateKey: {
    type: Boolean,
    default: true
  },
  rowSelection: {
    type: Object as PropType<TableRowSelection | null>,
    default: null
  },
  clearSelectOnPageChange: {
    type: Boolean
  },
  rowKey: {
    type: [String, Function] as PropType<
      string | ((record: Recordable) => string)
    >,
    default: ''
  }
}

const footerProps = {
  isShowPagination: {
    type: Boolean,
    default: true
  },
  isShowFooterSettings: {
    type: Boolean,
    default: true
  },
  isShowFooter: {
    type: Boolean,
    default: true
  },
  pagination: {
    type: [Object] as PropType<PaginationProps>,
    default: () => {}
  }
}

const styleProps = {
  inset: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: false
  },
  indentSize: {
    type: Number,
    default: 24
  },
  canColDrag: {
    type: Boolean,
    default: true
  },
  // 使用表格内边距
  useTableWrapper: {
    type: Boolean,
    default: true
  },
  isCanResizeParent: {
    type: Boolean,
    default: true
  },
  canResize: {
    type: Boolean,
    default: true
  },
  resizeHeightOffset: {
    type: Number,
    default: 0
  },
  maxHeight: {
    type: Number
  },
  bordered: {
    type: Boolean,
    default: false
  },
  rowClassName: {
    type: Function as PropType<
      (record: TableCustomRecord<any>, index: number) => string
    >
  },
  scroll: {
    type: Object as PropType<{ x: number | true; y: number }>,
    default: null
  },
  size: {
    type: String as PropType<SizeType>,
    default: DEFAULT_SIZE
  }
}

export const shyTableBasicProps = reactive({
  ...infoProps,
  ...formProps,
  ...searchProps,
  ...summaryProps,
  ...columnsProps,
  ...fetchProps,
  ...headerProps,
  ...selectionProps,
  ...footerProps,
  ...styleProps
})

export const paginationProps = reactive({
  type: Object as PropType<PaginationProps>,
  default: () => {
    return {
      current: 1,
      pageSize: PAGE_SIZE,
      size: 'small',
      defaultPageSize: PAGE_SIZE,
      showTotal: (total) => `共 ${total} 条数据`,
      showSizeChanger: true,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      showQuickJumper: true
    }
  }
})

export const basicPropChange = (options) => {
  Object.keys(options).forEach((name) => {
    shyTableBasicProps[name] = options[name]
  })
}
