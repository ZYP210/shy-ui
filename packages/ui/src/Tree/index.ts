import BasicTree from './src/BasicTree'
import './style'

export { BasicTree }

export interface ContextMenuItem {
  label: string
  icon?: string
  hidden?: boolean
  disabled?: boolean
  handler?: Fn
  divider?: boolean
  children?: ContextMenuItem[]
}

export * from './src/types/tree'
