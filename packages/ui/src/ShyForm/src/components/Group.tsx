import { defineComponent, JSXComponent, shallowRef, unref } from 'vue'
import { FormItemProps } from '../props'
import { FormSchema } from '../types/form'
import FormItem from './FormItem'
import { isArray, isFunction, pick } from 'lodash-es'
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
      type: String as PropType<'Divider' | 'Collapse' | 'Origin' | 'Custom'>,
      default: 'Collapse'
    },
    baseColProps: {
      type: Object as PropType<Partial<ColEx>>
    },
    CustomGroupComp: {
      type: Object as PropType<JSXComponent>
    },
    slots: {
      type: Object as PropType<Record<string, JSXComponent>>
    },
    deconstructLevel: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const activeKey = shallowRef([props.schema.field])

    const { prefixCls } = useDesign('ant-form')

    const { contextBindValue } = useFormContext()

    const renderItem = (schema) => {
      const realSpan =
        (schema.colProps?.span ?? unref(contextBindValue)?.baseColProps?.span) /
        (unref(ROW_SLICE) + unref(ACTION_COL))

      return (
        <FormItem
          {...pick(props, Object.keys(FormItemProps))}
          style={{
            [`--col-span`]: `${realSpan * 100}%`,
            [`--w-gap`]: `${realSpan * unref(contextBindValue).gap}px`
          }}
          schema={{
            ...schema,
            field: props.groupInObject
              ? [
                  ...(isArray(props.schema.field)
                    ? props.schema.field
                    : [props.schema.field]),
                  schema.field
                ]
              : schema.field
          }}
        ></FormItem>
      )
    }

    const renderFormItems = () => {
      return props.schemas.map((schema) => {
        return renderItem(schema)
      })
    }

    const renderGroup = () => {
      const { schema, tableAction, formModel, formActionType } = props
      let { componentProps: _componentProps, colProps } = props.schema
      let componentProps: any = _componentProps
      if (isFunction(componentProps)) {
        componentProps =
          componentProps({
            schema,
            tableAction,
            formModel,
            formActionType: formActionType!
          }) ?? {}
      }

      const realSpan =
        (schema.colProps?.span ?? unref(contextBindValue)?.baseColProps?.span) /
        (unref(ROW_SLICE) + unref(ACTION_COL))

      switch (props.groupType) {
        case 'Divider':
          return (
            <>
              <FormItem
                {...pick(props, Object.keys(FormItemProps))}
                style={{
                  [`--col-span`]: `${realSpan * 100}%`,
                  [`--w-gap`]: `${realSpan * unref(contextBindValue).gap}px`
                }}
                schema={{ ...props.schema, component: 'Divider' }}
              ></FormItem>
              {renderFormItems()}
            </>
          )
        case 'Collapse':
          return (
            <Collapse
              {...componentProps}
              v-model:activeKey={activeKey.value}
              class={`${prefixCls}-collapse`}
              style={{
                [`--col-span`]: `${realSpan * 100}%`,
                [`--w-gap`]: `${realSpan * unref(contextBindValue).gap}px`
              }}
              bordered={false}
            >
              <CollapsePanel
                key={props.schema.field}
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
        case 'Origin':
          return renderFormItems()
        case 'Custom':
          return (() => {
            const { CustomGroupComp } = props
            if (!CustomGroupComp) return

            return (
              <CustomGroupComp
                {...componentProps}
                v-slots={{ ...componentProps?.slots }}
              >
                {renderFormItems()}
              </CustomGroupComp>
            )
          })()
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
