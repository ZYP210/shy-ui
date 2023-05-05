export { default as BasicTable } from './src/BasicTable.vue'
export { default as TableAction } from './src/components/TableAction.vue'
export { default as EditTableHeaderIcon } from './src/components/EditTableHeaderIcon.vue'
export { default as TableImg } from './src/components/TableImg.vue'
export { default as TableDict } from './src/components/TableDict.vue'

import './src/style/index.less'


export * from './src/types/table'
export * from './src/types/pagination'
export * from './src/types/tableAction'
export { useTable } from './src/hooks/useTable'
export type { FormSchema, FormProps } from '../form'
export type { EditRecordRow } from './src/components/editable'
