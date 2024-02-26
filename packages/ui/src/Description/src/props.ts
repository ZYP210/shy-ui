import { PropType, reactive } from 'vue'
import type { CSSProperties } from 'vue'

export interface Schema {
  label?: string
  field?: string
  colProps?: {
    span: number
  }
  component?: 'Divider' | 'Group'
  isCopy?: boolean
  labelStyle?: CSSProperties
  contentStyle?: CSSProperties
  customRender?: any
  helpMessage: string
}
export const basicColProps = 24

export const basicProps = reactive({
  schema: {
    type: Array as PropType<Schema[]>,
    default: () => []
  },
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
  },
  labelWidth: {
    type: Number as PropType<number | string>,
    default: () => 80
  },
  isShowColon: {
    type: Boolean,
    default: () => true
  },
  data: {
    type: Object,
    default: () => ({})
  },
  bordered: {
    type: Boolean,
    default: () => false
  },
  customRender: {
    type: Object,
    default: () => null
  }
})
