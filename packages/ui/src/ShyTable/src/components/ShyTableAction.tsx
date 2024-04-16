import { PropType, computed, toRaw, unref, defineComponent } from 'vue'
import { Divider, Tooltip } from 'ant-design-vue'
import { Icon } from '../../../Icon'
import { ActionItem } from '../types/tableAction'
import { TableActionType } from '../types/table'
import { PopConfirmButton } from '../../../Button'
import { Dropdown } from '../../../Dropdown'
import { useDesign } from '@shy-plugins/use'
import { useTableContext } from '../hooks/useShyTableContext'
import { isBoolean, isFunction, isNumber, isString } from '@shy-plugins/utils'
import { ACTION_COLUMN_FLAG } from '../const'
import { MoreOutlined, DownOutlined } from '@ant-design/icons-vue'
import { BasicButton } from '../../../Button'

import '../style/tableAction.less'

const ShyTableAction = defineComponent({
  props: {
    type: {
      type: String as PropType<'action' | 'footer'>,
      default: () => 'action'
    },
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
      default: () => 2
    }
  },
  setup(props, { slots }) {
    const { prefixCls } = useDesign('ant-table-action')
    let table: Partial<TableActionType> = {}
    if (!props.outside) {
      table = useTableContext()
    }

    const isIfShow = (action: ActionItem): boolean => {
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

    const getShowCount = computed(() => {
      switch (props.type) {
        case 'action':
          return props.showCount
        case 'footer':
          return props.showCount > 2 ? props.showCount : 3
      }
    })

    const getBtnSize = computed(() => {
      switch (props.type) {
        case 'action':
          return 'small'
        case 'footer':
          return 'middle'
      }
    })

    const getButtonTypeByPropsType = () => {
      switch (props.type) {
        case 'action':
          return 'link'
        case 'footer':
          return 'default'
      }
    }

    const showIcon = ({ icon, label }: ActionItem) => {
      return icon ? <Icon icon={icon} class={{ 'mr-1': !!label }} /> : null
    }

    const showLabel = ({ label }: ActionItem) => {
      return label ? label : ''
    }

    const renderInside = ({ tooltip, ...action }: ActionItem) => {
      const tooltipProp = {
        getPopupContainer: () =>
          unref((table as any)?.wrapRef.value) ?? document.body,
        placement: 'bottom',
        ...(isString(tooltip) ? { title: tooltip } : tooltip)
      }

      return (
        <Tooltip {...tooltipProp}>
          <PopConfirmButton {...action}>
            {showIcon(action)}
            {showLabel(action)}
          </PopConfirmButton>
        </Tooltip>
      )
    }

    const renderOutside = ({ popConfirm, ...action }: ActionItem) => {
      const popConfirmProps = {
        getPopupContainer: () => document.body,
        type: getButtonTypeByPropsType(),
        ...action,
        ...(popConfirm || {}),
        onConfirm: popConfirm?.confirm,
        onCancel: popConfirm?.cancel,
        enable: !!popConfirm,
        size: getBtnSize.value
      }

      return (
        <PopConfirmButton {...popConfirmProps}>
          {showIcon(action)}
          {showLabel(action)}
        </PopConfirmButton>
      )
    }

    const onCellClick = (e: MouseEvent) => {
      if (!props.stopButtonPropagation) return
      const path = e.composedPath() as HTMLElement[]
      const isInButton = path.find((ele) => {
        return ele.tagName?.toUpperCase() === 'BUTTON'
      })
      isInButton && e.stopPropagation()
    }

    const renderDivider = (index, length) => {
      const isShow =
        props.divider && index < length && ['action'].includes(props.type)
      return isShow ? <Divider type="vertical" class="action-divider" /> : null
    }

    const getActions = computed<JSX.Element[]>(() => {
      const cacheActions: any[] = []
      const outsideActions = (toRaw(props.actions) || []).filter((action) => {
        if (
          isIfShow(action) &&
          cacheActions.length <
            getShowCount.value -
              (props.actions.length !== getShowCount.value ? 1 : 0)
        ) {
          cacheActions.push(action)
          return true
        } else return false
      })

      return outsideActions.map((action, index) => {
        const { tooltip } = action
        const renderComponent = () => {
          return tooltip ? renderInside(action) : renderOutside(action)
        }
        return (
          <>
            {renderComponent()}
            {renderDivider(index, outsideActions.length)}
          </>
        )
      })
    })

    const renderDropdownBtn = () => {
      switch (props.type) {
        case 'action':
          return (
            <BasicButton type="link" size="small">
              <MoreOutlined />
            </BasicButton>
          )
        case 'footer':
          return (
            <BasicButton class={`${prefixCls}-footer-more-btn`}>
              <div class={`${prefixCls}-footer-more-text`}>更多操作</div>
              <DownOutlined />
            </BasicButton>
          )
      }
    }

    const isShowDropdown = () => {
      return getDropdownList.value.length > 0 ? (
        <Dropdown
          trigger={['hover']}
          dropMenuList={getDropdownList.value}
          popconfirm
        >
          <slot name="more"></slot>
          {slots?.more?.() || renderDropdownBtn()}
        </Dropdown>
      ) : null
    }

    const getDropdownList = computed((): any[] => {
      const cacheActions: any[] = []

      const list = (toRaw(props.actions) || []).filter((action) => {
        if (
          isIfShow(action) &&
          cacheActions.length <
            getShowCount.value -
              (props.actions.length !== getShowCount.value ? 1 : 0)
        ) {
          cacheActions.push(action)
          return false
        } else if (isIfShow(action)) return true
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
