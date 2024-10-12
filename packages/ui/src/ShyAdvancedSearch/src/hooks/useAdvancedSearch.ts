import { computed, ComputedRef, unref } from 'vue'
import type {
  AdvancedSearchType,
  SchemasAdvancedSearch
} from '../types'
import { omit } from 'lodash-es'
import {
  FormActionType,
  RegisterFormFn,
  ShyFormSchema,
  useShyForm
} from '../../../ShyForm'
import {
  CONTAIN_OPERATOR_OPTIONS,
  DATE_OPERATOR_OPTIONS,
  EQUAL_OPERATOR_OPTIONS,
  NUMBER_OPERATOR_OPTIONS,
  STRING_OPERATOR_OPTIONS
} from '../constant'
import { NamePath } from 'ant-design-vue/lib/form/interface'
import { isFunction } from 'lodash-es'

export const useAdvancedSearch = (
  schemas: ComputedRef<SchemasAdvancedSearch[]>,
  formActionType: FormActionType
): [RegisterFormFn, FormActionType] => {
  const getSchemaOptions = (type: AdvancedSearchType) => {
    switch (type) {
      case 'number':
        return NUMBER_OPERATOR_OPTIONS
      case 'string':
        return STRING_OPERATOR_OPTIONS
      case 'date':
        return DATE_OPERATOR_OPTIONS
      case 'equal':
        return EQUAL_OPERATOR_OPTIONS
      case 'contain':
        return CONTAIN_OPERATOR_OPTIONS
    }
  }

  const advancedSchemas = computed<ShyFormSchema[]>(() => {
    return unref(schemas)
      .filter((schema) => schema.advancedShow)
      .map((schema) => {
        const options = getSchemaOptions(schema.type)

        return {
          label: schema.label,
          field: `${schema.field}-group`,
          component: 'Group',
          defaultValue: {
            operator: options[0].value,
            position: false
          },
          componentProps: {
            groupType: 'Origin',
            schemas: [
              {
                label: schema.label,
                field: 'operator',
                component: 'Select',
                componentProps: {
                  options,
                  allowClear: false
                },
                colProps: { span: 8 }
              },
              {
                ...schema,
                label: '',
                colProps: { span: 14 }
              },
              {
                label: '',
                field: 'position',
                component: 'Switch',
                componentProps: {
                  checkedChildren: '外',
                  unCheckedChildren: '内'
                },
                colProps: { span: 2 }
              }
            ]
          },
          colProps: { span: 24 }
        }
      })
  })

  const maxAdvancedLabelWidth = computed(() => {
    const maxLabelLength = Math.max(
      ...unref(schemas).map((schema) => schema.label.length)
    )

    return maxLabelLength * 14
  })

  const [register, methods] = useShyForm({
    schemas: advancedSchemas,
    layout: 'horizontal',
    labelWidth: maxAdvancedLabelWidth,
    onFieldValueChange
  })

  function onFieldValueChange(key: NamePath, value: any) {
    const [groupField, childField] = key as [string, string]

    const { componentProps, label } = unref(advancedSchemas).find(
      (schema) => schema.field === groupField
    )!
    if (componentProps && isFunction(componentProps)) return

    const field = groupField.split('-')[0]
    const values = methods.getFieldsValue()
    if (!values[groupField].operator) return

    const {
      appendSchemaByField,
      removeSchemaByField,
      updateSchema,
      setFieldsValue
    } = formActionType
    const {
      schemas: [operatorSchema, valueSchema]
    } = componentProps! as {
      schemas: [ShyFormSchema, ShyFormSchema, ShyFormSchema]
    }

    if (childField === field) {
      setFieldsValue({ [field]: value })
    }

    if (childField === 'operator') {
      updateSchema({
        ...omit(operatorSchema, ['label', 'field', 'colProps', 'defaultValue']),
        label: '',
        field: `${field}-op`,
        show: false,
        defaultValue: values[groupField].operator
      })
    }

    if (childField === 'position') {
      value
        ? (async () => {
            await appendSchemaByField(
              {
                ...omit(valueSchema, 'colProps'),
                label,
                defaultValue: values[groupField][field]
              },
              field
            )
            await appendSchemaByField(
              {
                ...omit(operatorSchema, [
                  'label',
                  'field',
                  'colProps',
                  'defaultValue'
                ]),
                label: '',
                field: `${field}-op`,
                show: false,
                defaultValue: values[groupField].operator
              },
              field
            )
          })()
        : removeSchemaByField([field, `${field}-op`])
    }
  }

  return [register, methods]
}
