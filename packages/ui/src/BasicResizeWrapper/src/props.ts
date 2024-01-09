import { reactive } from 'vue'

export const basicResizeWrapperProps = reactive({
  designWidth: {
    default: 1920,
    type: Number
  },
  designHeight: {
    default: 1080,
    type: Number
  }
})

export const setDefaultConfig = (
  config: Partial<typeof basicResizeWrapperProps>
) => {
  Object.assign(basicResizeWrapperProps, config)
}
