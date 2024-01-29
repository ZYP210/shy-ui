import type { CSSProperties } from 'vue'
export interface DescItem {
  label?: string
  field?: string
  colProps?: {
    span: number
  }
  component?: 'Divider' | 'Group'
  isCopy?: boolean
  labelStyle?: CSSProperties
  contentStyle?: CSSProperties
  helpMessage: String
}

export interface DescriptionProps {
  schema: DescItem[]
  data: Recordable
  labelWidth?: number
  isShowColon?: boolean
  labelAlign?: string
  labelStyle?: CSSProperties
  contentStyle?: CSSProperties
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescriptionProps>): void
}

export type Register = (descInstance: DescInstance) => void

/**
 * @description:
 */
export type UseDescReturnType = [Register, DescInstance]
