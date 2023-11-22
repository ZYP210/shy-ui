import { reactive } from 'vue'

export const basicContainerProps = reactive({
  title: {
    type: String
  },
  submitBtnText: {
    type: String,
    default: '提交'
  },
  cancelBtnText: {
    type: String,
    default: '返回'
  }
})

export const setDefaultConfig = (
  config: Partial<typeof basicContainerProps>
) => {
  Object.assign(basicContainerProps, config)
}
