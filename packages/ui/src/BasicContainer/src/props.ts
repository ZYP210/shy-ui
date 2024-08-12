import { reactive } from 'vue'

export const basicContainerProps = reactive({
  title: {
    type: String
  },
  loading: {
    type: Boolean,
    default: undefined
  },
  isShowHeader: {
    type: Boolean,
    default: true
  },
  isShowBack: {
    type: Boolean,
    default: false
  },
  isShowFooter: {
    type: Boolean,
    default: true
  },
  isShowBtn: {
    type: Boolean,
    default: true
  },
  isShowSaveBtn: {
    type: Boolean,
    default: true
  },
  isShowSubmitBtn: {
    type: Boolean,
    default: true
  },
  isShowCancelBtn: {
    type: Boolean,
    default: true
  },
  saveBtnText: {
    type: String,
    default: '保存'
  },
  submitBtnText: {
    type: String,
    default: '提交'
  },
  cancelBtnText: {
    type: String,
    default: '取消'
  },
  cancelAlign: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  onSubmit: { type: Function as PropType<(...args) => any>, default: null },
  onSave: { type: Function as PropType<(...args) => any>, default: null },
  onCancel: { type: Function as PropType<(...args) => any>, default: null },
  footerAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right'
  }
})

export const setDefaultConfig = (
  config: Partial<typeof basicContainerProps>
) => {
  Object.assign(basicContainerProps, config)
}
