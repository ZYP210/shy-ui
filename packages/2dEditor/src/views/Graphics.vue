<template>
  <div class="graphics">
    <div :header="item.name" v-for="item in graphicGroups" :key="item.name">
      <div class="flex flex-wrap">
        <template v-for="elem in item.list">
          <div
            class="graphic"
            :draggable="true"
            @dragstart="dragStart($event, elem)"
            @click.prevent="dragStart($event, elem)"
          >
            <img
              style="width: 50px; height: 50px"
              v-if="elem?.data?.image"
              :src="elem?.data?.image"
              alt=""
            />

            <svg v-else class="l-icon" aria-hidden="true">
              <use :xlink:href="'#' + elem.icon"></use>
            </svg>
            <p :title="elem.name">{{ elem.name }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { parseSvg } from '@meta2d/svg'
import { deepClone } from '@meta2d/core'
import { ReplaceMode } from '@meta2d/chart-diagram'
// import {
//   Collapse as ACollapse,
//   CollapsePanel as ACollapsePanel,
// } from 'ant-design-vue';
import axios from 'axios'

// const getImgRaw = async (url) => {
//   const raw = await import(url + '?worker&inline');

//   return raw.default;
// };

function getImageUrl(name) {
  return new URL(`${name}`, import.meta.url).href
}

const modules = import.meta.glob('/lib/assets/icons/**/*', {
  as: 'raw',
  eager: true
})

const graphic = Object.keys(modules).reduce((acc: any, cur) => {
  // 使用 split 方法将路径以斜杠分割成数组
  const pathParts = cur.split('/')
  const pathList = cur.split('.')

  // 获取数组中的倒数第二个元素
  const name = pathParts[pathParts.length - 2]
  const title = pathParts[pathParts.length - 1]
  const url = cur
  const type = pathList[pathList.length - 1]
  const penName = type === 'gif' ? 'gif' : 'image'

  const temp = acc.find((item: any) => {
    return item.name === name
  })

  console.log(1, url)

  if (temp) {
    temp.list.push({
      name: title,
      data: { image: url, name: penName, width: 100, height: 100 }
    })
  } else {
    acc.push({
      name,
      list: [
        {
          name: title,
          data: { width: 100, height: 100, image: url, name: penName }
        }
      ]
    })
  }

  return acc
}, [])

const echarts = [
  {
    name: 'Echarts图表',
    show: true,
    list: [
      {
        name: '折线图',
        icon: 'l-line-chart',
        data: {
          name: 'echarts',
          width: 400,
          height: 300,
          externElement: true,
          form: [
            {
              key: 'dataY',
              name: '数据',
              type: 'text',
              readonly: true,
              placeholder: '仅绑定变量',
              multiple: true,
              isTime: false,
              isYCategory: false
            },
            {
              key: 'echarts',
              name: 'echarts',
              type: 'code',
              language: 'json',
              isNotString: true
            },
            {
              key: 'echarts',
              key2: 'max',
              type: 'number',
              name: '最大数量',
              placeholder: 'x'
            }
          ],
          disableAnchor: true,
          echarts: {
            option: {
              grid: {
                top: 10,
                bottom: 50,
                left: 40,
                right: 5
              },
              dataZoom: [
                {
                  height: 16,
                  bottom: 10
                }
              ],
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: {
                  fontSize: 12
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  fontSize: 12
                }
              },
              series: [
                {
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  type: 'line'
                }
              ]
            },
            max: 100
          }
        }
      },
      {
        name: '柱状图',
        icon: 'l-bar-chart',
        data: {
          width: 300,
          height: 200,
          disableAnchor: true,
          externElement: true,
          name: 'echarts',
          form: [
            {
              key: 'dataY',
              name: '数据',
              type: 'text',
              readonly: true,
              placeholder: '仅绑定变量',
              multiple: true,
              isTime: false,
              isYCategory: false
            },
            {
              key: 'echarts',
              name: 'echarts',
              type: 'code',
              language: 'json',
              isNotString: true
            },
            {
              key: 'echarts',
              key2: 'max',
              type: 'number',
              name: '最大数量',
              placeholder: 'x'
            }
          ],
          echarts: {
            option: {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                  alignWithLabel: true
                }
              },
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '直接访问',
                  type: 'bar',
                  barWidth: '60%',
                  data: [10, 52, 200, 334, 390, 330, 220]
                }
              ]
            },
            max: 100
          }
        }
      },
      {
        name: '饼图',
        icon: 'l-pie-chart',
        data: {
          width: 200,
          height: 200,
          disableAnchor: true,
          externElement: true,
          name: 'echarts',
          form: [
            {
              key: 'dataY',
              name: '数据',
              type: 'text',
              readonly: true,
              placeholder: '仅绑定变量',
              multiple: true
            },
            {
              key: 'echarts',
              name: 'echarts',
              type: 'code',
              language: 'json',
              isNotString: true
            },
            {
              key: 'echarts',
              key2: 'max',
              type: 'number',
              name: '最大数量',
              placeholder: 'x'
            }
          ],
          echarts: {
            option: {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {},
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                  ]
                }
              ]
            },
            replaceMode: ReplaceMode.Replace
          }
        }
      },
      {
        name: '仪表盘',
        icon: 'l-dashboard-chart',
        data: {
          width: 300,
          height: 300,
          disableAnchor: true,
          externElement: true,
          name: 'echarts',
          form: [
            {
              key: 'dataY',
              name: '数据',
              type: 'text',
              readonly: true,
              placeholder: '仅绑定变量',
              multiple: true
            },
            {
              key: 'echarts',
              name: 'echarts',
              type: 'code',
              language: 'json',
              isNotString: true
            },
            {
              key: 'echarts',
              key2: 'max',
              type: 'number',
              name: '最大数量',
              placeholder: 'x'
            }
          ],
          echarts: {
            option: {
              tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
              },
              series: [
                {
                  name: '业务指标',
                  type: 'gauge',
                  detail: { formatter: '{value}%' },
                  data: [{ value: 50, name: '完成率' }]
                }
              ]
            },
            replaceMode: ReplaceMode.Replace
          }
        }
      },
      {
        name: '水位图',
        icon: 'l-dashboard-chart',
        data: {
          width: 300,
          height: 300,
          disableAnchor: true,
          externElement: true,
          name: 'shuiweitu',
          echarts: {
            option: {
              series: [
                {
                  type: 'liquidFill',
                  data: [0.65],
                  shape: 'container',
                  outline: {
                    show: false
                  }
                }
              ]
            },
            replaceMode: ReplaceMode.Replace
          }
        }
      }
    ]
  }
]

