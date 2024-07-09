import { BasicTitle } from '../../Basic'
import { Collapse, CollapsePanel } from 'ant-design-vue'
import { RightOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, watch } from 'vue'
import { useDesign } from '@shy-plugins/use'
import dayjs from 'dayjs'
import './style/process.less'
import { ShyTag } from '../../ShyTag'

// const ProcessTag = defineComponent({
//   props: {
//     options: {
//       type: Array as PropType<Recordable[]>,
//       default: () => []
//     },
//     value: {
//       type: [String, Number]
//     },
//     isTag: {
//       type: Boolean,
//       default: true
//     }
//   },
//   setup(props) {
//     const { prefixCls } = useDesign('process-tag')

//     const tag = computed(() => {
//       const option = props.options.find(
//         (item) => item.value == props.value
//       ) ?? {
//         label: '-',
//         colorType: 'var(--gray-4)',
//         cssClass: ''
//       }

//       return props.isTag ? (
//         <Tag style={{ '--color': option.colorType }}>{option.label}</Tag>
//       ) : (
//         <span
//           class={[prefixCls, option.cssClass]}
//           style={{ '--color': option.colorType }}
//         >
//           {option.label}
//         </span>
//       )
//     })

//     return () => {
//       return tag.value
//     }
//   }
// })

const Process = defineComponent({
  props: {
    title: {
      type: String,
      default: '流程跳转信息'
    },
    data: {
      type: Array as PropType<Recordable[]>,
      default: () => {
        return []
      }
    },
    options: {
      type: Array as PropType<Recordable[]>,
      default: () => {
        return []
      }
    },
    fieldNames: {
      type: Object,
      default: () => {
        return {
          key: 'id',
          status: 'result',
          title: 'name',
          time: 'createTime',
          children: 'userList'
        }
      }
    },
    labelWidth: {
      type: Number,
      default: 60
    },
    columns: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    },
    timeFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  setup(props) {
    const { prefixCls } = useDesign('process')

    const allCollapseKey = ref<any[]>([])

    watch(
      () => props.data,
      (val) => {
        allCollapseKey.value = val.map((item) => item[props.fieldNames.key])
      },
      {
        immediate: true
      }
    )

    const renderColumns = (record) => {
      const getTreeData = (data, deep = 0) => {
        const renderTime = (record) =>
          record[props.fieldNames.time] ? (
            <div class={`${prefixCls}-body-group-time`}>
              {dayjs(record[props.fieldNames.time]).format(props.timeFormat)}
            </div>
          ) : null

        if (data[props.fieldNames.children]) {
          return data[props.fieldNames.children].map((ele) => {
            return (
              <div class={`${prefixCls}-body-group`}>
                {getTreeData(ele, ++deep)}
                {renderTime(ele)}
              </div>
            )
          })
        }

        const columns = props.columns.map((item) => {
          const { labelWidth = props.labelWidth, customRender } = item

          return (
            <div class={`${prefixCls}-body-item`}>
              <div
                class={`${prefixCls}-body-item-label`}
                style={{
                  '--label-width':
                    typeof labelWidth === 'number'
                      ? `${labelWidth}px`
                      : labelWidth
                }}
              >
                {item.title}
              </div>
              <div class={`${prefixCls}-body-item-value`}>
                {item.tag ? (
                  <ShyTag
                    isTag={true}
                    tagMode='text'
                    value={data[item.dataIndex]}
                    options={item.options ?? props.options}
                  ></ShyTag>
                ) : customRender ? (
                  customRender(data)
                ) : (
                  data[item.dataIndex]
                )}
              </div>
            </div>
          )
        })

        return !deep ? (
          <div class={`${prefixCls}-body-group`}>
            {columns}
            {renderTime(data)}
          </div>
        ) : (
          columns
        )
      }

      return getTreeData(record)
    }

    const renderCollapsePanel = () => {
      return props.data.map((item) => {
        return (
          <CollapsePanel
            key={item[props.fieldNames.key]}
            class={`${prefixCls}-item`}
          >
            {{
              header: () => item[props.fieldNames.title],
              extra: () => (
                <ShyTag
                  isTag
                  tagMode='tag'
                  value={item[props.fieldNames.status]}
                  options={props.options}
                />
              ),
              default: () => renderColumns(item)
            }}
          </CollapsePanel>
        )
      })
    }

    return () => {
      return (
        <div class={`${prefixCls}-wrapper`}>
          <div class={`${prefixCls}-header`}>
            <BasicTitle>{props.title}</BasicTitle>
          </div>
          <div class={`${prefixCls}-body`}>
            <Collapse v-model:activeKey={allCollapseKey.value} bordered={false}>
              {{
                expandIcon: ({ isActive }) => (
                  <RightOutlined
                    rotate={isActive ? 90 : 0}
                    style={{
                      color: isActive ? 'var(--primary-5)' : 'var(--text-color)'
                    }}
                  />
                ),
                default: () => renderCollapsePanel()
              }}
            </Collapse>
          </div>
        </div>
      )
    }
  }
})

export { Process }
