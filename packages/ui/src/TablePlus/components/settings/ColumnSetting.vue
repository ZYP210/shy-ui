<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  nextTick,
  unref,
  watch,
  onMounted
} from 'vue'
import { Tooltip, Popover, Checkbox, Divider } from 'ant-design-vue'
import { SettingOutlined, DragOutlined } from '@ant-design/icons-vue'
import { Icon } from '../../../Icon'
import { ScrollContainer } from '../../../Container'
import { useTableContext } from '../../../Table/src/hooks/useTableContext'
import { useDesign } from '@shy-plugins/use'
import { isNullAndUnDef } from '@shy-plugins/utils'
import { cloneDeep } from 'lodash-es'
import Sortablejs from 'sortablejs'
import type Sortable from 'sortablejs'
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface'

interface State {
  checkAll: boolean
  isInit?: boolean
  checkedList: string[]
  defaultCheckList: string[]
}

interface Options {
  label: string
  value: string
  fixed?: boolean | 'left' | 'right'
}

export default defineComponent({
  name: 'ColumnSetting',
  components: {
    SettingOutlined,
    Popover,
    Tooltip,
    Checkbox,
    CheckboxGroup: Checkbox.Group,
    DragOutlined,
    ScrollContainer,
    Divider,
    Icon
  },
  emits: ['columns-change'],

  setup() {
    const table: any = useTableContext()
    const defaultRowSelection = []
    const cachePlainOptions = ref<Options[]>([])
    const plainOptions = ref<Options[] | any>([])
    const plainSortOptions = ref<Options[] | any>([])
    plainOptions.value = JSON.parse(JSON.stringify(getColumns()))
    cachePlainOptions.value = JSON.parse(JSON.stringify(getColumns()))
    plainSortOptions.value = JSON.parse(JSON.stringify(getColumns()))

    const columnListRef = ref<ComponentRef>(null)

    const state = reactive<State>({
      checkAll: true,
      checkedList: [],
      defaultCheckList: []
    })

    const checkIndex = ref(false)
    const checkSelect = ref(false)

    onMounted(() => {
      init()
    })

    const { prefixCls } = useDesign('basic-column-setting')

    function getColumns() {
      return table.getColumns()
    }

    function init() {
      checkIndex.value = table.getProps.value.isShowSeq
      checkSelect.value = table.getProps.value.isShowRowSelection

      state.checkedList = getColumns().map((column) => {
        return column.field
      })
    }

    const inited = ref(false)
    const handleVisibleChange = () => {
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
            const columns = cloneDeep(plainSortOptions.value)

            if (oldIndex > newIndex) {
              columns.splice(newIndex, 0, columns[oldIndex])
              columns.splice(oldIndex + 1, 1)
            } else {
              columns.splice(newIndex + 1, 0, columns[oldIndex])
              columns.splice(oldIndex, 1)
            }

            plainSortOptions.value = columns

            table.setProps({ columns })
            nextTick(() => {
              table.refreshColumn()
            })
          }
        })
        // 记录原始order 序列
        sortableOrder = sortable.toArray()
        inited.value = true
      })
    }

    // checkAll change
    function onCheckAllChange(e: CheckboxChangeEvent) {
      const checkList = plainOptions.value.map((item) => item.field)
      if (e.target.checked) {
        state.checkedList = checkList
        table.showColumn(checkList)
      } else {
        state.checkedList = []
        table.hideColumn(checkList)
      }
    }

    // 判定显示column
    watch(
      () => state.checkedList,
      (value) => {
        plainSortOptions.value.forEach((column) => {
          if (value.includes(column.field)) {
            column.visible = true
          } else {
            column.visible = false
          }
        })
        table.setProps({ columns: plainSortOptions.value })
        nextTick(() => {
          table.refreshColumn()
        })
      }
    )

    let sortable: Sortable
    let sortableOrder: string[] = []
    // reset columns
    function reset() {
      sortable.sort(sortableOrder)
      plainOptions.value = JSON.parse(JSON.stringify(cachePlainOptions.value))

      plainSortOptions.value = JSON.parse(
        JSON.stringify(cachePlainOptions.value)
      )
      state.checkAll = true
      state.checkedList = cachePlainOptions.value.map((column) => column.field)

      table.setProps({ columns: cachePlainOptions.value })
      nextTick(() => {
        table.refreshColumn()
      })
    }

    // Control whether the serial number column is displayed
    function handleIndexCheckChange(e: CheckboxChangeEvent) {
      table.setProps({
        isShowSeq: e.target.checked
      })
    }

    // Control whether the check box is displayed
    function handleSelectCheckChange(e: CheckboxChangeEvent) {
      table.setProps({
        isShowRowSelection: e.target.checked ? defaultRowSelection : undefined
      })
    }

    function handleColumnFixed(item, fixed?: 'left' | 'right') {
      if (!state.checkedList.includes(item.field as string)) return

      const columns = JSON.parse(JSON.stringify(plainSortOptions.value))
      const isFixed = item.fixed === fixed ? false : fixed
      const index = columns.findIndex((col) => col.field === item.field)
      if (index !== -1) {
        columns[index].fixed = isFixed
      }
      item.fixed = isFixed

      if (isFixed && !item.width) {
        item.width = 100
      }
      plainSortOptions.value = columns
      table.setProps({ columns })
      nextTick(() => {
        table.refreshColumn()
      })
    }

    function getPopupContainer() {
      return document.body
    }

    return {
      ...toRefs(state),
      onCheckAllChange,
      plainOptions,
      reset,
      prefixCls,
      columnListRef,
      checkIndex,
      checkSelect,
      handleIndexCheckChange,
      handleSelectCheckChange,
      defaultRowSelection,
      handleColumnFixed,
      getPopupContainer,
      handleVisibleChange
    } as { prefixCls: any; handleVisibleChange: any }
  }
}) as any
</script>