const graphicGroups = [
  {
    name: '基本形状',
    show: true,
    list: [
      {
        name: '文字',
        icon: 'l-text',
        id: 16,
        data: {
          text: `测试`,
          width: 160,
          height: 30,
          name: 'text'
        }
      },
      {
        name: '正方形',
        icon: 'l-rect',
        id: 1,
        data: {
          width: 100,
          height: 100,
          name: 'square'
        }
      },
      {
        name: '矩形',
        icon: 'l-rectangle',
        id: 2,
        data: {
          width: 200,
          height: 50,
          borderRadius: 0.1,
          name: 'rectangle'
        }
      },
      {
        name: '圆',
        icon: 'l-circle',
        id: 3,
        data: {
          width: 100,
          height: 100,
          name: 'circle'
        }
      },
      {
        name: '三角形',
        icon: 'l-triangle',
        id: 4,
        data: {
          width: 100,
          height: 100,
          name: 'triangle'
        }
      },
      {
        name: '菱形',
        icon: 'l-diamond',
        id: 5,
        data: {
          width: 100,
          height: 100,
          name: 'diamond'
        }
      },
      {
        name: '五边形',
        icon: 'l-pentagon',
        id: 6,
        data: {
          width: 100,
          height: 100,
          name: 'pentagon'
        }
      },
      {
        name: '六边形',
        icon: 'l-hexagon',
        id: 7,
        data: {
          width: 100,
          height: 100,
          name: 'hexagon'
        }
      },
      {
        name: '五角星',
        icon: 'l-pentagram',
        id: 8,
        data: {
          width: 100,
          height: 100,
          name: 'pentagram'
        }
      },
      {
        name: '左箭头',
        icon: 'l-arrow-left',
        id: 9,
        data: {
          width: 120,
          height: 60,
          name: 'leftArrow'
        }
      },
      {
        name: '右箭头',
        icon: 'l-arrow-right',
        id: 10,
        data: {
          width: 120,
          height: 60,
          name: 'rightArrow'
        }
      },
      {
        name: '双向箭头',
        icon: 'l-twoway-arrow',
        id: 11,
        data: {
          width: 150,
          height: 60,
          name: 'twowayArrow'
        }
      },
      {
        name: '云',
        icon: 'l-cloud',
        id: 13,
        data: {
          width: 100,
          height: 100,
          name: 'cloud'
        }
      },
      {
        name: '消息框',
        icon: 'l-msg',
        id: 14,
        data: {
          textTop: -0.1,
          width: 100,
          height: 100,
          name: 'message'
        }
      },
      {
        name: '文件',
        icon: 'l-file',
        id: 15,
        data: {
          width: 80,
          height: 100,
          name: 'file'
        }
      },
      {
        name: '立方体',
        icon: 'l-cube',
        id: 18,
        data: {
          width: 60,
          height: 100,
          name: 'cube',
          z: 0.25,
          props: {
            custom: [
              {
                key: 'z',
                label: 'Z',
                type: 'number',
                min: 0,
                placeholder: '<= 1 即宽度的比例'
              },
              {
                key: 'backgroundFront',
                label: '前背景色',
                type: 'color'
              },
              {
                key: 'backgroundUp',
                label: '顶背景色',
                type: 'color'
              },
              {
                key: 'backgroundRight',
                label: '右背景色',
                type: 'color'
              }
            ]
          }
        }
      },
      {
        name: '人',
        icon: 'l-people',
        id: 19,
        data: {
          width: 70,
          height: 100,
          name: 'people'
        }
      }
    ]
  },
  ...echarts,
  {
    name: '流程图',
    show: true,
    list: [
      {
        name: '开始/结束',
        icon: 'l-flow-start',
        id: 21,
        data: {
          text: '开始/结束',
          width: 120,
          height: 40,
          borderRadius: 0.5,
          name: 'rectangle'
        }
      },
      {
        name: '流程',
        icon: 'l-rectangle',
        id: 22,
        data: {
          text: '流程',
          width: 120,
          height: 40,
          name: 'rectangle'
        }
      },
      {
        name: '判定',
        icon: 'l-diamond',
        id: 23,
        data: {
          text: '判定',
          width: 120,
          height: 60,
          name: 'diamond'
        }
      },
      {
        name: '数据',
        icon: 'l-flow-data',
        id: 24,
        data: {
          text: '数据',
          width: 120,
          height: 50,
          name: 'flowData',
          offsetX: 0.14
        }
      },
      {
        name: '准备',
        icon: 'l-flow-ready',
        id: 25,
        data: {
          text: '准备',
          width: 120,
          height: 50,
          name: 'hexagon'
        }
      },
      {
        name: '子流程',
        icon: 'l-flow-subprocess',
        id: 26,
        data: {
          text: '子流程',
          width: 120,
          height: 50,
          name: 'flowSubprocess'
        }
      },
      {
        name: '数据库',
        icon: 'l-db',
        id: 27,
        data: {
          text: '数据库',
          width: 80,
          height: 120,
          name: 'flowDb'
        }
      },
      {
        name: '文档',
        icon: 'l-flow-document',
        id: 28,
        data: {
          text: '文档',
          width: 120,
          height: 100,
          name: 'flowDocument'
        }
      },
      {
        name: '内部存储',
        icon: 'l-internal-storage',
        id: 29,
        data: {
          text: '内部存储',
          width: 120,
          height: 80,
          name: 'flowInternalStorage'
        }
      },
      {
        name: '外部存储',
        icon: 'l-extern-storage',
        id: 30,
        data: {
          text: '外部存储',
          width: 120,
          height: 80,
          name: 'flowExternStorage'
        }
      },
      {
        name: '队列',
        icon: 'l-flow-queue',
        id: 31,
        data: {
          text: '队列',
          width: 100,
          height: 100,
          name: 'flowQueue'
        }
      },
      {
        name: '手动输入',
        icon: 'l-flow-manually',
        id: 32,
        data: {
          text: '手动输入',
          width: 120,
          height: 80,
          name: 'flowManually'
        }
      },
      {
        name: '展示',
        icon: 'l-flow-display',
        id: 33,
        data: {
          text: '展示',
          width: 120,
          height: 80,
          name: 'flowDisplay'
        }
      },
      {
        name: '并行模式',
        icon: 'l-flow-parallel',
        id: 34,
        data: {
          text: '并行模式',
          width: 120,
          height: 50,
          name: 'flowParallel'
        }
      },
      {
        name: '注释',
        icon: 'l-flow-comment',
        id: 35,
        data: {
          text: '注释',
          width: 100,
          height: 100,
          name: 'flowComment'
        }
      }
    ]
  },
  {
    name: '活动图',
    show: true,
    list: [
      {
        name: '开始',
        icon: 'l-inital',
        id: 36,
        data: {
          text: '',
          width: 30,
          height: 30,
          name: 'circle',
          background: '#555',
          lineWidth: 0
        }
      },
      {
        name: '结束',
        icon: 'l-final',
        id: 37,
        data: {
          width: 30,
          height: 30,
          name: 'activityFinal'
        }
      },
      {
        name: '活动',
        icon: 'l-action',
        id: 38,
        data: {
          text: '活动',
          width: 120,
          height: 50,
          borderRadius: 0.25,
          name: 'rectangle'
        }
      },
      {
        name: '决策/合并',
        icon: 'l-diamond',
        id: 39,
        data: {
          text: '决策/合并',
          width: 120,
          height: 50,
          name: 'diamond'
        }
      },
      {
        name: '垂直泳道',
        icon: 'l-swimlane-v',
        id: 40,
        data: {
          text: '垂直泳道',
          width: 200,
          height: 500,
          name: 'swimlaneV',
          textBaseline: 'top',
          textTop: 20,
          // textHeight: ,
          lineTop: 0.08
        }
      },
      {
        name: '水平泳道',
        icon: 'l-swimlane-h',
        id: 41,
        data: {
          text: '水平泳道',
          width: 500,
          height: 200,
          name: 'swimlaneH',
          textWidth: 0.01,
          textLeft: 0.04,
          textAlign: 'left',
          lineLeft: 0.08
        }
      },
      {
        name: '垂直分岔/汇合',
        icon: 'l-fork-v',
        id: 42,
        data: {
          text: '垂直分岔/汇合',
          width: 10,
          height: 150,
          name: 'forkV',
          fillStyle: '#555',
          strokeStyle: 'transparent'
        }
      },
      {
        name: '水平分岔/汇合',
        icon: 'l-fork',
        id: 43,
        data: {
          text: '水平分岔/汇合',
          width: 150,
          height: 10,
          name: 'forkH',
          fillStyle: '#555',
          strokeStyle: 'transparent'
        }
      }
    ]
  },
  {
    name: '时序图和类图',
    show: true,
    list: [
      {
        name: '生命线',
        icon: 'l-lifeline',
        id: 44,
        data: {
          text: '生命线',
          width: 150,
          height: 400,
          textHeight: 50,
          name: 'lifeline'
        }
      },
      {
        name: '激活',
        icon: 'l-focus',
        id: 45,
        data: {
          text: '激活',
          width: 12,
          height: 200,
          name: 'sequenceFocus'
        }
      },
      {
        name: '简单类',
        icon: 'l-simple-class',
        id: 46,
        data: {
          text: 'Topolgoy',
          width: 270,
          height: 200,
          textHeight: 200,
          name: 'simpleClass',
          textAlign: 'center',
          textBaseline: 'top',
          textTop: 10,
          list: [
            {
              text: '- name: string\n+ setName(name: string): void'
            }
          ]
        }
      },
      {
        name: '类',
        icon: 'l-class',
        id: 47,
        data: {
          text: 'Topolgoy',
          width: 270,
          height: 200,
          textHeight: 200,
          name: 'interfaceClass',
          textAlign: 'center',
          textBaseline: 'top',
          textTop: 10,
          list: [
            {
              text: '- name: string'
            },
            {
              text: '+ setName(name: string): void'
            }
          ]
        }
      }
    ]
  },
  ...graphic,
  {
    name: '自定义svg',
    show: true,
    list: [
      {
        name: '图片',
        id: 99,
        data: {
          width: 150,
          height: 400,
          textHeight: 50,
          name: 'gif',
          image: '/icons/draughtfan/draughtfan-5.gif'
        }
      },
      {
        name: 'vite',
        id: 100,
        url: '/vite.svg'
      },

      {
        name: '产品介绍',
        id: 101,
        url: '/产品介绍.svg'
      },

      {
        name: '工艺流程',
        id: 103,
        url: '/工艺流程.svg'
      },

      {
        name: 'img',
        id: 102,
        url: '/icons/draughtfan/draughtfan-0'
      }
    ]
  }
]

