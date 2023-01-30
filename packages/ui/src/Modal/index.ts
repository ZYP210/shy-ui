import basicModal from './src/BasicModal.vue'
import { withInstall } from '@shy-plugins/utils'
export { useModalContext } from './src/hooks/useModalContext'
export { useModal, useModalInner } from './src/hooks/useModal'
export const BasicModal = withInstall(basicModal)
export * from './src/typing'
