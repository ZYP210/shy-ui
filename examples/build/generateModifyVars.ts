import { generateAntColors, primaryColor } from './themeConfig'
import { theme  } from 'ant-design-vue'
import convertLegacyToken from 'ant-design-vue/lib/theme/convertLegacyToken'
import { resolve } from 'path'

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
const v3Token = convertLegacyToken(mapToken);

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor)
  const primary = palettes[5]

  const primaryColorObj: Record<string, string> = {}

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index]
  }

  const modifyVars = v3Token

  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `true; @import (reference) "${resolve(
      'src/design/config.less'
    )}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    'border-color-base': '#E4E7ED',
    'font-size-base': '14px', //  Main font size
    'layout-body-background': '#f0f2f5',
    'border-radius-base': '4px', //  Component/float fillet
    'link-color': primary, //   Link color
    'app-content-background': '#fafafa' //   Link color
  }
}
