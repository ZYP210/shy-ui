import { reactive, VNode } from 'vue'
import { GridLayout, Gap } from './types'

const shyGridItemProps = reactive({
  index: Number,
  item: {
    type: Object as PropType<VNode>,
    required: true
  },
  gridArea: {
    type: Object as PropType<GridLayout>,
    required: true
  },
})

const shyLayoutContainerProps = reactive({
  gridLayouts: {
    type: Array<GridLayout>,
    default: () => new Array<GridLayout>(),
    required: true
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: '100%'
  },
  row: {
    type: Number,
    default: 24
  },
  col: {
    type: Number,
    default: 24
  },
  gap: {
    type: Object as PropType<Gap>,
    default: 0
  }
})

export { shyLayoutContainerProps, shyGridItemProps }
