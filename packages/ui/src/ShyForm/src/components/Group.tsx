import { computed, defineComponent, unref } from 'vue'
import { FormItemProps } from '../props'
import { FormSchema } from '../types/form'
import FormItem from './FormItem'
import { dateItemType } from '../helper'
import { dateUtil } from '@shy-plugins/utils'
import { cloneDeep, isFunction, pick } from 'lodash-es'
import { Col, Row, Collapse, CollapsePanel } from 'ant-design-vue'
import { useDesign } from '@shy-plugins/use'
import { ROW_SLICE, ACTION_COL } from '../props'
import { ColEx } from '../types'
import { useFormContext } from '../hooks/useFormContext'

const Group = defineComponent({
  props: {
    ...FormItemProps,
    schemas: {
      type: Array as PropType<FormSchema[]>,
      default: () => [] as PropType<FormSchema[]>
    },
    groupInObject: {
      type: Boolean,
      default: true
    },
    groupType: {
      type: String as PropType<'Divider' | 'Collapse'>,
      default: 'Collapse'
    },
    baseColProps: {
      type: Object as PropType<Partial<ColEx>>
    }
  },
  setup(props) {
    const { prefixCls } = useDesign('ant-form')

    const { contextBindValue } = useFormContext()

    const getSchema = computed((): FormSchema[] => {
      const schemas: FormSchema[] = props.schemas as any
      for (const schema of schemas) {
        const {
          defaultValue,
          component,
          componentProps,
          isHandleDateDefaultValue = true
        } = schema
        if (
          isHandleDateDefaultValue &&
          defaultValue &&
          component &&
          dateItemType.includes(component)
        ) {
          const valueFormat = componentProps
            ? componentProps['valueFormat']
            : null
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = valueFormat
              ? dateUtil(defaultValue).format(valueFormat)
              : dateUtil(defaultValue)
          } else {
            const def: any[] = []
            defaultValue.forEach((item) => {
              def.push(
                valueFormat
                  ? dateUtil(item).format(valueFormat)
                  : dateUtil(item)
              )
            })
            schema.defaultValue = def
          }
        }
      }
      return cloneDeep(schemas as FormSchema[])
    })

    const renderItem = (schema) => {
      return (
        <FormItem
          {...pick(props, Object.keys(FormItemProps))}
          style={{
            [`--col-span`]: `${
              ((schema.colProps?.span ??
                unref(contextBindValue)?.baseColProps?.span) /
                (ROW_SLICE + ACTION_COL)) *
              100
            }%`
          }}
          schema={{
            ...schema,
            field: props.groupInObject
              ? [props.schema.field, schema.field]
              : schema.field
          }}
        ></FormItem>
      )
    }

    const renderFormItems = () => {
      return getSchema.value.map((schema) => {
        return renderItem(schema)
      })
    }

    const renderGroup = () => {
      const { schema, tableAction, formModel, formActionType } = props
      let { componentProps, colProps } = props.schema

      // if (isFunction(componentProps)) {
      //   return null
      // }
      if (isFunction(componentProps)) {
        componentProps =
          componentProps({ schema, tableAction, formModel, formActionType: formActionType! }) ??
          {}
      }

      switch (props.groupType) {
        case 'Divider':
          return
        case 'Collapse':
          return (
            <Collapse
              {...componentProps}
              class={`${prefixCls}-collapse`}
              style={{
                [`--col-span`]: `${
                  ((colProps?.span ??
                    unref(contextBindValue)?.baseColProps?.span) /
                    (ROW_SLICE + ACTION_COL)) *
                  100
                }%`
              }}
              bordered={false}
            >
              <CollapsePanel
                v-slots={{
                  header: () => (
                    <FormItem
                      {...pick(props, Object.keys(FormItemProps))}
                      style={{
                        [`--col-span`]: `${
                          ((colProps?.span ??
                            unref(contextBindValue)?.baseColProps?.span) /
                            (ROW_SLICE + ACTION_COL)) *
                          100
                        }%`
                      }}
                      schema={{ ...props.schema, component: 'Divider' }}
                    ></FormItem>
                  )
                }}
              >
                {renderFormItems()}
              </CollapsePanel>
            </Collapse>
          )
      }
    }

    return () => {
      return (
        <Row class={`${prefixCls}-row`}>
          <Col span={ROW_SLICE + ACTION_COL} class={`${prefixCls}-content-col`}>
            <Row class={`${prefixCls}-input`}>{renderGroup()}</Row>
          </Col>
        </Row>
      )
    }
  }
})

export { Group }
