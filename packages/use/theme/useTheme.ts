import { theme } from 'ant-design-vue'
import { computed, reactive, ref, unref } from 'vue'
import generate from './generate'
import { watch } from 'vue'

export type ThemeType = 'light' | 'dark'
export type PalettesProps = Record<string, string[] & { primary?: string }>

const presetPalettes: PalettesProps = reactive({})
const presetDarkPalettes: PalettesProps = reactive({})
const themeRef = ref<ThemeType>('light')
const primaryColor = ref<string>('#2DA44E')
const presetPrimaryColors: Record<string, string> = reactive({
  red: '#CF222E',
  pink: '#BF3989',
  volcano: '#FA541C',
  orange: '#E16F24',
  gold: '#FAAD14',
  yellow: '#BF8700',
  lime: '#A0D911',
  green: '#2DA44E',
  cyan: '#13C2C2',
  blue: '#0969DA',
  geekblue: '#2F54EB',
  purple: '#8439BA',
  magenta: '#EB2F96',
  grey: '#8C959F',
  gray: '#8C959F',
  primary: unref(primaryColor)
})

export const useTheme = () => {
  const rootElement = document.documentElement
  const rootStyles = window.getComputedStyle(rootElement)

  if (!rootElement.getAttribute('data-theme')) {
    generatePalettes(presetPrimaryColors)
    setThemeType('light')
    mountColorVariable()
  }

  watch(
    () => primaryColor.value,
    (color) => {
      presetPrimaryColors.primary = color
    }
  )

  watch(
    () => presetPrimaryColors,
    (colors) => {
      generatePalettes(colors)
      mountColorVariable(unref(themeRef))
    },
    {
      deep: true
    }
  )

  const basePalettes = computed(() => {
    return {
      red: presetPalettes.red,
      volcano: presetPalettes.volcano,
      orange: presetPalettes.orange,
      gold: presetPalettes.gold,
      yellow: presetPalettes.yellow,
      lime: presetPalettes.lime,
      green: presetPalettes.green,
      cyan: presetPalettes.cyan,
      blue: presetPalettes.blue,
      geekblue: presetPalettes.geekblue,
      purple: presetPalettes.purple,
      magenta: presetPalettes.magenta,
      grey: presetPalettes.grey,
      gray: presetPalettes.gray
    }
  })

  const getAntTheme = computed(() => {
    const formCompProps = {
      colorBgContainer: getVarColor('--gray-1'),
      lineWidth: 0
    }

    return {
      token: {
        borderRadius: 4,
        colorPrimary: presetPrimaryColors.primary,
        ...presetPrimaryColors
      },
      algorithm: getAntvThemeAlgorithm.value,
      components: {
        Input: formCompProps,
        DatePicker: formCompProps,
        InputNumber: formCompProps,
        Select: formCompProps
      }
    }
  })

  const getThemeType = computed(() => {
    return unref(themeRef)
  })

  const getAntvThemeAlgorithm = computed(() => {
    switch (unref(getThemeType)) {
      case 'light':
        return theme.defaultAlgorithm
      case 'dark':
        return theme.darkAlgorithm
      default:
        return theme.defaultAlgorithm
    }
  })

  function generatePalettes(colors: Record<string, string>) {
    Object.keys(colors).forEach((key): void => {
      presetPalettes[key] = generate(presetPrimaryColors[key])
      presetPalettes[key].primary = presetPalettes[key][5]

      presetDarkPalettes[key] = generate(presetPrimaryColors[key], {
        theme: 'dark',
        backgroundColor: '#141414'
      })
      presetDarkPalettes[key].primary = presetDarkPalettes[key][5]
    })
  }

  function mountColorVariable(theme: ThemeType = 'light') {
    let palettes: PalettesProps
    switch (theme) {
      case 'light':
        palettes = presetPalettes
        break
      case 'dark':
        palettes = presetDarkPalettes
        break
      default:
        palettes = presetPalettes
        break
    }
    const oldColorTag = document.getElementById('shy-theme-colors')
    if (oldColorTag) document.head.removeChild(oldColorTag)
    let style = document.createElement('style')
    let colorVariables = ''
    style.id = 'shy-theme-colors'
    Object.keys(palettes).forEach((key) => {
      palettes[key].forEach((color, index) => {
        colorVariables += `--${key}-${index}: ${color};`
      })
    })
    style.innerHTML = `:root {${colorVariables}}`
    document.head.appendChild(style)
  }

  function setPrimaryColor(color: string) {
    primaryColor.value = color
  }

  function getVarColor(name: string) {
    return rootStyles.getPropertyValue(name).trim()
  }

  function setVarColor(name: string, color: string) {
    rootElement.style.setProperty(name, color)
  }

  function setThemeType(theme: ThemeType = 'light') {
    themeRef.value = theme
    mountColorVariable(theme)
    rootElement.setAttribute('data-theme', unref(themeRef))
  }

  return {
    getAntTheme,
    getAntvThemeAlgorithm,
    getThemeType,
    mountColorVariable,
    getVarColor,
    setPrimaryColor,
    setThemeType,
    setVarColor,
    generate,
    presetPalettes,
    presetDarkPalettes,
    presetPrimaryColors,
    basePalettes
  }
}
