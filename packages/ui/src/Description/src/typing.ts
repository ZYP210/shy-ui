export interface DescItem {
  field: string
  label: string
  colProps?: { span?: number }
}

export interface DescriptionProps {
  schema: DescItem[]
  data: Recordable
  labelWidth?: number
  isShowColon?: boolean
  labelAlign?: string
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescriptionProps>): void
}

export type Register = (descInstance: DescInstance) => void

/**
 * @description:
 */
export type UseDescReturnType = [Register, DescInstance]
