import { Meta2dData } from '@meta2d/core'
export interface EditProps {
  isPreview: boolean
  dataSource?: Meta2dData
  options: Recordable
  api?: Recordable
}

export interface EditInstance {
  setEditProps(descProps: Partial<EditProps>): void
}

export type Register = (descInstance: EditInstance) => void

/**
 * @description:
 */
export type UseDescReturnType = [Register, EditInstance]
