import { PropType, computed, toRaw, unref, defineComponent } from 'vue'
import { Divider, Tooltip, TooltipProps } from 'ant-design-vue'
import { Icon } from '../../../Icon'
import { ActionItem } from '../types/tableAction'
import { TableActionType } from '../types/table'
import { PopConfirmButton } from '../../../Button'
import { Dropdown } from '../../../Dropdown'
import { useDesign } from '@shy-plugins/use'
import { useTableContext } from '../hooks/useShyTableContext'
import { isBoolean, isFunction, isNumber, isString } from '@shy-plugins/utils'
import { ACTION_COLUMN_FLAG } from '../const'
import { MoreOutlined } from '@ant-design/icons-vue'
import '../style/tableAction.less'

const ShyTableAction = defineComponent({
  props: {
    actions: {
      type: Array as PropType<ActionItem[]>,
      default: null
    },
    dropDownActions: {
      type: Array as PropType<ActionItem[]>,
      default: null
    },
    divider: {
      type: Boolean,
      default: true
    },
    outside: {
      type: Boolean
    },
    stopButtonPropagation: {
      type: Boolean,
      default: false
    },
    showCount: {
      type: Number,
      default: () => 3
    }
  },
  setup(props) {
    const { prefixCls } = useDesign('basic-table-action')
    let table: Partial<TableActionType> = {}
    if (!props.outside) {
      table = useTableContext()
    }

    function isIfShow(action: ActionItem): boolean {
      const ifShow = action.ifShow

      let isIfShow = true

      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }

      if (isNumber(ifShow) || isString(ifShow)) {
        isIfShow = !!ifShow
      }

      if (isFunction(ifShow)) {
        isIfShow = ifShow(action)
      }
      return isIfShow
    }

    const getAlign = computed(() => {
      const columns = (table as TableActionType)?.getColumns?.() || []
      const actionColumn = columns.find(
        (item) => item.flag === ACTION_COLUMN_FLAG
      )
      return actionColumn?.align ?? 'left'
    })

    function getTooltip(data: string | TooltipProps): TooltipProps {
      return {
        getPopupContainer: () =>
          unref((table as any)?.wrapRef.value) ?? document.body,
        placement: 'bottom',
        ...(isString(data) ? { title: data } : data)
      }
    }

    function onCellClick(e: MouseEvent) {
      if (!props.stopButtonPropagation) return
      const path = e.composedPath() as HTMLElement[]
      const isInButton = path.find((ele) => {
        return ele.tagName?.toUpperCase() === 'BUTTON'
      })

      isInButton && e.stopPropagation()
    }

    const getActions = computed<JSX.Element[]>(() => {
      const cacheActions: any[] = []
      return (toRaw(props.actions) || [])
        .filter((action, _) => {
          if (
            isIfShow(action) &&
            cacheActions.length <
              props.showCount -
                (props.actions.length !== props.showCount ? 1 : 0)
          ) {
            cacheActions.push(action)
            return true
          } else return false
          // return isIfShow(action) && cacheActions.length <= props.showCount
          // if (props.actions?.length === props.showCount) {
          //   return isIfShow(action)
          // } else {
          //   return isIfShow(action) && index <= props.showCount - 2
          // }
        })
        .map((action) => {
          const { popConfirm, icon, label, tooltip } = action

          const showIcon = () => {
            return icon ? (
              <Icon icon={icon} class={{ 'mr-1': !!label }} />
            ) : null
          }

          const showLabel = () => {
            return label ? label : ''
          }

          const showComponent = () => {
            return tooltip ? (
              <Tooltip {...getTooltip(tooltip)}>
                <PopConfirmButton {...action}>
                  {showIcon()}
                  {showLabel()}
                </PopConfirmButton>
              </Tooltip>
            ) : (
              <PopConfirmButton
                {...{
                  getPopupContainer: () => document.body,
                  type: 'link',
                  size: 'small',
                  ...action,
                  ...(popConfirm || {}),
                  onConfirm: popConfirm?.confirm,
                  onCancel: popConfirm?.cancel,
                  enable: !!popConfirm
                }}
              >
                {showIcon()}
                {showLabel()}
              </PopConfirmButton>
            )
          }

          return (
            <>
              {showComponent()}
              <Divider
                type="vertical"
                class="action-divider"
                v-if="divider && index < getActions.length - 1"
              />
            </>
          )
        })
    })

    const getDropdownList = computed((): any[] => {
      const cacheActions: any[] = []

      const list = (toRaw(props.actions) || []).filter((action, index) => {
        if (
          isIfShow(action) &&
          cacheActions.length <
            props.showCount - (props.actions.length !== props.showCount ? 1 : 0)
        ) {
          cacheActions.push(action)
          return false
        } else if (isIfShow(action)) return true
        // return isIfShow(action) && cacheActions.length > props.showCount
        // if (props.actions.length === props.showCount) {
        //   return false
        // } else {
        //   return isIfShow(action) && index >= props.showCount - 1
        // }
      })
      return list.map((action, index) => {
        const { label, popConfirm } = action
        return {
          ...action,
          ...popConfirm,
          onConfirm: popConfirm?.confirm,
          onCancel: popConfirm?.cancel,
          text: label,
          divider: index < list.length - 1 ? props.divider : false
        }
      })
    })

    return () => {
      const isShowDropdown = () => {
        return getDropdownList.value.length > 0 ? (
          <Dropdown
            trigger={['hover']}
            dropMenuList={getDropdownList.value}
            popconfirm
            v-if="getDropdownList.length > 0"
          >
            <slot name="more"></slot>
            <a-button type="link" size="small" v-if="!$slots.more">
              <MoreOutlined class="icon-more" />
            </a-button>
          </Dropdown>
        ) : null
      }

      return (
        <>
          <div class={[prefixCls, getAlign]} onClick={onCellClick}>
            {getActions.value}
            {isShowDropdown()}
          </div>
        </>
      )
    }
  }
})

export default ShyTableAction
