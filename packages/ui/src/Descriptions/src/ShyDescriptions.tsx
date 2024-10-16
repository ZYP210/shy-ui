import { defineComponent, computed, ref, unref } from 'vue'
import { DescriptionProps, DescItem } from './typing'
import { basicProps, basicRowProps, basicColProps } from './props'
import { Collapse } from 'ant-design-vue'
import type { CSSProperties } from 'vue'
import { BasicTitle as Divider, BasicHelp } from '../../Basic'

import {
  isBoolean,
  isFunction,
  isNumber,
  isArray,
  isEmpty
} from '@shy-plugins/utils'
import { useDesign } from '@shy-plugins/use'
import { ShyTag } from '../../ShyTag'
import './descriptions.less'
import Descriptions from './Descriptions'

export default defineComponent({
  name: 'ShyDescriptions',
  props: basicProps,
  emits: ['register'],
  setup(props, { emit, slots }) {
    const innerProps = ref<DescriptionProps | null>(null)
    const { prefixCls } = useDesign('basic-descriptions')

    const setDescProps = (props) => {
      innerProps.value = { ...innerProps.value, ...props }
    }

    const getProps = computed(() => {
      return {
        ...props,
        ...innerProps.value
      }
    })

    const handleValuePrecision = (item, data) => {
      return slots[`${item.field}Value`]
        ? slots[`${item.field}Value`]?.({
            model: data,
            field: data[`${item.field}`]
          })
        : getProps.value.summaryTotalFields.includes(item.field!) &&
          isNumber(+data[`${item.field}`]) &&
          !isNaN(+data[`${item.field}`])
        ? (+data[`${item.field}`])
            .toFixed(getProps.value.summaryPrecision)
            .replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (match, offset, string) => {
              return (
                match +
                (string.charAt(offset + 1) === '.' ||
                offset === string.length - 1
                  ? ''
                  : ',')
              )
            })
        : data[`${item.field}`]
    }

    emit('register', {
      setDescProps
    })

    const renderValue = (item) => {
      const { contentStyle, field, render, componentProps } = item

      const { data, summaryTotalFields } = unref(getProps)
      if (!data || isEmpty(data)) return null
      if (slots[`${field}Value`]) {
        return slots[`${field}Value`]?.({
          model: data,
          field: data[`${field}`]
        })
      } else if (render && isFunction(render)) {
        return render(data)
      } else if (summaryTotalFields?.length) {
        return handleValuePrecision(item, data)
      } else if (componentProps?.options) {
        return <ShyTag value={data[`${field}`]} {...componentProps}></ShyTag>
      } else {
        const contentStyles: CSSProperties = {
          ...unref(getProps).contentStyle,
          ...contentStyle
        }
        return <div style={contentStyles}>{data[`${field}`]}</div>
      }
    }

    const labelAlignCss = computed<CSSProperties>(() => {
      if (unref(getProps)?.mode === 'vertical') {
        return { justifyContent: 'flex-start' }
      }
      switch (unref(getProps)?.labelAlign) {
        case 'left':
          return { justifyContent: 'flex-start' }
        case 'center':
          return { justifyContent: 'center' }
        case 'right':
          return { justifyContent: 'flex-end' }
        default:
          if (unref(getProps)?.bordered) {
            return { justifyContent: 'center' }
          } else {
            return { justifyContent: 'flex-end' }
          }
      }
    })

    const renderLabel = (item: DescItem) => {
      const { label, labelStyle, field } = item
      const labelStyles: CSSProperties = {
        width:
          getProps.value.mode === 'horizontal'
            ? `${getProps.value.labelWidth}px`
            : 'auto',
        ...unref(labelAlignCss),
        ...unref(getProps).labelStyle,
        ...labelStyle
      }
      if (!label && !slots?.[`${field}Label`]) return null

      return (
        <div style={labelStyles} class={`${prefixCls}-label`}>
          {slots?.[`${field}Label`]
            ? slots[`${field}Label`]?.({
                model: getProps.value.data,
                field: label
              })
            : label}
          {item?.helpMessage ? (
            <BasicHelp
              class={`${prefixCls}-label-help`}
              placement="top"
              text={item?.helpMessage}
              iconSize="9px"
            />
          ) : null}
          {getProps.value.isShowColon ? '：' : null}
        </div>
      )
    }

    const showRef = computed(() => {
      return (item: DescItem) => {
        return isBoolean(item?.ifShow) || isFunction(item?.ifShow)
          ? isFunction(item.ifShow)
            ? item.ifShow(unref(getProps).data)
            : item.ifShow
          : true
      }
    })

    const renderDescriptionsItem = (item: DescItem) => {
      const { colProps } = item
      const ifShow = unref(showRef)(item)
      return ifShow ? (
        <Descriptions.Item
          label={renderLabel(item)}
          span={
            colProps?.span ||
            unref(getProps)?.baseColProps?.span ||
            basicColProps
          }
          mode={unref(getProps).mode}
        >
          {renderValue(item)}
        </Descriptions.Item>
      ) : null
    }

    const renderSchema = (group: DescItem[] | DescItem) => {
      if (isArray(group)) {
        return (
          <Descriptions {...unref(getProps)}>
            {group.map((schema: DescItem) => renderDescriptionsItem(schema))}
          </Descriptions>
        )
      }
      const ifShow = unref(showRef)(group)
      if (!ifShow) return null

      const { componentProps, label, colProps } = group
      const flexBasis = `${
        ((colProps?.span ||
          unref(getProps)?.baseColProps?.span ||
          basicColProps) /
          basicRowProps) *
        100
      }%`

      switch (componentProps?.groupType) {
        case 'Divider':
          return (
            <div style={{ flexBasis }} class={`${prefixCls}-divider`}>
              <Divider {...componentProps}>{label}</Divider>
              <div class={`${prefixCls}-divider-content`}>
                {renderGroup(componentProps?.schemas)}
              </div>
            </div>
          )
        case 'Group':
          return (
            <div style={{ flexBasis }} class={`${prefixCls}-group`}>
              <Collapse class={`${prefixCls}-group-collapse`} bordered={false}>
                <Collapse.Panel
                  v-slots={{
                    header: () => <Divider {...componentProps}>{label}</Divider>
                  }}
                >
                  {renderGroup(componentProps?.schemas)}
                </Collapse.Panel>
              </Collapse>
            </div>
          )
        case 'Custom':
          const { CustomGroupComp } = componentProps
          return (
            <div style={{ flexBasis }} class={`${prefixCls}-custom`}>
              <CustomGroupComp {...componentProps}>
                {renderGroup(componentProps?.schemas)}
              </CustomGroupComp>
            </div>
          )
        case 'Origin':
          return (
            <div style={{ flexBasis }} class={`${prefixCls}-origin`}>
              {renderGroup(componentProps?.schemas)}
            </div>
          )
      }
    }

    const getGroup = (schemas: DescItem[]) => {
      if (!isArray(schemas)) return []
      return schemas.reduce<any>((prev, curr) => {
        if (curr.component && curr.component === 'Group') {
          prev.push(curr)
          return prev
        }
        if (!isArray(prev[prev.length - 1])) {
          prev.push([])
        }
        prev[prev.length - 1].push(curr)
        return prev
      }, [])
    }

    const renderGroup = (schemas) => {
      const groups = getGroup(schemas)
      return groups.map((group) => renderSchema(group))
    }

    return () => (
      <div class={prefixCls}>{renderGroup(unref(getProps).schemas)}</div>
    )
  }
})
