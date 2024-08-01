import { reactive } from 'vue'

export const shyContainerProps = reactive({
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
  footerAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  onSubmit: { type: Function as PropType<(...args) => any>, default: null },
  onSave: { type: Function as PropType<(...args) => any>, default: null },
  onCancel: { type: Function as PropType<(...args) => any>, default: null },
  navBars: {
    type: Array,
    default: () => []
  }
})

export const setDefaultConfig = (config: Partial<typeof shyContainerProps>) => {
  Object.assign(shyContainerProps, config)
}
