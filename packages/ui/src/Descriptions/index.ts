import { withInstall } from '@shy-plugins/utils'
import Descriptions from './src/ShyDescriptions'
import { useShyDescriptions } from './src/useShyDescriptions'

export const ShyDescriptions = withInstall(Descriptions)
export { useShyDescriptions }