const dragStart = async (e: any, elem: any) => {
  if (!elem) {
    return
  }

  e.stopPropagation()
  if (elem?.url) {
    const res = await axios.get(elem.url)
    const pens = parseSvg(res.data)
    meta2d.canvas.addCaches = deepClone(pens)
  }

  // 拖拽事件
  if (e instanceof DragEvent) {
    // 设置拖拽数据

    if (elem?.url) {
      const res = await axios.get(elem.url)
      const pens = parseSvg(res.data)

      e.dataTransfer?.setData('Meta2d', JSON.stringify(pens))
    } else {
      e.dataTransfer?.setData('Meta2d', JSON.stringify(elem.data))
    }
  }
}
</script>
<style lang="less" scoped>
.graphics {
  height: calc(100vh - 80px);
  overflow-y: auto;
  border-right: 1px solid var(--color-border);
  z-index: 2;

  .graphic {
    position: relative;
    padding: 10px;
    border-radius: 2px;
    border: 1px solid transparent;
    width: 60px;
    height: 60px;
    background-color: transparent;

    &:hover {
      cursor: pointer;
      border-color: var(--color-primary);
    }
    p {
      padding: 0 8px;
      text-align: center;
      font-size: 12px;
      height: 12px;
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      word-break: break-all;
      -webkit-box-orient: vertical;
    }

    svg {
      color: var(--color);
      height: 28px;
      width: 100%;
      margin: auto;
    }
  }
}
</style>
