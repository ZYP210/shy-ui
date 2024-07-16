import type { JSXComponent } from 'vue'
import type { ComponentType } from '../../ShyForm/src/types/index'

/**
 * Component list, register here to setting it in the form
 */
import {
  Input,
  Select,
  Radio,
  Checkbox,
  AutoComplete,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TimePicker,
  TreeSelect,
  Slider,
  Rate
} from 'ant-design-vue'
import { BasicTitle as Divider } from '../../Basic/'

import ApiRadioGroup from '../../ShyForm/src/components/ApiRadioGroup.vue'
import RadioButtonGroup from '../../ShyForm/src/components/RadioButtonGroup.vue'
import ApiSelect from '../../ShyForm/src/components/ApiSelect.vue'
import ApiTree from '../../ShyForm/src/components/ApiTree.vue'
import ApiTreeSelect from '../../ShyForm/src/components/ApiTreeSelect.vue'
import ApiCascader from '../../ShyForm/src/components/ApiCascader.vue'
import ApiTransfer from '../../ShyForm/src/components/ApiTransfer.vue'
// import Upload from './components/Upload.vue'
import { StrengthMeter } from '../../StrengthMeter'
import { IconPicker } from '../../Icon'
import { CountdownInput } from '../../CountDown'
import Tinymce from '../../ShyForm/src/components/Tinymce.vue'
import { ShyFormTable } from '../../ShyForm/src/components/Table'
import { BasicUpload } from '../../Upload'
import { ColorPickerPopover } from '../../ColorPickerPopover'
import { Group } from '../../ShyForm/src/components/Group'

// import ApiModalSelect from './components/ApiModalSelect/ApiModalSelect.vue'

const ShyComponentMap = new Map<ComponentType, JSXComponent>()

ShyComponentMap.set('Input', Input)
ShyComponentMap.set('InputGroup', Input.Group)
ShyComponentMap.set('InputPassword', Input.Password)
ShyComponentMap.set('InputSearch', Input.Search)
ShyComponentMap.set('InputTextArea', Input.TextArea)
ShyComponentMap.set('InputNumber', InputNumber)
ShyComponentMap.set('AutoComplete', AutoComplete)

ShyComponentMap.set('Select', Select)
ShyComponentMap.set('ApiSelect', ApiSelect)
ShyComponentMap.set('ApiTree', ApiTree)
ShyComponentMap.set('TreeSelect', TreeSelect)
ShyComponentMap.set('ApiTreeSelect', ApiTreeSelect)
ShyComponentMap.set('ApiRadioGroup', ApiRadioGroup)
ShyComponentMap.set('Switch', Switch)
ShyComponentMap.set('RadioButtonGroup', RadioButtonGroup)
ShyComponentMap.set('RadioGroup', Radio.Group)
ShyComponentMap.set('Checkbox', Checkbox)
ShyComponentMap.set('CheckboxGroup', Checkbox.Group)
ShyComponentMap.set('ApiCascader', ApiCascader)
ShyComponentMap.set('Cascader', Cascader)
ShyComponentMap.set('Slider', Slider)
ShyComponentMap.set('Rate', Rate)
ShyComponentMap.set('ApiTransfer', ApiTransfer)
ShyComponentMap.set('Upload', BasicUpload)

// ShyComponentMap.set('ApiModalSelect', ApiModalSelect)

ShyComponentMap.set('DatePicker', DatePicker)
ShyComponentMap.set('MonthPicker', DatePicker.MonthPicker)
ShyComponentMap.set('RangePicker', DatePicker.RangePicker)
ShyComponentMap.set('WeekPicker', DatePicker.WeekPicker)
ShyComponentMap.set('TimePicker', TimePicker)
ShyComponentMap.set('StrengthMeter', StrengthMeter)
ShyComponentMap.set('IconPicker', IconPicker)
ShyComponentMap.set('InputCountDown', CountdownInput)
ShyComponentMap.set('Table', ShyFormTable)
ShyComponentMap.set('Tinymce', Tinymce)

// ShyComponentMap.set('Upload', Upload)
ShyComponentMap.set('Divider', Divider)
ShyComponentMap.set('ColorPicker', ColorPickerPopover)
ShyComponentMap.set('Group', Group)

export function add(compName: ComponentType, component: JSXComponent) {
  ShyComponentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  ShyComponentMap.delete(compName)
}

export { ShyComponentMap }
