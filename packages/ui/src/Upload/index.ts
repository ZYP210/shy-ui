import { withInstall } from '@shy-plugins/utils'

import basicUpload from './src/BasicUpload.vue'
import uploadImage from './src/components/ImageUpload.vue'

export const ImageUpload = withInstall(uploadImage)
export const BasicUpload = withInstall(basicUpload)
