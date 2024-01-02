import { PropType } from 'vue'
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
  customRender: any
}
export const basicColProps = 24

export const basicProps = {
  schema: {
    type: Array as PropType<Schema[]>,
    default: () => []
  },
  labelAlign: {
    type: String,
    default: () => 'right'
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
  customRender: {
    type: Object,
    default: () => null
  }
}
