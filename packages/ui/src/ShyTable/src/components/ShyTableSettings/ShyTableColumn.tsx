import { defineComponent } from 'vue'
import type { BasicColumn, ColumnChangeParam } from '../../types/table'
import {
  ref,
  reactive,
  watchEffect,
  nextTick,
  unref,
  computed,
  useAttrs
} from 'vue'
import {
  Tooltip,
  Popover,
  Checkbox,
  Divider,
  Button,
  CheckboxGroup
} from 'ant-design-vue'
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface'
import {
  SettingOutlined,
  DragOutlined,
  VerticalAlignBottomOutlined
} from '@ant-design/icons-vue'
import { useTableContext } from '../../hooks/useShyTableContext'
import { useDesign } from '@shy-plugins/use'
import {
  isFunction,
  isNullAndUnDef,
  getPopupContainer as getParentContainer
} from '@shy-plugins/utils'
import { cloneDeep, isBoolean, omit } from 'lodash-es'
import Sortablejs from 'sortablejs'
import type Sortable from 'sortablejs'
import { ScrollContainer } from '../../../../Container'
import '../../style/tableSettingColumn.less'
import { watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

interface State {
  checkAll: boolean
  isInit?: boolean
  checkedList: string[]
  defaultCheckList: string[]
}

interface Options {
  title: string
  dataIndex: string
  width?: string | number | undefined
  fixed?: boolean | 'left' | 'right'
  defaultHidden?: boolean
}

const ShyTableColumn = defineComponent({
  emits: ['columns-change', 'columns-reset'],
  setup(props, { emit }) {
    const attrs = useAttrs()

    const table = useTableContext()

    const defaultRowSelection = omit(table.getRowSelection(), 'selectedRowKeys')
    let inited = false
    let inset = false

    const cachePlainOptions = ref<Options[]>([])
    const plainOptions = ref<Options[]>([])

    const columnListRef = ref<ComponentRef>(null)

    const state = reactive<State>({
      checkAll: true,
      checkedList: [],
      defaultCheckList: []
    })

    const checkIndex = ref(false)
    const checkSelect = ref(false)

    const { prefixCls } = useDesign('ant-column-setting')

    const getValues = computed(() => {
      return unref(table?.getBindValues) || {}
    })

    watch(
      () => table.getColumns(),
      () => {
        if (!state.isInit || inset) return
        reInit()
      },
      {
        deep: true
      }
    )

    watchEffect(() => {
      setTimeout(() => {
        const columns = table.getColumns()
        if (columns.length && !state.isInit) {
          init()
        }
      }, 0)
    })

    watchEffect(() => {
      const values = unref(getValues)
      //@ts-ignore
      checkIndex.value = !!values.showIndexColumn
      //@ts-ignore
      checkSelect.value = !!values.rowSelection
    })

    function getColumns() {
      const ret: Options[] = []
      table
        .getColumns({ ignoreIndex: true, ignoreAction: true })
        .forEach((item) => {
          ret.push({
            ...item,
            title: (item.title as string) || (item.customTitle as string),
            dataIndex: (item.dataIndex || item.title) as string
          })
        })
      return ret
    }

    function init() {
      const columns = getColumns()

      const checkList = table
        .getColumns({ ignoreAction: true, ignoreIndex: true })
        .map((item) => {
          if (item.defaultHidden) {
            return ''
          }
          return item.dataIndex || item.title
        })
        .filter(Boolean) as string[]

      if (!plainOptions.value.length) {
        plainOptions.value = columns
        // plainSortOptions.value = columns
        cachePlainOptions.value = columns
        state.defaultCheckList = checkList
      } else {
        unref(plainOptions).forEach((item: BasicColumn) => {
          const findItem = columns.find(
            (col: BasicColumn) => col.dataIndex === item.dataIndex
          )
          if (findItem) {
            item.fixed = findItem.fixed
            item.width = findItem.width
          }
        })
      }
      state.isInit = true
      state.checkedList = checkList
    }

    const reInit = () => {
      const columns = getColumns()
      // plainOptions.value = columns
      unref(plainOptions).forEach((item: BasicColumn) => {
        const findItem = columns.find(
          (col: BasicColumn) => col.dataIndex === item.dataIndex
        )
        if (findItem) {
          item.fixed = findItem.fixed
          item.width = findItem.width
        }
      })

      handleEmit(columns, false)
    }

    // checkAll change
    function onCheckAllChange(e: CheckboxChangeEvent) {
      const checkList = plainOptions.value.map((item) => item.dataIndex)
      if (e.target.checked) {
        state.checkedList = checkList
        handleEmit(checkList)
      } else {
        state.checkedList = []
        handleEmit([])
      }
    }

    const indeterminate = computed(() => {
      const len = plainOptions.value.length
      let checkedLen = state.checkedList.length
      // unref(checkIndex) && checkedLen--;
      return checkedLen > 0 && checkedLen < len
    })

    // Trigger when check/uncheck a column
    function onChange(checkedList: string[]) {
      const len = plainOptions.value.length
      state.checkAll = checkedList.length === len
      const sortList = unref(plainOptions).map((item) => item.dataIndex)
      checkedList.sort((prev, next) => {
        return sortList.indexOf(prev) - sortList.indexOf(next)
      })
      handleEmit(checkedList)
    }

    let sortable: Sortable
    let sortableOrder: string[] = []

    function reset() {
      state.checkedList = [...state.defaultCheckList]
      state.checkAll = true
      plainOptions.value = unref(cachePlainOptions)
      sortable.sort(sortableOrder)
      inset = true
      emit('columns-reset')
      setTimeout(() => {
        inset = false
      })
    }

    // Open the pop-up window for drag and drop initialization
    function handleVisibleChange() {
      if (inited) return
      nextTick(() => {
        const columnListEl = unref(columnListRef)
        if (!columnListEl) return
        const el = columnListEl.$el as any
        if (!el) return
        // Drag and drop sort
        sortable = Sortablejs.create(unref(el), {
          animation: 500,
          delay: 400,
          delayOnTouchOnly: true,
          handle: '.table-column-drag-icon ',
          onEnd: (evt) => {
            const { oldIndex, newIndex } = evt
            if (
              isNullAndUnDef(oldIndex) ||
              isNullAndUnDef(newIndex) ||
              oldIndex === newIndex
            ) {
              return
            }
            // Sort column
            const columns = cloneDeep(plainOptions.value)

            if (oldIndex > newIndex) {
              columns.splice(newIndex, 0, columns[oldIndex])
              columns.splice(oldIndex + 1, 1)
            } else {
              columns.splice(newIndex + 1, 0, columns[oldIndex])
              columns.splice(oldIndex, 1)
            }

            const tempCol = columns
              .map((col: Options) => col.dataIndex)
              .filter((value: string) => state.checkedList.includes(value))

            handleEmit(tempCol)
          }
        })
        // 记录原始order 序列
        sortableOrder = sortable.toArray()
        inited = true
      })
    }

    // Control whether the serial number column is displayed
    function handleIndexCheckChange(e: CheckboxChangeEvent) {
      table.setProps({
        showIndexColumn: e.target.checked
      })
    }

    // Control whether the check box is displayed
    function handleSelectCheckChange(e: CheckboxChangeEvent) {
      table.setProps({
        rowSelection: e.target.checked ? defaultRowSelection : undefined
      })
    }

    function handleColumnFixed(item: BasicColumn, fixed?: 'left' | 'right') {
      if (!state.checkedList.includes(item.dataIndex as string)) return

      const columns = getColumns() as BasicColumn[]
      const isFixed = item.fixed === fixed ? false : fixed
      const index = columns.findIndex((col) => col.dataIndex === item.dataIndex)
      if (index !== -1) {
        columns[index].fixed = isFixed
      }
      item.fixed = isFixed

      if (isFixed && !item.width) {
        item.width = 100
      }
      table.setCacheColumnsByField?.(item.dataIndex as string, {
        fixed: isFixed
      })
      handleEmit(columns)
    }

    function getResult(columns: any[]) {
      const tempOptions = unref(plainOptions).map((col) => {
        let defaultHidden = false

        if (columns.every((val) => typeof val === 'string')) {
          defaultHidden =
            columns.findIndex((val: string) => val === col.dataIndex) === -1
        } else {
          const find = columns.find(
            (val: BasicColumn) => val.dataIndex === col.dataIndex
          )
          defaultHidden = find
            ? isBoolean(find.defaultHidden)
              ? find.defaultHidden
              : false
            : true
        }

        return {
          title: col.title,
          dataIndex: col.dataIndex,
          fixed: col.fixed,
          defaultHidden,
          width: col.width
        }
      })

      if (!columns.every((val) => typeof val === 'string')) {
        const sortList = columns.map((item) => item.dataIndex)
        tempOptions.sort((prev, next) => {
          return (
            sortList.indexOf(prev.dataIndex) - sortList.indexOf(next.dataIndex)
          )
        })
        return tempOptions
      }

      tempOptions.sort((prev, next) => {
        return columns.indexOf(prev.dataIndex) - columns.indexOf(next.dataIndex)
      })
      return tempOptions
    }

    function getPopupContainer() {
      return isFunction(attrs.getPopupContainer)
        ? attrs.getPopupContainer()
        : getParentContainer()
    }

    const handleEmit = useDebounceFn((columns, set = true) => {
      const data: ColumnChangeParam[] = getResult(columns)
      emit('columns-change', data)
      if (set) {
        inset = true
        table.setColumns(columns)
        setTimeout(() => {
          inset = false
        })
      }
    }, 100)

    return () => {
      return (
        <Tooltip
          placement="top"
          v-slots={{
            title: () => <span>列设置</span>
          }}
        >
          <Popover
            placement="bottomLeft"
            trigger="click"
            onOpenChange={handleVisibleChange}
            overlayClassName={`${prefixCls}__column-list`}
            getPopupContainer={getPopupContainer}
            v-slots={{
              title: () => (
                <div class={`${prefixCls}__popover-title`}>
                  <Checkbox
                    indeterminate={indeterminate.value}
                    v-model:checked={state.checkAll}
                    onChange={onCheckAllChange}
                  >
                    列展示
                  </Checkbox>

                  <Checkbox
                    v-model:checked={checkIndex.value}
                    onChange={handleIndexCheckChange}
                  >
                    序号列
                  </Checkbox>

                  <Checkbox
                    v-model:checked={checkSelect.value}
                    onChange={handleSelectCheckChange}
                    disabled={!defaultRowSelection}
                  >
                    勾选列
                  </Checkbox>

                  <Button size="small" type="link" onClick={reset}>
                    重置
                  </Button>
                </div>
              ),
              content: () => (
                <ScrollContainer>
                  <CheckboxGroup
                    v-model:value={state.checkedList}
                    onChange={onChange}
                    ref={columnListRef}
                  >
                    {plainOptions.value.map((item) => {
                      const renderItem = () =>
                        !('ifShow' in item && !item.ifShow) ? (
                          <div class={`${prefixCls}__check-item`}>
                            <DragOutlined class="table-column-drag-icon" />
                            <Checkbox value={item.dataIndex}>
                              {item.title}
                            </Checkbox>

                            <Tooltip
                              placement="bottomLeft"
                              mouseLeaveDelay={0.4}
                              getPopupContainer={getPopupContainer}
                              v-slots={{ title: () => <span>固定到左侧</span> }}
                            >
                              <VerticalAlignBottomOutlined
                                rotate={90}
                                class={[
                                  `${prefixCls}__fixed-left`,
                                  {
                                    active: item.fixed === 'left',
                                    disabled: !state.checkedList.includes(
                                      item.dataIndex
                                    )
                                  }
                                ]}
                                onClick={() => handleColumnFixed(item, 'left')}
                              />
                            </Tooltip>
                            <Divider type="vertical" />
                            <Tooltip
                              placement="bottomLeft"
                              mouseLeaveDelay={0.4}
                              getPopupContainer={getPopupContainer}
                              v-slots={{ title: () => <span>固定到右侧</span> }}
                            >
                              <VerticalAlignBottomOutlined
                                rotate={90}
                                class={[
                                  `${prefixCls}__fixed-right`,
                                  {
                                    active: item.fixed === 'right',
                                    disabled: !state.checkedList.includes(
                                      item.dataIndex
                                    )
                                  }
                                ]}
                                onClick={() => handleColumnFixed(item, 'right')}
                              />
                            </Tooltip>
                          </div>
                        ) : null

                      return renderItem()
                    })}
                  </CheckboxGroup>
                </ScrollContainer>
              )
            }}
          >
            <SettingOutlined />
          </Popover>
        </Tooltip>
      )
    }
  }
})

export { ShyTableColumn }
