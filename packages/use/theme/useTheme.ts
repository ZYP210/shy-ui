import { theme } from 'ant-design-vue'
import { computed, reactive, ref, unref } from 'vue'
import generate from './generate'
import { watch } from 'vue'
import { cloneDeep } from 'lodash-es'

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark'
}
export type ThemeType = ThemeEnum.LIGHT | ThemeEnum.DARK
export type PalettesProps = Record<string, string[] & { primary?: string }>

const otherScopes = reactive<Record<string, ThemeType>>({})
const presetPalettes: PalettesProps = reactive({})
const presetDarkPalettes: PalettesProps = reactive({})
const themeRef = ref<ThemeType>(ThemeEnum.LIGHT)
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
    setThemeType(ThemeEnum.LIGHT)
    mountColorVariable()
  }

  watch(
    () => otherScopes,
    () => {
      mountColorVariable(unref(themeRef))
    },
    {
      deep: true
    }
  )

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

  const getScopeAntColor = computed(() =>
    Object.keys(otherScopes).reduce((pre, cur) => {
      const formCompProps = {
        colorBgContainer: getScopeVarColor(cur, '--gray-1'),
        lineWidth: 0
      }

      pre[cur] = {
        token: {
          borderRadius: 4,
          colorPrimary: presetPrimaryColors.primary,
          ...presetPrimaryColors
        },
        algorithm: getAntvThemeAlgorithmFn(otherScopes[cur]),
        components: {
          Input: formCompProps,
          DatePicker: formCompProps,
          InputNumber: formCompProps,
          Select: formCompProps
        }
      }

      return pre
    }, {})
  )

  const getAntvThemeAlgorithmFn = (themeType: ThemeType) => {
    switch (themeType) {
      case ThemeEnum.LIGHT:
        return theme.defaultAlgorithm
      case ThemeEnum.DARK:
        return theme.darkAlgorithm
      default:
        return theme.defaultAlgorithm
    }
  }

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

  const getAntvThemeAlgorithm = computed(() =>
    getAntvThemeAlgorithmFn(unref(getThemeType))
  )

  const getOtherScopes = computed(() => {
    return cloneDeep(otherScopes)
  })

  function generatePalettes(colors: Record<string, string>) {
    Object.keys(colors).forEach((key): void => {
      presetPalettes[key] = generate(presetPrimaryColors[key])
      presetPalettes[key].primary = presetPalettes[key][5]

      presetDarkPalettes[key] = generate(presetPrimaryColors[key], {
        theme: ThemeEnum.DARK,
        backgroundColor: '#141414'
      })
      presetDarkPalettes[key].primary = presetDarkPalettes[key][5]
    })
  }

  function getPalettes(theme: ThemeType): PalettesProps {
    switch (theme) {
      case ThemeEnum.LIGHT:
        return presetPalettes
      case ThemeEnum.DARK:
        return presetDarkPalettes
    }
  }

  function mountColorVariable(theme: ThemeType = ThemeEnum.LIGHT) {
    const rootPalettes = getPalettes(theme)
    const oldColorTag = document.getElementById('shy-theme-colors')
    if (oldColorTag) document.head.removeChild(oldColorTag)
    let style = document.createElement('style')
    let colorVariables = ''
    style.id = 'shy-theme-colors'
    Object.keys(rootPalettes).forEach((key) => {
      rootPalettes[key].forEach((color, index) => {
        colorVariables += `--${key}-${index}: ${color};`
      })
    })

    const otherScopeNames = Object.keys(otherScopes).reduce<{
      dark: string[]
      light: string[]
    }>(
      (pre, key) => {
        switch (otherScopes[key]) {
          case ThemeEnum.LIGHT:
            pre.light.push(key)
            return pre
          case ThemeEnum.DARK:
            pre.dark.push(key)
            return pre
        }
      },
      {
        dark: [],
        light: []
      }
    )

    !otherScopeNames.dark.length &&
      Reflect.deleteProperty(otherScopeNames, ThemeEnum.DARK)
    !otherScopeNames.light.length &&
      Reflect.deleteProperty(otherScopeNames, ThemeEnum.LIGHT)

    style.innerHTML = `:root {${colorVariables}} ${Object.keys(
      otherScopeNames
    ).map((key) => {
      const otherPalettes = getPalettes(key as ThemeType)
      let otherColorVariables = ''
      Object.keys(otherPalettes).forEach((key) => {
        otherPalettes[key].forEach((color, index) => {
          otherColorVariables += `--${key}-${index}: ${color};`
        })
      })

      const otherColorThemeTypeClass = otherScopeNames[key].reduce(
        (pre, cur) => {
          return (pre += `${cur} {
              --theme: var(--${key});
               --text-color: var(--${
                 key === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT
               });
               color-scheme: ${key};
            }`)
        },
        ''
      )

      return `${otherScopeNames[key].join(
        ','
      )} {${otherColorVariables}} ${otherColorThemeTypeClass}`
    })}`

    document.head.appendChild(style)
  }

  function setOtherScopes(scopes: Record<string, ThemeType>) {
    Object.assign(otherScopes, scopes)
  }

  function setPrimaryColor(color: string) {
    primaryColor.value = color
  }

  function getScopeVarColor(scope: string, name: string) {
    const scopeElement = document.querySelector('#shy-theme-colors')!
    const styles = scopeElement.innerHTML
    const scopeColors = styles.substring(
      styles.search(scope),
      styles.indexOf('}', styles.search(scope))
    )
    const varColor = scopeColors.substring(
      scopeColors.search(`${name}:`) + name.length + 1,
      scopeColors.indexOf(';', scopeColors.search(`${name}:`))
    )

    return varColor.trim()
  }

  function getVarColor(name: string) {
    return rootStyles.getPropertyValue(name).trim()
  }

  function setVarColor(name: string, color: string) {
    rootElement.style.setProperty(name, color)
  }

  function setThemeType(theme: ThemeType = ThemeEnum.LIGHT) {
    themeRef.value = theme
    mountColorVariable(theme)
    rootElement.setAttribute('data-theme', unref(themeRef))
  }

  return {
    getScopeAntColor,
    getAntTheme,
    getAntvThemeAlgorithm,
    getThemeType,
    getOtherScopes,
    mountColorVariable,
    getScopeVarColor,
    getVarColor,
    setOtherScopes,
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
