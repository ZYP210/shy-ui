import { Table, FormItem } from 'ant-design-vue'
import {
  ref,
  computed,
  watch,
  toRaw,
  inject,
  VNode,
  unref,
  defineComponent,
  CSSProperties,
  nextTick
} from 'vue'
import { useRuleFormItem } from '@shy-plugins/use'

import { buildUUID, isFunction } from '@shy-plugins/utils'
import { ShyComponentMap } from '../ShyComponentMap'
import { cloneDeep, isArray, isEqual, isNil, upperFirst } from 'lodash-es'
import { FormActionType } from '../types/form'
import { Popover } from 'ant-design-vue'
import { reactive } from 'vue'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'
import { ShyTableAction } from '../../../ShyTable'
import { BasicButton } from '../../../Button'
import { JSXComponent } from 'vue'
import { useDesign } from '@shy-plugins/use'

import '../style/formTable.less'

const SHOW_ROW_COUNT = 10
const ROW_HEIGHT = 48.5
const BODY_HEIGHT = ROW_HEIGHT * SHOW_ROW_COUNT

const ShyFormTable = defineComponent({
  props: {
    rowKey: {
      type: String,
      default: () => 'uuid'
    },
    columns: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    },
    value: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    },
    isShowFooter: {
      type: Boolean,
      default: () => false
    },
    footerRender: {
      type: Function as PropType<() => VNode | VNode[] | string | number>,
      default: () => ''
    },
    isShowAddBtn: {
      type: Boolean,
      default: () => true
    },
    isShowAction: {
      type: Boolean,
      default: () => true
    },
    tableAction: {
      type: Function,
      default: (res) => {
        return []
      }
    }
  },
  emits: ['update:value', 'change', 'add', 'remove'],
  setup(props, { emit, attrs }) {
    const { prefixCls } = useDesign('ant-form-table-children')

    const formActionType: FormActionType = inject('formActionType')!
    const tableWrapperRef = ref()
    const tableElRef = ref()

    const curIndex = ref(0)
    const sourceHeight = ref(0)
    const dataSource = ref<Recordable[]>([])
    const emitData = ref<Recordable[]>([])
    const [state] = useRuleFormItem(props, 'value', 'change', emitData)

    const getColumns = computed(() => {
      const indexColumn = {
        title: '序号',
        dataIndex: 'index',
        width: 50,
        maxWidth: 50,
        align: 'center'
      }

      const actionColumn = {
        title: '操作',
        dataIndex: '_action',
        width: 80,
        align: 'left'
      }

      return [
        indexColumn,
        ...props.columns.map((item: any) => ({
          ...item,
          type: item.type ? item.type : 'input'
        })),
        ...(props?.isShowAction ? [actionColumn] : [])
      ]
    })

    const getScrollX = computed(() => {
      let width = 0

      // TODO props ?? 0;
      const NORMAL_WIDTH = 150

      const columns = unref(props.columns).filter((item) => !item.defaultHidden)
      columns.forEach((item) => {
        width += Number.parseFloat(item.width as string) || 0
      })
      const unsetWidthColumns = columns.filter(
        (item) => !Reflect.has(item, 'width')
      )

      const len = unsetWidthColumns.length
      if (len !== 0) {
        width += len * NORMAL_WIDTH
      }

      const table = unref(tableElRef)
      const tableWidth = table?.$el?.offsetWidth ?? 0

      return tableWidth > width ? '100%' : width
    })

    const handleScroll = (e) => {
      const { scrollTop, scrollHeight } = e.target
      if (e.target.className !== `${prefixCls}-scroll-bar-wrapper`) return

      let lenMax = state.value.length,
        nIdx
      if (scrollTop === 0) {
        dataSource.value = state.value.slice(0, SHOW_ROW_COUNT)
        curIndex.value = 0
      } else if (scrollTop === scrollHeight - BODY_HEIGHT) {
        nIdx = lenMax - SHOW_ROW_COUNT
        dataSource.value = state.value.slice(nIdx, nIdx + SHOW_ROW_COUNT)
        curIndex.value = nIdx
      } else {
        nIdx = Math.ceil((scrollTop * lenMax) / scrollHeight)
        if (nIdx !== curIndex.value && nIdx <= lenMax - SHOW_ROW_COUNT) {
          dataSource.value = state.value.slice(nIdx, nIdx + SHOW_ROW_COUNT)
          curIndex.value = nIdx
        }
      }
    }

    const defaultProps = {
      style: { width: '100%' },
      allowClear: true,
      getPopupContainer: () => document.body
    }

    const renderTable = computed(() => {
      return (
        <div ref={tableWrapperRef} class={prefixCls}>
          <Table
            ref={tableElRef}
            columns={getColumns.value}
            scroll={{
              x: state.value.length ? getScrollX.value : undefined,
              y: BODY_HEIGHT
            }}
            data-source={dataSource.value}
            pagination={false}
            bordered={false}
            size="small"
            class={`${prefixCls}-body`}
            align="center"
            rowKey={props.rowKey}
            components={{
              body: {
                cell: renderTd
              }
            }}
          >
            {{
              headerCell: ({ column }) => {
                const renderRequired = () => {
                  if (column.required || column?.rules?.length) {
                    return <span class={`${prefixCls}-body-required`}>*</span>
                  }
                  return null
                }

                return (
                  <>
                    {renderRequired()}
                    <span>{column.title}</span>
                  </>
                )
              },
              bodyCell: ({ column, record, index, ...args }) => {
                const renderFormItem = () => {
                  const componentProps = isFunction(column.componentProps)
                    ? {
                        ...defaultProps,
                        ...column.componentProps({
                          record,
                          column,
                          index,
                          ...args
                        })
                      }
                    : {
                        ...defaultProps,
                        ...column.componentProps
                      }

                  const eventKey = `on${upperFirst('change')}`
                  const isCheck = ['Switch', 'Checkbox'].includes(
                    getType(column.type)
                  )

                  const on = {
                    [eventKey]: (...args: Nullable<Recordable>[]) => {
                      const [e] = args

                      if (componentProps[eventKey] && args.length >= 1) {
                        componentProps[eventKey](...args)
                      }

                      const target = e ? e.target : null
                      const value = target
                        ? isCheck
                          ? target.checked
                          : target.value
                        : e
                      const currValue = state.value.find(
                        (item) => item[props.rowKey] === record[props.rowKey]
                      )

                      currValue![column.dataIndex] = value
                    }
                  }

                  const bindValue: Recordable = {
                    [isCheck ? 'checked' : 'value']: record[column.dataIndex]
                  }

                  const compAttr: Recordable = {
                    ...componentProps,
                    ...on,
                    ...bindValue
                  }

                  return column.dataIndex !== 'index' &&
                    column.type !== 'text' &&
                    column.dataIndex !== '_action' ? (
                    <td class="ant-table-cell" style={renderTdProps(column)}>
                      <FormItem
                        required={column.required}
                        rules={getRules({ column, record, index, ...args })}
                        name={[
                          ...(isArray(attrs.codeField)
                            ? attrs.codeField
                            : [attrs.codeField]),
                          index + curIndex.value,
                          column.dataIndex
                        ]}
                      >
                        <Popover
                          visible={
                            !!rulesRef?.[
                              `${column.dataIndex}-${record[props.rowKey]}Info`
                            ]?.show && !isScroll.value
                          }
                        >
                          {{
                            content: () => (
                              <span class="text-red-500">
                                {
                                  rulesRef[
                                    `${column.dataIndex}-${
                                      record[props.rowKey]
                                    }Info`
                                  ]?.msg
                                }
                              </span>
                            ),
                            default: () => {
                              const Comp: JSXComponent = ShyComponentMap.get(
                                getType(column.type)
                              )!

                              return <Comp {...compAttr} />
                            }
                          }}
                        </Popover>
                      </FormItem>
                    </td>
                  ) : null
                }

                const renderAction = () => {
                  return column.dataIndex === '_action' ? (
                    <td class="ant-table-cell" style={{ textAlign: 'center' }}>
                      <ShyTableAction actions={getActions(record)} />
                    </td>
                  ) : null
                }

                const renderIndex = () => {
                  return column.dataIndex === 'index' ? (
                    <td class="ant-table-cell" style={{ textAlign: 'center' }}>
                      {index + curIndex.value + 1}
                    </td>
                  ) : null
                }

                return (
                  renderFormItem() ??
                  renderAction() ??
                  renderIndex() ?? (
                    <td class="ant-table-cell" style={renderTdProps(column)}>
                      {record[column.dataIndex]}
                    </td>
                  )
                )
              }
            }}
          </Table>
          <div
            class={`${prefixCls}-scroll-bar-wrapper`}
            style={{ '--height': `${BODY_HEIGHT}px` }}
          >
            <div
              class={`${prefixCls}-scroll-bar-inner`}
              style={{ '--height': `${sourceHeight.value}px` }}
            ></div>
          </div>
        </div>
      )
    })

    const create = () => {
      state.value = [...toRaw(state.value), { [props.rowKey]: buildUUID() }]
      curIndex.value = 0
      nextTick(() => {
        document.querySelector(`.${prefixCls}-scroll-bar-wrapper`)!.scrollTop =
          (state.value.length + 1) * ROW_HEIGHT
      })
      emit('add', state.value)
    }

    const remove = (index) => {
      curIndex.value -= curIndex.value === 0 ? 0 : 1
      const tempState = state.value.filter((item: any) => {
        return item[props.rowKey] !== index
      })
      tempState.forEach((item: any) => (item[props.rowKey] = buildUUID()))
      state.value = [...tempState]
      emit('remove', state.value, index)
    }

    const rulesRef = reactive({})
    const getRules = ({ column, record, index, ...args }) => {
      const errKey = `${column.dataIndex}-${record[props.rowKey]}Info`
      if (!column.required && !column.rules) return []
      if (rulesRef[errKey]?.rules) return rulesRef[errKey]?.rules
      rulesRef[errKey] = {
        rules: [],
        show: false,
        msg: ''
      }
      if (!column.rules && column.required) {
        rulesRef[errKey].rules = [
          {
            required: true,
            validator: (rule, value) => {
              const prefix = column.type.toLocaleLowerCase().includes('input')
                ? '请输入'
                : '请选择'
              const errMsg = `${prefix}${column.title}`
              if (value) {
                rulesRef[errKey].show = false
                return Promise.resolve()
              }
              rulesRef[errKey].show = true
              rulesRef[errKey].msg = errMsg
              return Promise.reject(errMsg)
            }
          }
        ]
        return rulesRef[errKey].rules
      }
      if (!isArray(column.rules)) return column.rules
      rulesRef[errKey].rules = cloneDeep(column.rules)
      rulesRef[errKey].rules.forEach((item) => {
        if (!item.validator || !isFunction(item.validator)) {
          item.validator = async (rule, value) => {
            rulesRef[errKey].show = false
            if (!rule.pattern && !rule.required) return Promise.resolve()

            if ((column.required || rule.required) && isNil(value)) {
              const prefix = column.type.toLocaleLowerCase().includes('input')
                ? '请输入'
                : '请选择'
              const errMsg = `${prefix}${column.title}`
              rulesRef[errKey].show = true
              rulesRef[errKey].msg = errMsg
              return Promise.reject(errMsg)
            }
            if (rule.pattern && !rule.pattern.test(value)) {
              rulesRef[errKey].show = true
              rulesRef[errKey].msg = rule.message
              return Promise.reject(rule.message)
            }

            return Promise.resolve()
          }

          return
        }
        const validator = item.validator
        item.validator = async (rule, value) => {
          try {
            rulesRef[errKey].show = false
            return await validator(
              rule,
              value,
              { column, record, ...args },
              formActionType
            )
          } catch (error) {
            rulesRef[errKey].show = true
            rulesRef[errKey].msg = error
            return Promise.reject(error)
          }
        }
      })

      return rulesRef[errKey].rules
    }

    const getActions = (record) => {
      return [
        {
          label: '删除',
          popConfirm: {
            title: '确定删除',
            confirm: remove.bind(null, record[props.rowKey])
          }
        },
        ...props.tableAction(record)
      ]
    }

    const getType = (type) => {
      switch (type) {
        case 'input':
          return 'Input'
        case 'select':
          return 'Select'
        case 'datePicker':
          return 'DatePicker'
        case 'number':
          return 'InputNumber'
        default:
          return type
      }
    }

    watch(
      () => state.value,
      (v, old) => {
        if (!isEqual(toRaw(v), toRaw(old))) {
          state.value = toRaw(v).map((ele: any) => {
            return {
              ...ele,
              [props.rowKey]: ele[props.rowKey] || buildUUID()
            }
          })
          sourceHeight.value = v.length * ROW_HEIGHT

          dataSource.value =
            v.length > SHOW_ROW_COUNT
              ? v.slice(curIndex.value, curIndex.value + SHOW_ROW_COUNT)
              : v.slice(0, SHOW_ROW_COUNT)
        }
      },
      {
        deep: true
      }
    )

    const isScroll = ref(false)
    const timer = ref<NodeJS.Timeout>()
    onMounted(() => {
      window.addEventListener(
        'scroll',
        (e) => {
          clearTimeout(timer.value)
          timer.value = setTimeout(() => {
            isScroll.value = false
          }, 500)
          if (isScroll.value) return
          isScroll.value = true
        },
        true
      )
      tableWrapperRef.value.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault()
          if (state.value.length <= SHOW_ROW_COUNT) {
            return
          }

          if (
            e.deltaY > 0 &&
            curIndex.value + SHOW_ROW_COUNT < state.value.length
          ) {
            dataSource.value = state.value.slice(
              ++curIndex.value,
              curIndex.value + SHOW_ROW_COUNT
            )
          }
          if (e.deltaY < 0 && curIndex.value > 0) {
            dataSource.value = state.value.slice(
              --curIndex.value,
              curIndex.value + SHOW_ROW_COUNT
            )
          }
          document.querySelector(
            `.${prefixCls}-scroll-bar-wrapper`
          )!.scrollTop = curIndex.value * ROW_HEIGHT
        },
        true
      )
      tableWrapperRef.value.addEventListener('scroll', handleScroll, true)

      dataSource.value =
        state.value.length > SHOW_ROW_COUNT
          ? state.value.slice(curIndex.value, curIndex.value + SHOW_ROW_COUNT)
          : state.value.slice(0, SHOW_ROW_COUNT)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', () => {})
    })

    const renderTdProps = (column): CSSProperties => {
      switch (column.align) {
        case 'center':
          return { textAlign: 'center' }
        case 'left':
          return { textAlign: 'left' }
        case 'right':
          return { textAlign: 'right' }
        default:
          return { textAlign: 'left' }
      }
    }

    const renderTd = (cell, { slots }) => {
      return cell.colSpan === props.columns.length + 2 ? (
        <td {...cell}>{slots.default()}</td>
      ) : (
        slots.default()
      )
    }

    return () => {
      return (
        <>
          {renderTable.value}
          {props.isShowAddBtn ? (
            <div class={`${prefixCls}-add-btn`}>
              <BasicButton onClick={create} type="dashed">
                新增
              </BasicButton>
            </div>
          ) : null}
          <div class={`${prefixCls}-footer`}>{props.footerRender()}</div>
        </>
      )
    }
  }
})

export { ShyFormTable }
