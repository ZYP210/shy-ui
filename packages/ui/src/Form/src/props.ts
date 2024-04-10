import type { FieldMapToTime, FormSchema } from './types/form'
import type { CSSProperties, PropType } from 'vue'
import type { ColEx } from './types'
import type { TableActionType } from '../../Table'
import type { TableActionType as ShyTableActionType } from '../../ShyTable'
import type { RowProps } from 'ant-design-vue/lib/grid/Row'

type SizeType = 'small' | 'middle' | 'large' | undefined
type ButtonShape = 'default' | 'circle' | 'round'
type ButtonHTMLType = 'submit' | 'button' | 'reset'

type ButtonProps = {
  htmlType?: ButtonHTMLType | undefined
  loading?:
    | boolean
    | {
        delay?: number | undefined
      }
    | undefined
  ghost?: boolean | undefined
  prefixCls?: string | undefined
  disabled?: boolean
  block?: boolean
  danger: boolean
  icon: any
  href: string
  target: string
  title: string
  shape: ButtonShape
  size: SizeType
  onClick: (event: MouseEvent) => void
  onMousedown?: ((event: MouseEvent) => void) | undefined
}

export const basicProps = {
  model: {
    type: Object as PropType<Recordable>,
    default: () => ({} as PropType<Recordable>)
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [] as PropType<FieldMapToTime>
  },
  compact: {
    type: Boolean
  },
  // 表单配置规则
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => [] as PropType<FormSchema[]>
  },
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null
  },
  baseRowStyle: {
    type: Object as PropType<CSSProperties>
  },
  baseColProps: {
    type: Object as PropType<Partial<ColEx>>
  },
  autoSetPlaceHolder: {
    type: Boolean,
    default: true
  },
  // 在INPUT组件上单击回车时，是否自动提交
  autoSubmitOnEnter: {
    type: Boolean,
    default: false
  },
  submitOnReset: {
    type: Boolean
  },
  submitOnChange: {
    type: Boolean
  },
  size: {
    type: String as PropType<'default' | 'middle' | 'small' | 'large'>,
    default: 'default'
  },
  // // 禁用表单
  disabled: {
    type: Boolean
  },
  emptySpan: {
    type: [Number, Object] as PropType<number>,
    default: 0
  },
  // // 是否显示收起展开按钮
  showAdvancedButton: {
    type: Boolean
  },
  // // 转化时间
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date
    }
  },
  rulesMessageJoinLabel: {
    type: Boolean,
    default: true
  },
  // // 超过3行自动折叠
  autoAdvancedLine: {
    type: Number,
    default: 3
  },
  // // 不受折叠影响的行数
  alwaysShowLines: {
    type: Number,
    default: 1
  },

  // // 是否显示操作按钮
  showActionButtonGroup: {
    type: Boolean,
    default: true
  },
  // // 操作列Col配置
  actionColOptions: {
    type: Object as PropType<Partial<ColEx>>
  },
  // // 显示重置按钮
  showResetButton: {
    type: Boolean,
    default: true
  },
  // 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
  autoFocusFirstItem: {
    type: Boolean
  },
  // 重置按钮配置
  resetButtonOptions: {
    type: Object as PropType<Partial<ButtonProps>>
  },

  // // 显示确认按钮
  showSubmitButton: {
    type: Boolean,
    default: true
  },
  // // 确认按钮配置
  submitButtonOptions: {
    type: Object as PropType<Partial<ButtonProps>>
  },

  // // 自定义重置函数
  resetFunc: {
    type: Function as PropType<() => Promise<void>>
  },
  submitFunc: {
    type: Function as PropType<() => Promise<void>>
  },

  // // 以下为默认props
  hideRequiredMark: {
    type: Boolean
  },

  labelCol: {
    type: Object as PropType<Partial<ColEx>>
  },

  layout: {
    type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
    default: 'horizontal'
  },
  tableAction: {
    type: Object as PropType<TableActionType | ShyTableActionType>
  },

  wrapperCol: {
    type: Object as PropType<Partial<ColEx>>
  },

  colon: {
    type: Boolean
  },

  labelAlign: {
    type: String
  },

  rowProps: {
    type: Object as PropType<RowProps>
  },
  rangePickerField: {
    type: Array,
    default: () => []
  }
}
