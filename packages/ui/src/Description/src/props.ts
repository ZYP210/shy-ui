import { PropType } from 'vue'

export interface Schema {
  label: string
  field: string
  colProps?: {
    span: number
  }
}
export const basicColProps = 24

export const basicProps = {
  schema: {
    type: Array as PropType<Schema[]>,
    default: () => [{ label: 'a', field: 'a' }]
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
  }
}
