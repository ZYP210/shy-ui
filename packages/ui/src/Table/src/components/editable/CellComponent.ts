import type { FunctionalComponent } from 'vue'
import type { ComponentType } from '../../types/componentType'
import { componentMap } from '../../componentMap'

import { Popover } from 'ant-design-vue'
import { h } from 'vue'

export interface ComponentProps {
  component: ComponentType
  rule: boolean
  popoverVisible: boolean
  ruleMessage: string
  getPopupContainer?: Fn
}

export const CellComponent: FunctionalComponent = (
  {
    component = 'Input',
    rule = true,
    ruleMessage,
    popoverVisible,
    getPopupContainer
  }: ComponentProps,
  { attrs }
) => {
  const Comp = componentMap.get(component)

  const DefaultComp = h(Comp, attrs)
  if (!rule) {
    return DefaultComp
  }
  return h(
    Popover,
    {
      overlayClassName: 'edit-cell-rule-popover',
      visible: !!popoverVisible,
      getPopupContainer: (e) => {
        return attrs.currIndex ? e.parentNode : document.body
      }
    },
    {
      default: () => DefaultComp,
      content: () => ruleMessage
    }
  )
}
