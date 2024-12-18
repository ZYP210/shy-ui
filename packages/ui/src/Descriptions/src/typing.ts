import type { CSSProperties } from 'vue'
import { FormSchema } from '../../ShyForm/src/types/form'

export interface DescriptionsItem extends FormSchema {
  isCopy?: boolean
  labelStyle?: CSSProperties
  contentStyle?: CSSProperties
}

export interface DescriptionsProps {
  schemas: DescriptionsItem[]
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
  setDescProps(descProps: Partial<DescriptionsProps>): void
}

export type Register = (descInstance: DescInstance) => void

/**
 * @description:
 */
export type UseDescReturnType = [Register, DescInstance]
