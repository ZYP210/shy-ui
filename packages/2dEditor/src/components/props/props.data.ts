import { Select, Input, InputNumber, Switch, RangePicker } from 'ant-design-vue'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import { Upload, CardItem } from '../form'
import { mergeProps } from '../../utils/index'
import { useSelection } from '../../hooks/useSelections'
import type { FormSchema } from '../../types/form'
const { isMultiPen, reactivePenConfig, selections } = useSelection()

//存储当前需要的参数
const params = reactive<any>({})
const apiRef = ref<any>()

export const setParams = (obj: Recordable, api: Recordable) => {
  Object.assign(params, obj)
  apiRef.value = unref(api)
}

// 更新属性方法
function updateFunc(prop: string) {
  return (value: string | number) => {
    if (isMultiPen.value) {
      for (let i of selections.value as Pen[]) {
        meta2d.setValue(
          {
            id: i.id,
            [prop]: value
          },
          { render: false }
        )
      }
      meta2d.render()
    } else {
      meta2d.setValue({
        id: selections.value.id,
        [prop]: value
      })
    }
  }
}

export const baseSchema = [
  {
    title: '位置与大小',
    children: [
      {
        label: 'x',
        field: 'x',
        component: InputNumber,
        componentProps: {
          placeholder: 'px',
          onChange(value: number) {
            meta2d.setValue({
              id: selections.value.id,
              x: value
            })
            meta2d.canvas.calcActiveRect()
            mergeProps(reactivePenConfig, selections.value)
            meta2d.render()
          }
        }
      },
      {
        label: 'y',
        field: 'y',
        component: InputNumber,
        componentProps: {
          placeholder: 'px',
          onChange(value: number) {
            meta2d.setValue({
              id: selections.value.id,
              y: value
            })
            meta2d.canvas.calcActiveRect()
            mergeProps(reactivePenConfig, selections.value)
            meta2d.render()
          }
        }
      },
      {
        label: '宽度',
        field: 'width',
        component: InputNumber,
        componentProps: {
          min: 0,
          onChange(value: number) {
            if (selections.value.ratio) {
              meta2d.setValue({
                id: selections.value.id,
                width: value,
                height:
                  (value / selections.value.width) * selections.value.height
              })
            } else {
              meta2d.setValue({
                id: selections.value.id,
                width: value
              })
            }
            mergeProps(reactivePenConfig, selections.value)
          }
        }
      },
      {
        label: '高度',
        field: 'height',
        component: InputNumber,
        componentProps: {
          min: 0,
          onChange(value: number) {
            if (selections.value.ratio) {
              meta2d.setValue({
                id: selections.value.id,
                height: value,
                width:
                  (value / selections.value.height) * selections.value.width
              })
            } else {
              meta2d.setValue({
                id: selections.value.id,
                height: value
              })
            }
            mergeProps(reactivePenConfig, selections.value)
          }
        }
      },
      {
        label: '锁定宽高比',
        field: 'ratio',
        component: Switch,
        componentProps: {
          type: 'checked',
          onChange(value: boolean) {
            selections.value.ratio = value
            meta2d.render()
            mergeProps(reactivePenConfig, selections.value)
          }
        }
      },
      {
        label: '圆角',
        field: 'borderRadius',
        component: InputNumber,
        componentProps: {
          placeholder: '<1为比例',
          min: 0,
          onChange: updateFunc('borderRadius')
        }
      },
      {
        label: '旋转',
        field: 'rotate',
        component: InputNumber,
        componentProps: {
          placeholder: '角度',
          onChange: updateFunc('rotate')
        }
      },
      {
        label: '进度',
        field: 'progress',
        component: InputNumber,
        componentProps: {
          placeholder: 'px',
          min: 0,
          step: 0.1,
          max: 1,
          onChange: updateFunc('progress')
        }
      },
      {
        label: '垂直进度',
        field: 'verticalProgress',
        component: Switch,
        componentProps: {
          type: 'checked',
          onChange: updateFunc('verticalProgress')
        }
      },
      {
        label: '水平翻转',
        field: 'flipX',
        component: Switch,
        event: 'change',
        componentProps: {
          type: 'checked',
          onChange: updateFunc('flipX')
        }
      },
      {
        label: '垂直翻转',
        field: 'flipY',
        component: Switch,
        componentProps: {
          type: 'checked',
          onChange: updateFunc('flipY')
        }
      }
    ]
  },
  {
    title: '样式',
    children: [
      {
        label: '线条样式',
        field: 'dash',
        component: Select,
        componentProps: {
          type: 'change',
          placeholder: '线条样式',
          options: [
            {
              label: '直线',
              value: 0
            },
            {
              label: '虚线',
              value: 1
            },
            {
              label: '点横线',
              value: 2
            }
          ],
          onChange(value: number) {
            const dash = [
              [0, 0],
              [5, 5],
              [10, 10, 2, 10]
            ]
            if (isMultiPen.value) {
              for (let i of selections.value) {
                meta2d.setValue(
                  {
                    id: i.id,
                    lineDash: dash[value]
                  },
                  { render: false }
                )
              }
              meta2d.render()
            } else {
              selections.value.dash = value
              meta2d.setValue({
                id: selections.value.id,
                lineDash: dash[value]
              })
            }
          }
        }
      },
      {
        label: '连接样式',
        field: 'lineJoin',
        component: Select,
        componentProps: {
          placeholder: '连接样式',
          options: [
            {
              label: '默认',
              value: 'miter'
            },
            {
              label: '圆形',
              value: 'round'
            },
            {
              label: '斜角',
              value: 'bevel'
            }
          ],
          onChange: updateFunc('lineJoin')
        }
      },
      {
        label: '末端样式',
        field: 'lineCap',
        component: Select,
        componentProps: {
          options: [
            {
              label: '默认',
              value: 'butt'
            },
            {
              label: '圆形',
              value: 'round'
            },
            {
              label: '方形',
              value: 'square'
            }
          ],
          onChange: updateFunc('lineCap')
        }
      },
      {
        label: '颜色',
        field: 'color',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange: updateFunc('color')
        }
      },
      {
        label: '选中颜色',
        field: 'activeColor',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange: updateFunc('activeColor')
        }
      },
      {
        label: '浮动颜色',
        field: 'hoverColor',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange: updateFunc('hoverColor')
        }
      },

      {
        label: '线条宽度',
        field: 'lineWidth',
        component: InputNumber,
        componentProps: {
          onChange: updateFunc('lineWidth')
        }
      },
      {
        label: '背景颜色',
        field: 'background',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange: updateFunc('background')
        }
      },
      {
        label: '浮动背景颜色',
        field: 'hoverBackground',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange: updateFunc('hoverBackground')
        }
      },
      {
        label: '选中背景颜色',
        field: 'activeBackground',
        event: 'change',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange: updateFunc('activeBackground')
        }
      },
      {
        label: '透明度',
        field: 'globalAlpha',
        component: InputNumber,
        componentProps: {
          min: 0,
          step: 0.1,
          max: 1,
          onChange: updateFunc('globalAlpha')
        }
      },
      {
        label: '阴影颜色',
        field: 'shadowColor',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange: updateFunc('shadowColor')
        }
      },
      {
        label: '阴影模糊',
        field: 'shadowBlur',
        component: InputNumber,
        componentProps: {
          min: 0,
          step: 1,
          max: Infinity,
          onChange: updateFunc('shadowBlur')
        }
      },
      {
        label: '文字阴影',
        field: 'textHasShadow',
        component: Switch,
        componentProps: {
          type: 'checked',
          onChange: updateFunc('textHasShadow')
        }
      }
    ]
  }
]

