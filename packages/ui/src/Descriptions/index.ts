import { withInstall } from '@shy-plugins/utils'
import Descriptions from './src/Descriptions'
import { useDescription as useShyDescriptions } from './src/useDescriptions'

export const ShyDescriptions = withInstall(Descriptions)
export { useShyDescriptions }
