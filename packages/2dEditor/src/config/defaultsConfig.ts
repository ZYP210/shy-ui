import { EventAction, PenType } from '@meta2d/core'

export const mapProps = {
  fileName: '',
  color: '#eeeeee',
  penBackground: '',
  background: '',
  backGroundImage: '',
  rule: false,
  ruleColor: '',
  grid: false,
  gridColor: '',
  gridSize: 10,
  gridRotate: 90
}

export const communicateProp = {
  websocketUrl: '',
  websocketConnected: false,
  mqttUrl: 'ws://broker.emqx.io:8083/mqtt',
  mqttConnected: false,
  clientId: '',
  username: '',
  password: '',
  mqttTopics: 'le5le'
}

export const globalConfigProps = {
  color: '',
  activeColor: '',
  hoverColor: '',
  hoverBackground: '',
  anchorColor: '',
  anchorRadius: '',
  anchorBackground: '',
  dockColor: '',
  dragColor: '',
  animateColor: '',
  textColor: '',
  fontFamily: '',
  fontSize: '',
  lineHeight: '',
  textAlign: '',
  textBaseline: '',
  rotateCursor: '',
  hoverCursor: '',
  disableInput: false,
  disableRotate: false,
  disableAnchor: false,
  disableEmptyLine: false,
  disableRepeatLine: false,
  disableScale: false,
  disableDockLine: false,
  disableTranslate: false,
  minScale: 0.1,
  maxScale: 10,
  autoAnchor: true,
  interval: 10,
  animateInterval: 10,
  textRotate: true,
  textFlip: false
}

export const appearanceProps = {
  x: 0,
  y: 0,
  text: '',
  color: '',
  width: 0,
  height: 0,
  lineWidth: 0,
  hoverColor: '',
  activeColor: '',
  background: '',
  hoverBackground: '',
  activeBackground: '',
  shadowColor: '',
  shadowBlur: 0,
  textHasShadow: false,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  anchorColor: '',
  anchorRadius: 0,
  borderRadius: 0,
  globalAlpha: 0,
  ratio: false,
  rotate: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: 0,
  paddingLeft: 0,
  progress: 0,
  progressColor: '',
  verticalProgress: false,
  flipX: false,
  flipY: false,
  dash: 0,
  fontFamily: '',
  fontSize: '',
  textColor: '',
  hoverTextColor: '',
  activeTextColor: '',
  textBackground: '',
  textAlign: '',
  textBaseline: '',
  lineHeight: 0,
  whiteSpace: '',
  textWidth: 0,
  textHeight: '',
  ellipsis: '',
  hiddenText: false,
  disableAnchor: false,
  disableInput: false,
  disableRotate: false,
  disableSize: false,
  image: ''
}

// 事件类型
export const eventType = [
  {
    name: '鼠标移入',
    event: 'enter'
  },
  {
    name: '鼠标移出',
    event: 'leave'
  },
  {
    name: '选中',
    event: 'active'
  },
  {
    name: '取消选中',
    event: 'inactive'
  },
  {
    name: '单击',
    event: 'click'
  },
  {
    name: '双击',
    event: 'dbclick'
  }
]

// 事件行为
export const eventBehavior = [
  {
    name: '打开链接',
    behavior: EventAction.Link,
    depend: [
      {
        name: '链接地址',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'URL'
        },
        bindData: ''
      },
      {
        name: '打开方式',
        type: 'select',
        bindProp: 'params',
        option: {
          list: [
            {
              name: '新窗口打开',
              value: '_blank'
            },
            {
              name: '覆盖当前页面',
              value: 'self'
            }
          ]
        },
        bindData: ''
      }
    ]
  },
  {
    name: '执行动画',
    behavior: EventAction.StartAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '暂停动画',
    behavior: EventAction.PauseAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '停止动画',
    behavior: EventAction.StopAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '播放视频',
    behavior: EventAction.StartVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '暂停视频',
    behavior: EventAction.PauseVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '停止视频',
    behavior: EventAction.StopVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  }
]

export const animateType = [
  {
    name: '跳动',
    key: 'bounce',
    frames: [
      {
        duration: 300,
        y: 10
      }
    ]
  },
  {
    name: '旋转',
    key: 'rotate',
    frames: [
      {
        duration: 1000,
        rotate: 360
      }
    ]
  },
  {
    name: '提示',
    key: 'tip',
    frames: [
      {
        duration: 300,
        scale: 1.3
      }
    ]
  }
]
