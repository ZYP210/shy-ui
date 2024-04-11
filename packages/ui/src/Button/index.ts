import { withInstall } from '@shy-plugins/utils'
import type { ExtractPropTypes } from 'vue'
import BasicButton from './src/BasicButton'
import PopConfirmButton from './src/PopConfirmButton.vue'
import { buttonProps } from './src/props'
export const Button = withInstall(BasicButton)
export { BasicButton, PopConfirmButton }

export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>
