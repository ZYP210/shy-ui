import type { InputProps } from 'ant-design-vue'
import { Input, InputNumber, Select, theme, Popover } from 'ant-design-vue'
import classNames from 'ant-design-vue/es/_util/classNames'
import type { PropType } from 'vue'
import { defineComponent, computed, ref, toRefs, watchEffect } from 'vue'
import { HexColorPicker, RgbaColorPicker } from './vue-colorful'
import tinycolor from 'tinycolor2'
import makeStyle from './utils/makeStyle'
import { useDebounceFn } from '@vueuse/core'

const { useToken } = theme

const useStyle = makeStyle('ColorPanel', (token) => ({
  '.color-panel': {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    border: '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: token.boxShadow,
    width: 224,
    boxSizing: 'border-box',

    '.color-panel-mode': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 6
    },
    '.color-panel-preview': {
      width: 24,
      height: 24,
      borderRadius: 4,
      boxShadow:
        '0 2px 3px -1px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.09)',
      flex: 'none',
      overflow: 'hidden',
      background:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==) 0% 0% / 32px'
    },
    '.color-panel-preset-colors': {
      paddingTop: 12,
      display: 'flex',
      flexWrap: 'wrap',
      width: 200
    },
    '.color-panel-preset-color-btn': {
      borderRadius: 4,
      width: 20,
      height: 20,
      border: 'none',
      outline: 'none',
      margin: 4,
      cursor: 'pointer',
      boxShadow:
        '0 2px 3px -1px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.09)'
    },
    '.color-panel-mode-title': {
      color: token.colorTextPlaceholder,
      marginTop: 2,
      fontSize: 12,
      textAlign: 'center'
    },
    '.color-panel-rgba-input': {
      display: 'flex',
      alignItems: 'center',
      '&-part': {
        flex: 1,
        width: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '&-title': {
          color: token.colorTextPlaceholder,
          marginTop: 2,
          fontSize: 12
        },

        '&:not(:last-child)': {
          marginRight: 4
        },

        [`${token.rootCls}-input-number`]: {
          width: '100%',
          input: {
            fontSize: 12,
            padding: '0 4px'
          }
        }
      }
    }
  }
}))

export type HexColorInputProps = {
  value: string
  alpha?: boolean
}

const getHexValue = (value: string, alpha = false) => {
  return alpha ? tinycolor(value).toHex8() : tinycolor(value).toHex()
}

const HexColorInput = defineComponent({
  name: 'HexColorInput',
  props: {
    value: { type: String },
    alpha: { type: Boolean }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { value, alpha } = toRefs(props)

    const hexValue = ref<string>(value.value!)
    const focusRef = ref<boolean>(false)

    const handleChange: InputProps['onChange'] = (e) => {
      hexValue.value = e.target.value!
      emit('change', getHexValue(e.target.value!, alpha.value))
    }

    const handleBlur: InputProps['onBlur'] = (e: any) => {
      focusRef.value = false
      hexValue.value = getHexValue(e.target.value, alpha.value)
    }

    const handleFocus = () => {
      focusRef.value = true
    }

    watchEffect(() => {
      if (!focusRef.value) {
        hexValue.value = getHexValue(value.value!, alpha.value)
      }
    })

    return () => {
      return (
        <div>
          <Input
            size="small"
            value={hexValue.value}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            v-slots={{
              prefix: () => '#'
            }}
          />
          <div class="color-panel-mode-title">HEX{alpha.value ? '8' : ''}</div>
        </div>
      )
    }
  }
})

type RgbaColor = tinycolor.ColorFormats.RGBA

export type RgbColorInputProps = {
  value?: RgbaColor
  alpha?: boolean
}

const RgbColorInput = defineComponent({
  name: 'RgbColorInput',
  props: {
    value: {
      type: Object as PropType<RgbaColor>,
      default: () => ({ r: 0, g: 0, b: 0, a: 1 })
    },
    onChange: { type: Function as PropType<(value: RgbaColor) => void> },
    alpha: { type: Boolean }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { value, alpha } = toRefs(props)

    const focusRef = ref<boolean>(false)
    const rgbaValue = ref<typeof value.value>(value.value!)

    const handleBlur: InputProps['onBlur'] = (e: any) => {
      focusRef.value = false
      rgbaValue.value = value.value
    }

    const handleFocus = () => {
      focusRef.value = true
    }

    const handleChangeR = (e) => {
      rgbaValue.value.r = e
      emit('change', rgbaValue.value!)
    }

    const handleChangeG = (e) => {
      rgbaValue.value.g = e
      emit('change', rgbaValue.value!)
    }

    const handleChangeB = (e) => {
      rgbaValue.value.b = e
      emit('change', rgbaValue.value!)
    }

    const handleChangeA = (e) => {
      rgbaValue.value.a = e
      emit('change', rgbaValue.value!)
    }

    watchEffect(() => {
      if (!focusRef.value) {
        rgbaValue.value = value.value
      }
    })

    return () => {
      return (
        <div class="color-panel-rgba-input">
          <div class="color-panel-rgba-input-part">
            <InputNumber
              min={0}
              max={255}
              size="small"
              value={rgbaValue.value.r}
              R
              onFocus={handleFocus}
              onChange={handleChangeR}
              onBlur={handleBlur}
            />
            <div class="color-panel-mode-title">R</div>
          </div>
          <div class="color-panel-rgba-input-part">
            <InputNumber
              min={0}
              max={255}
              size="small"
              value={rgbaValue.value.g}
              onFocus={handleFocus}
              onChange={handleChangeG}
              onBlur={handleBlur}
            />
            <div class="color-panel-mode-title">G</div>
          </div>
          <div class="color-panel-rgba-input-part">
            <InputNumber
              min={0}
              max={255}
              size="small"
              B
              value={rgbaValue.value.b}
              onFocus={handleFocus}
              onChange={handleChangeB}
              onBlur={handleBlur}
            />
            <div class="color-panel-mode-title">B</div>
          </div>
          {alpha.value && (
            <div class="color-panel-rgba-input-part">
              <InputNumber
                min={0}
                max={1}
                step={0.01}
                size="small"
                value={rgbaValue.value.a}
                onFocus={handleFocus}
                onChange={handleChangeA}
                onBlur={handleBlur}
              />
              <div class="color-panel-mode-title">A</div>
            </div>
          )}
        </div>
      )
    }
  }
})

