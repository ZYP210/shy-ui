import { PropType, reactive } from 'vue'
import { DescriptionsItem } from './typing'

export const basicColProps = 6
export const basicRowProps = 24
export const basicGap = 8

export const basicProps = reactive({
  schemas: {
    type: Array as PropType<DescriptionsItem[]>,
    default: () => []
  },
  summaryPrecision: {
    type: Number,
    default: 2
  },
  summaryTotalFields: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: () => 'left'
  },
  labelWidth: {
    type: Number as PropType<number | string>,
    default: 100
  },
  isShowColon: {
    type: Boolean,
    default: () => false
  },
  data: {
    type: Object,
    default: () => ({})
  },
  bordered: {
    type: Boolean,
    default: () => false
  },
  render: {
    type: Object,
    default: () => null
  },
  mode: {
    type: String as PropType<'vertical| horizontal'>,
    default: () => 'horizontal'
  },
  baseColProps: {
    type: Object,
    default: () => ({
      span: basicColProps
    })
  }
})
