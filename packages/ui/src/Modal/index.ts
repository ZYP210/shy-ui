import { withInstall } from '@shy-plugins/utils'
import './src/modal.less'
import basicModal from './src/BasicModal.vue'
export { useModalContext } from './src/hooks/useModalContext'
export { useModal, useModalInner } from './src/hooks/useModal'

export const BasicModal = withInstall(basicModal)
export * from './src/typing'
