import { reactive } from 'vue'

export const basicLabelProps = reactive({
  title: {
    type: String
  },
  color: {
    type: String,
    default: '#02a7f0'
  },
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 15
  }
})

export const setDefaultConfig = (config: Partial<typeof basicLabelProps>) => {
  Object.assign(basicLabelProps, config)
}
