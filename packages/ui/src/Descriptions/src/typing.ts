import type { CSSProperties } from 'vue'
import { ComponentType } from '../../ShyForm'
export interface DescItem {
  label: string
  field: string
  colProps?: {
    span: number
  }
  groupType?: 'Divider' | 'Group' | 'Custom' | 'Origin'
  component?: ComponentType
  componentProps: Recordable
  isCopy?: boolean
  labelStyle?: CSSProperties
  contentStyle?: CSSProperties
  helpMessage?: string
  ifShow?: Function | boolean
  show?: boolean | Function
}

export interface DescriptionProps {
  schemas: DescItem[]
  data: { [key: string]: any }
  summaryPrecision: number
  summaryTotalFields: string[]
  labelWidth?: number
  isShowColon?: boolean
  labelAlign?: 'left' | 'center' | 'right'
  labelStyle?: CSSProperties
  contentStyle?: CSSProperties
  bordered?: boolean
  mode?: 'horizontal' | 'vertical'
  [key: string]: any
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescriptionProps>): void
}

export type Register = (descInstance: DescInstance) => void

/**
 * @description:
 */
export type UseDescReturnType = [Register, DescInstance]
