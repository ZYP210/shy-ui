interface MenuList {
  title: string
  urlAry: string[]
}

export const URLData: MenuList[] = [
  {
    title: '表格',
    urlAry: [
      'Table',
      'TableAction',
      'TableAnt',
      'TableChildren',
      'TablePlus',
      'TablePlusEdit'
    ]
  },
  {
    title: '表单',
    urlAry: [
      'Form',
      'AdvancedSearch',
      'CodeEditor',
      'CountDown',
      'CountDownInput',
      'SearchTest',
      'StrengthMeter',
      'Tinymce',
      'UserSelectTest'
    ]
  },
  {
    title: '常用组件',
    urlAry: ['Description', 'Drawer', 'ModalView', 'DescriptionForm']
  },
  {
    title: '基础组件',
    urlAry: [
      'BasicHelp',
      'BasicTitle',
      'ButtonView',
      'IconView',
      'Loading',
      'Label'
    ]
  },
  {
    title: '布局',
    urlAry: [
      'Page',
      'BasicContainer',
      'ClickOutSide',
      'CollapseContainer',
      'LazyContainer',
      'ScrollContainer',
      'BasicResizeWrapper'
    ]
  },
  {
    title: '独立组件',
    urlAry: [
      'AiMap',
      'Cropper',
      'CountTo',
      'FlowChart',
      'Gantt',
      'Process',
      'Qrcode',
      'ScrollBar',
      'Transition',
      'Tree'
    ]
  }
]
