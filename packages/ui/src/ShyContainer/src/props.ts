import { reactive } from 'vue'

export const shyContainerProps = reactive({
  title: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
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
  navBars: {
    type: Array,
    default: () => []
  }
})

export const setDefaultConfig = (config: Partial<typeof shyContainerProps>) => {
  Object.assign(shyContainerProps, config)
}