export const canvasSchema = [
  {
    title: '文件', //显示名
    children: [
      {
        label: '文件名',
        field: 'name',
        component: Input,
        componentProps: {
          type: 'text',
          placeholder: '请输入文件名',
          onChange(value: string) {
            meta2d.store.data.name = value
          }
        }
      }
    ]
  },

  {
    title: '画布', //显示名
    children: [
      {
        label: '默认颜色',
        field: 'color',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange(value: string) {
            meta2d.setOptions({
              color: value
            })
            meta2d.render()
          }
        }
      },
      {
        label: '画笔填充颜色',
        field: 'penBackground',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange(value: string) {
            meta2d.store.data.penBackground = value
            meta2d.render()
          }
        }
      },
      {
        label: '背景颜色',
        field: 'background',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange(value: string) {
            meta2d.setBackgroundColor(value)
            meta2d.render()
          }
        }
      },
      {
        label: '背景图片',
        field: 'backGroundImage',
        component: Upload,
        componentProps: {
          onChange(fileUrl: string) {
            meta2d.setBackgroundImage(fileUrl)
            meta2d.setBackgroundColor('transparent')
            meta2d.render()
          }
        }
      },
      {
        label: '标尺',
        field: 'rule',
        component: Switch,
        componentProps: {
          type: 'checked',
          onChange(value: boolean) {
            meta2d.setRule({
              rule: value
            })
            meta2d.render()
          }
        }
      },
      {
        label: '标尺颜色',
        field: 'ruleColor',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange(value: string) {
            meta2d.setRule({
              ruleColor: value
            })
            meta2d.render()
          }
        }
      },
      {
        label: '网格',
        field: 'grid',
        component: Switch,
        componentProps: {
          type: 'checked',
          onChange(value: boolean) {
            meta2d.setGrid({
              grid: value
            })
            meta2d.render()
          }
        }
      },
      {
        label: '网格颜色',
        field: 'gridColor',
        component: ColorPicker,
        componentProps: {
          type: 'pureColor',
          onPureColorChange(value: string) {
            meta2d.setGrid({
              gridColor: value
            })
            meta2d.render()
          }
        }
      },
      {
        label: '网格大小',
        field: 'gridSize',
        component: InputNumber,
        componentProps: {
          min: 1,
          max: 100,
          onChange(value: number) {
            meta2d.setGrid({
              gridSize: value
            })
            meta2d.render()
          }
        }
      }
    ]
  }
]

