import {
  isArray,
  isFunction,
  isObject,
  isString,
  isNullOrUnDef,
  dateUtil
} from '@shy-plugins/utils'
import { unref } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { FormProps, FormSchema } from '../types/form'
import { cloneDeep, isBoolean, isNumber, set } from 'lodash-es'
import dayjs from 'dayjs'

interface UseFormValuesContext {
  defaultValueRef: Ref<any>
  getSchema: ComputedRef<FormSchema[]>
  getProps: ComputedRef<FormProps>
  formModel: Recordable
}

/**
 * @desription deconstruct array-link key. This method will mutate the target.
 */
function tryDeconstructArray(key: string, value: any, target: Recordable) {
  const pattern = /^\[(.+)\]$/
  if (pattern.test(key)) {
    const match = key.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      value = Array.isArray(value) ? value : [value]
      keys.forEach((k, index) => {
        set(target, k.trim(), value[index])
      })
      return true
    }
  }
}

/**
 * @desription deconstruct object-link key. This method will mutate the target.
 */
function tryDeconstructObject(key: string, value: any, target: Recordable) {
  const pattern = /^\{(.+)\}$/
  if (pattern.test(key)) {
    const match = key.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      value = isObject(value) ? value : {}
      keys.forEach((k) => {
        set(target, k.trim(), value[k.trim()])
      })
      return true
    }
  }
}

export function useFormValues({
  defaultValueRef,
  getSchema,
  formModel,
  getProps
}: UseFormValuesContext) {
  // Processing form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {}
    }
    const res: Recordable = {}
    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue
      }
      const transformDateFunc = unref(getProps).transformDateFunc
      if (isObject(value)) {
        value = transformDateFunc?.(value)
      }

      if (isArray(value) && value[0]?.format && value[1]?.format) {
        value = value.map((item) => transformDateFunc?.(item))
      }
      // Remove spaces
      if (isString(value)) {
        value = value.trim()
      }
      if (
        !tryDeconstructArray(key, value, res) &&
        !tryDeconstructObject(key, value, res)
      ) {
        // 没有解构成功的，按原样赋值
        set(res, key, value)
      }
    }
    return handleRangeTimeValue(res)
  }

  /**
   * @description: Processing time interval parameters
   */
  function handleRangeTimeValue(values: Recordable) {
    const fieldMapToTime = unref(getProps).fieldMapToTime

    if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
      return values
    }

    for (const [
      field,
      [startTimeKey, endTimeKey],
      format = 'YYYY-MM-DD'
    ] of fieldMapToTime) {
      if (!field || !startTimeKey || !endTimeKey) {
        continue
      }
      // If the value to be converted is empty, remove the field
      if (!values[field]) {
        Reflect.deleteProperty(values, field)
        continue
      }

      const [startTime, endTime]: string[] = values[field]

      const [startTimeFormat, endTimeFormat] = Array.isArray(format)
        ? format
        : [format, format]

      values[startTimeKey] = dateUtil(startTime).format(startTimeFormat)
      values[endTimeKey] = dateUtil(endTime).format(endTimeFormat)
      Reflect.deleteProperty(values, field)
    }

    const rangePickerField = unref(getProps)?.rangePickerField || []

    rangePickerField.forEach((fieldConfig: any) => {
      if (values[fieldConfig[0]] && Array.isArray(values[fieldConfig[0]])) {
        const startTimeKey = fieldConfig[1] || '00:00:00'
        const endTimeKey = fieldConfig[2] || '23:59:59'

        values[fieldConfig[0]][0] =
          dayjs(values[fieldConfig[0]][0]).format('YYYY-MM-DD') +
          ' ' +
          startTimeKey

        values[fieldConfig[0]][1] =
          dayjs(values[fieldConfig[0]][1]).format('YYYY-MM-DD') +
          ' ' +
          endTimeKey
      }
    })

    return values
  }

  function initDefault() {
    const treeExpandSchema = (
      schemas: FormSchema[],
      link = false,
      linkField?: string | number
    ) => {
      return schemas.flatMap((item) => {
        const { componentProps } = item || {}
        let _props = componentProps as any
        if (typeof componentProps === 'function') {
          _props = _props({ formModel })
        }

        const isGroup = item.component === 'Group'
        const isGroupInObj =
          !isBoolean(_props?.groupInObject) ||
          (isBoolean(_props.groupInObject) && _props.groupInObject)

        const isDeconstruct =
          !isNumber(_props?.deconstructLevel) ||
          (isNumber(_props.deconstructLevel) && _props.deconstructLevel)

        if (isGroup && !isGroupInObj && isDeconstruct && link) {
          treeExpandSchema(
            _props.schemas,
            true,
            [...`${linkField}`!.split('.'), item.field]
              .slice(0, -_props.deconstructLevel)
              .join('.')
          )
        }

        if (isGroup && !isGroupInObj) {
          return treeExpandSchema(_props.schemas)
        }

        if (isGroup && isGroupInObj && link) {
          return treeExpandSchema(
            _props.schemas,
            true,
            [linkField, item.field].join('.')
          )
        }

        if (isGroup && isGroupInObj) {
          return treeExpandSchema(_props.schemas, true, item.field)
        }

        if (link) {
          item.field = [linkField, item.field].join('.')
        }

        item.field.startsWith('.') && (item.field = item.field.slice(1))

        return item
      })
    }

    const schemas = treeExpandSchema(unref(getSchema))
    console.log(schemas)
    const obj: Recordable = {}
    schemas.forEach((item) => {
      const { defaultValue } = item
      if (isNullOrUnDef(defaultValue)) return
      set(obj, item.field, defaultValue)
      if (!isNullOrUnDef(formModel[item.field])) return
      set(formModel, item.field, defaultValue)
    })
    defaultValueRef.value = cloneDeep(obj)
  }

  return { handleFormValues, initDefault }
}
