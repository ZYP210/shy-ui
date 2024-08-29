import type { Component } from 'vue'
import {
  Input,
  Select,
  Checkbox,
  InputNumber,
  Switch,
  DatePicker,
  TimePicker,
  AutoComplete,
  Radio
} from 'ant-design-vue'
import type { ComponentType } from './types/componentType'
import {
  ShyApiSelect,
  ShyApiTreeSelect,
  ShyRadioButtonGroup,
  ShyApiRadioGroup
} from '../ShyForm'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', Input)
componentMap.set('InputNumber', InputNumber)
componentMap.set('InputTextArea', Input.TextArea)
componentMap.set('Select', Select)
componentMap.set('ApiSelect', ShyApiSelect)
componentMap.set('AutoComplete', AutoComplete)
componentMap.set('ApiTreeSelect', ShyApiTreeSelect)
componentMap.set('Switch', Switch)
componentMap.set('Checkbox', Checkbox)
componentMap.set('DatePicker', DatePicker)
componentMap.set('TimePicker', TimePicker)
componentMap.set('RadioGroup', Radio.Group)
componentMap.set('RadioButtonGroup', ShyRadioButtonGroup)
componentMap.set('ApiRadioGroup', ShyApiRadioGroup)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
