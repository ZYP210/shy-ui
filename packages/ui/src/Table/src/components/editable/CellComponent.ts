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

function findAncestorWithClassName(element, className) {
  // 循环查找元素的父级节点
  while (
    (element = element.parentElement) &&
    !element.classList.contains(className)
  );

  // 如果找到匹配的元素，则返回它；否则返回null
  return element
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
        return attrs.currIndex
          ? findAncestorWithClassName(e, 'ant-table-cell') || e.parentNode
          : document.body
      }
    },
    {
      default: () => DefaultComp,
      content: () => ruleMessage
    }
  )
}