export const lineSchema = [
  {
    title: '动画',
    children: []
  }
]

export const textSchema: FormSchema[] = [
  {
    label: '设备',
    field: 'deviceSn',
    component: Select,
    componentProps: {
      options: toRef(params, 'selectList'),
      fieldNames: { label: 'deviceName', value: 'deviceSn' },
      async onChange(val: string, form: any, schema: any) {
        form.flag = ''
        const productSn = toRef(params, 'selectList').value.find(
          (item: any) => item.deviceSn === val
        )?.productSn
        const res = await apiRef.value.getDeviceFeatureList(productSn)
        let findItem = schema.find((item: any) => item.field == 'flag')
        findItem.componentProps.options = res
        form.dataResource = [
          {
            ...form?.dataResource?.[0],
            fromType: 2,
            resourceSn: `${productSn}:${val}`
          }
        ]
      }
    }
  },
  {
    label: '设备属性',
    field: 'flag',
    component: Select,
    componentProps: {
      options: toRef(params, 'flagOptions'),
      fieldNames: { label: 'name', value: 'flag' },
      onChange(val: string, form: any, schema: any) {
        const findItem = schema.find((item: any) => item.field == 'flag')
        const curr = findItem.componentProps.options.find(
          (item: any) => item.flag == val
        )
        if (curr) {
          form['dataResource'] = [
            {
              ...form?.['dataResource']?.[0],
              flag: curr.flag,
              unit: curr.unitFlag,
              showName: curr.name
            }
          ]
        }
      }
    }
  }
]

