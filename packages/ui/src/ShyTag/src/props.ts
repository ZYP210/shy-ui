import type { PropType } from 'vue'
import { reactive } from 'vue'

export const shyTagBasicProps = reactive({
  options: {
    type: Array as PropType<Recordable[]>,
    default: () => []
  },
  value: {
    type: [String, Number]
  },
  isTag: {
    type: Boolean
  },
  tagMode: {
    type: String as PropType<'point' | 'tag' | 'text'>,
    default: 'point'
  },
  fieldNames: {
    type: Object as PropType<
      Partial<{
        label: string
        value: string
        color: string
        css: string
      }>
    >,
    default: () => ({})
  }
})