export type ColorPanelProps = {
  color: string
  alpha?: boolean
}

const colorModes = ['HEX', 'HEX8', 'RGB', 'RGBA'] as const

type ColorMode = (typeof colorModes)[number]

const getColorStr = (color: any, mode: ColorMode) => {
  switch (mode) {
    case 'HEX':
      return tinycolor(color).toHexString()
    case 'HEX8':
      return tinycolor(color).toHex8String()
    case 'RGBA':
    case 'RGB':
    default:
      return tinycolor(color).toRgbString()
  }
}
const ColorPickerPanel = defineComponent({
  name: 'ColorPickerPanel',
  inheritAttrs: false,
  props: {
    value: { type: String, default: '#000' },
    alpha: { type: Boolean }
  },
  emits: ['change', 'update:value'],
  setup(props, { attrs, emit }) {
    // const { color, alpha } = toRefs(props)

    const { token } = useToken()
    const [_, hashId] = useStyle()
    const colorMode = ref<ColorMode>('HEX')

    const presetColors = computed(() => {
      return [
        token.value.blue,
        token.value.purple,
        token.value.cyan,
        token.value.green,
        token.value.magenta,
        token.value.pink,
        token.value.red,
        token.value.orange,
        token.value.yellow,
        token.value.volcano,
        token.value.geekblue,
        token.value.gold,
        token.value.lime,
        '#000'
      ]
    })

    const handleChange = useDebounceFn((value) => {
      emit('update:value', value)
      emit('change', value)
    })

    const handleColorModeChange = (value) => {
      colorMode.value = value as ColorMode
      handleChange(getColorStr(props.value, value))
    }

    return () => {
      return (
        <Popover
          trigger="click"
          placement="bottomRight"
          overlayInnerStyle={{ padding: 0 }}
          v-slots={{
            content: () => (
              <div {...attrs} class={classNames(hashId.value, 'color-panel')}>
                {(colorMode.value === 'HEX' || colorMode.value === 'RGB') && (
                  <HexColorPicker
                    style={{ height: '160px' }}
                    color={tinycolor(props.value).toHex()}
                    onChange={useDebounceFn((value) => {
                      handleChange(getColorStr(value, colorMode.value))
                    }, 1)}
                  />
                )}
                {(colorMode.value === 'RGBA' || colorMode.value === 'HEX8') && (
                  <RgbaColorPicker
                    style={{ height: '160px' }}
                    color={tinycolor(props.value).toRgb()}
                    onChange={useDebounceFn((value) => {
                      handleChange(getColorStr(value, colorMode.value))
                    }, 1)}
                  />
                )}
                <div style={{ marginTop: '12px' }}>
                  <div class="color-panel-mode">
                    <div class="color-panel-preview">
                      <div
                        style={{
                          backgroundColor: props.value,
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </div>
                    <Select
                      value={colorMode.value}
                      onChange={handleColorModeChange}
                      options={colorModes.map((item) => ({
                        value: item,
                        key: item
                      }))}
                      size="small"
                      bordered={false}
                      dropdownMatchSelectWidth={false}
                    />
                  </div>
                  {colorMode.value === 'HEX' && (
                    <HexColorInput
                      value={tinycolor(props.value).toHex()}
                      onChange={(v) => handleChange(tinycolor(v).toHexString())}
                    />
                  )}
                  {colorMode.value === 'HEX8' && (
                    <HexColorInput
                      alpha
                      value={tinycolor(props.value).toHex8()}
                      onChange={(v) =>
                        handleChange(tinycolor(v).toHex8String())
                      }
                    />
                  )}
                  {(colorMode.value === 'RGBA' ||
                    colorMode.value === 'RGB') && (
                    <RgbColorInput
                      alpha={colorMode.value === 'RGBA'}
                      value={tinycolor(props.value).toRgb()}
                      onChange={(v) => handleChange(tinycolor(v).toRgbString())}
                    />
                  )}
                </div>
                <div class="color-panel-preset-colors">
                  {presetColors.value.map((presetColor) => (
                    <button
                      key={presetColor}
                      class="color-panel-preset-color-btn"
                      style={{ backgroundColor: presetColor }}
                      onClick={() => handleChange(presetColor)}
                    />
                  ))}
                </div>
              </div>
            )
          }}
        >
          <div
            style={{
              backgroundColor: props.value,
              width: '48px',
              height: '32px',
              borderRadius: '4px',
              marginRight: '14px',
              boxShadow:
                '0 2px 3px -1px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.09)'
            }}
          ></div>
        </Popover>
      )
    }
  }
})

export default ColorPickerPanel