<template>
  <Tooltip placement="top">
    <template #title>
      <span>列展示</span>
    </template>
    <Popover
      placement="bottomLeft"
      trigger="click"
      :overlayClassName="`${prefixCls}__cloumn-list`"
      @visible-change="handleVisibleChange"
    >
      <template #title>
        <div :class="`${prefixCls}__popover-title`">
          <Checkbox v-model:checked="checkAll" @change="onCheckAllChange">
            列展示
          </Checkbox>

          <Checkbox
            v-model:checked="checkIndex"
            @change="handleIndexCheckChange"
          >
            序号列
          </Checkbox>

          <Checkbox
            v-model:checked="checkSelect"
            @change="handleSelectCheckChange"
            :disabled="!defaultRowSelection"
          >
            勾选列
          </Checkbox>

          <a-button size="small" type="link" @click="reset"> 重置 </a-button>
        </div>
      </template>

      <template #content>
        <ScrollContainer>
          <CheckboxGroup v-model:value="checkedList" ref="columnListRef">
            <template v-for="item in plainOptions" :key="item.value">
              <div
                :class="`${prefixCls}__check-item`"
                v-if="!('ifShow' in item && !item.ifShow)"
              >
                <DragOutlined class="table-column-drag-icon" />
                <Checkbox :value="item.field">
                  {{ item.title }}
                </Checkbox>

                <Tooltip
                  placement="bottomLeft"
                  :mouseLeaveDelay="0.4"
                  :getPopupContainer="getPopupContainer"
                >
                  <template #title> 固定到左侧 </template>

                  <Icon
                    icon="line-md:arrow-align-left"
                    :class="[
                      `${prefixCls}__fixed-left`,
                      {
                        active: item.fixed === 'left',
                        disabled: !checkedList.includes(item.field)
                      }
                    ]"
                    @click="handleColumnFixed(item, 'left')"
                  />
                </Tooltip>
                <Divider type="vertical" />
                <Tooltip
                  placement="bottomLeft"
                  :mouseLeaveDelay="0.4"
                  :getPopupContainer="getPopupContainer"
                >
                  <template #title> 固定到右侧 </template>
                  <Icon
                    icon="line-md:arrow-align-left"
                    :class="[
                      `${prefixCls}__fixed-right`,
                      {
                        active: item.fixed === 'right',
                        disabled: !checkedList.includes(item.field)
                      }
                    ]"
                    @click="handleColumnFixed(item, 'right')"
                  />
                </Tooltip>
              </div>
            </template>
          </CheckboxGroup>
        </ScrollContainer>
      </template>
      <SettingOutlined />
    </Popover>
  </Tooltip>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-basic-column-setting';

.table-column-drag-icon {
  margin: 0 5px;
  cursor: move;
}

.@{prefix-cls} {
  &__popover-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__check-item {
    display: flex;
    align-items: center;
    padding: 4px 16px 8px 0;
    min-width: 100%;

    .ant-checkbox-wrapper {
      width: 100%;

      &:hover {
        color: @primary-color;
      }
    }
  }

  &__fixed-left,
  &__fixed-right {
    color: rgb(0 0 0 / 45%);
    cursor: pointer;

    &.active,
    &:hover {
      color: @primary-color;
    }

    &.disabled {
      color: @disabled-color;
      cursor: not-allowed;
    }
  }

  &__fixed-right {
    transform: rotate(180deg);
  }

  &__cloumn-list {
    svg {
      width: 1em !important;
      height: 1em !important;
    }

    .ant-popover-inner-content {
      // max-height: 360px;
      padding-right: 0;
      padding-left: 0;
      // overflow: auto;
    }

    .ant-checkbox-group {
      width: 100%;
      min-width: 260px;
      // flex-wrap: wrap;
    }

    .scrollbar {
      height: 220px;
    }
  }
}
</style>