export const echartsSchema: FormSchema[] = [
  {
    label: '数据区间',
    field: 'interval',
    component: Select,
    componentProps: {
      options: [
        {
          label: '自定义时间段',
          value: '0'
        },
        {
          label: '最近5分钟',
          value: '1'
        },
        {
          label: '最近15分钟',
          value: '2'
        },
        {
          label: '最近30分钟',
          value: '3'
        }
      ],
      onChange(_: any, form: any) {
        form.flag = []
      }
    }
  },
  {
    label: '',
    ifShow: (formModal: any) => formModal.interval === '0',
    field: 'range',
    component: RangePicker,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      onChange(value: string[], form: any) {
        form.startTime = value[0]
        form.endTime = value[1]
      }
    }
  },
  {
    label: '聚合时间段',
    field: 'timePeriod',
    component: Select,
    componentProps: {
      options: [
        {
          label: '不聚合',
          value: '0'
        },
        {
          label: '30秒',
          value: '1'
        },
        {
          label: '1分钟',
          value: '2'
        },
        {
          label: '2分钟',
          value: '3'
        }
      ],
      onChange(_: any, form: any) {
        form.periodWay = ''
      }
    }
  },
  {
    label: '聚合方式',
    field: 'periodWay',
    component: Select,
    ifShow: (formModal: any) => formModal.timePeriod !== '0',
    componentProps: {
      options: [
        {
          label: '平均值',
          value: '1'
        },
        {
          label: '最大值',
          value: '2'
        },
        {
          label: '最小值',
          value: '3'
        }
      ]
    }
  },
  {
    label: '',
    field: 'dataResource',
    component: CardItem,
    componentProps: {
      addText: '添加数据源',
      children: [
        {
          label: '数据源类型',
          field: 'fromType',
          component: Select,
          componentProps: {
            options: [
              {
                label: '产品',
                value: '1'
              },
              {
                label: '设备',
                value: '2'
              }
            ]
          }
        },
        {
          label: '选择数据源',
          field: 'sn',
          component: Select,
          componentProps: {
            options: toRef(params, 'selectList'),
            fieldNames: { label: 'deviceName', value: 'deviceSn' },
            async onChange(value: string, form: any, schema: any) {
              form.flag = ''
              const productSn = toRef(params, 'selectList').value.find(
                (item: any) => item.deviceSn == value
              ).productSn

              // formType 是设备-2 拼  else 就是sn
              if (form.fromType == '2') {
                form['resourceSn'] = productSn + ':' + value
              } else {
                form['resourceSn'] = value
              }

              const res = await apiRef.value.getDeviceFeatureList(productSn)
              let findItem = schema.find((item: any) => item.field == 'flag')
              findItem.componentProps.options = res
            }
          }
        },
        {
          label: '选择属性',
          field: 'flag',
          component: Select,
          componentProps: {
            fieldNames: { label: 'name', value: 'flag' },
            options: [],
            onChange(value: string, form: any, schema: any) {
              const fieldItem = schema.find(
                (item: any) => item.field === 'flag'
              )
              form.unit = fieldItem.unitFlag
            }
          }
        },
        {
          label: '显示名称',
          field: 'showName',
          component: Input
        }
      ]
    }
  }
]

// export const map = [

