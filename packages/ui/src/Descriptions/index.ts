import { withInstall } from '@shy-plugins/utils'
import Descriptions from './src/ShyDescriptions'
import { useShyDescriptions } from './src/useShyDescriptions'
import { basicProps } from './src/props'

export * from './src/typing'

export const ShyDescriptions = withInstall(Descriptions)
export { useShyDescriptions, basicProps as shyDescriptionsProps }
