import type { FunctionalComponent } from 'vue'
import type { ComponentType } from '../../types/componentType'
import { componentMap } from '../../componentMap'

// import { Popover } from 'ant-design-vue'
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
    component = 'Input' // rule = true,
  }: ComponentProps,
  { attrs }
) => {
  const Comp = componentMap.get(component)

  return h(Comp, attrs)
}