//   {
//     title: "文字",
//     multiShow: true,
//     children: [
//       {
//         title: "字体名",
//         type: "select",
//         multiShow: true,
//         prop: "fontFamily",
//         option: {
//           placeholder: "请选择字体",
//           list: [
//             {
//               label: "宋体",
//               value: "宋体",
//             },
//             {
//               label: "黑体",
//               value: "黑体",
//             },
//           ],
//         },
//         bindProp: m,
//         event: "change",
//         func: updateFunc("fontFamily"),
//       },
//       {
//         title: "字体大小",
//         type: "number",
//         multiShow: true,
//         prop: "fontSize",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("fontSize"),
//       },
//       {
//         title: "字体颜色",
//         type: "color",
//         multiShow: true,
//         prop: "textColor",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("textColor"),
//       },
//       {
//         title: "浮动字体颜色",
//         type: "color",
//         multiShow: true,
//         prop: "hoverTextColor",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("hoverTextColor"),
//       },
//       {
//         title: "选中字体颜色",
//         type: "color",
//         multiShow: true,
//         prop: "activeTextColor",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("activeTextColor"),
//       },
//       {
//         title: "文字背景颜色",
//         type: "color",
//         multiShow: true,
//         prop: "textBackground",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("textBackground"),
//       },
//       {
//         title: "水平对齐",
//         type: "select",
//         multiShow: true,
//         prop: "textAlign",
//         option: {
//           placeholder: "请选择对齐方式",
//           list: [
//             {
//               label: "左对齐",
//               value: "left",
//             },
//             {
//               label: "居中对齐",
//               value: "center",
//             },
//             {
//               label: "右对齐",
//               value: "right",
//             },
//           ],
//         },
//         bindProp: m,
//         event: "change",
//         func: updateFunc("textAlign"),
//       },
//       {
//         title: "垂直对齐",
//         type: "select",
//         multiShow: true,
//         prop: "textBaseline",
//         option: {
//           placeholder: "请选择对齐方式",
//           list: [
//             {
//               label: "顶部对齐",
//               value: "top",
//             },
//             {
//               label: "居中对齐",
//               value: "center",
//             },
//             {
//               label: "底部对齐",
//               value: "bottom",
//             },
//           ],
//         },
//         bindProp: m,
//         event: "change",
//         func: updateFunc("textBaseline"),
//       },
//       {
//         title: "行高",
//         type: "number",
//         multiShow: true,
//         option: {
//           step: 0.1,
//         },
//         prop: "lineHeight",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("lineHeight"),
//       },
//       {
//         title: "换行",
//         type: "select",
//         multiShow: true,
//         prop: "whiteSpace",
//         option: {
//           placeholder: "请选择换行方式",
//           list: [
//             {
//               label: "默认",
//               value: "nowrap",
//             },
//             {
//               label: "不换行",
//               value: "nowrap",
//             },
//             {
//               label: "回车换行",
//               value: "pre-line",
//             },
//             {
//               label: "永远换行",
//               value: "break-all",
//             },
//           ],
//         },
//         bindProp: m,
//         event: "change",
//         func: updateFunc("whiteSpace"),
//       },
//       {
//         title: "文字宽度",
//         type: "number",
//         multiShow: true,
//         option: {
//           min: 0,
//         },
//         prop: "textWidth",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("textWidth"),
//       },
//       {
//         title: "文字高度",
//         type: "number",
//         multiShow: true,
//         option: {
//           min: 0,
//         },
//         prop: "textHeight",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("textHeight"),
//       },
//       {
//         title: "超出省略",
//         type: "switch",
//         prop: "ellipsis",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("ellipsis"),
//       },
//       {
//         title: "隐藏文字",
//         type: "switch",
//         prop: "hiddenText",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("hiddenText"),
//       },
//       {
//         title: "文字内容",
//         type: "input",
//         option: {
//           type: "textarea",
//         },
//         prop: "text",
//         bindProp: m,
//         event: "input",
//         func: updateFunc("text"),
//       },
//     ],
//   },
//   {
//     title: "禁止",
//     multiShow: false,
//     children: [
//       {
//         title: "禁止输入",
//         type: "switch",
//         prop: "disableInput",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("disableInput"),
//       },
//       {
//         title: "禁止旋转",
//         type: "switch",
//         prop: "disableRotate",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("disableRotate"),
//       },
//       {
//         title: "禁止缩放",
//         type: "switch",
//         prop: "disableSize",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("disableSize"),
//       },
//       {
//         title: "禁止锚点",
//         type: "switch",
//         prop: "disableAnchor",
//         bindProp: m,
//         event: "change",
//         func: updateFunc("disableAnchor"),
//       },
//     ],
//   },
// ];
