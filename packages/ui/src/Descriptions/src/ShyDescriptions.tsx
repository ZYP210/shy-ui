import { defineComponent, computed, ref, unref, provide } from 'vue'
import { DescriptionProps, DescItem } from './typing'
import { basicProps, basicRowProps, basicColProps, basicGap } from './props'
import { Collapse } from 'ant-design-vue'
import type { CSSProperties } from 'vue'
import { BasicTitle as Divider, BasicHelp } from '../../Basic'
import { pick } from 'lodash-es'
import dayjs from 'dayjs'
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

const CustomCollapse = defineComponent({
  name: 'CustomCollapse',
  props: {
    schema: {
      type: Object,
      default: () => {}
    },
    renderGroup: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    const { prefixCls } = useDesign('basic-descriptions')
    const { field, componentProps, label } = props.schema
    const collapseActiveKey = ref<string[]>([field])

    return () => (
      <Collapse
        class={`${prefixCls}-group-collapse`}
        bordered={false}
        v-model:activeKey={collapseActiveKey.value}
      >
        <Collapse.Panel
          key={field}
          v-slots={{
            header: () => <Divider {...componentProps}>{label}</Divider>
          }}
        >
          {props?.renderGroup(componentProps?.schemas)}
        </Collapse.Panel>
      </Collapse>
    )
  }
})

export default defineComponent({
  name: 'ShyDescriptions',
  props: basicProps,
  emits: ['register'],
  setup(props, { emit, slots }) {
    provide('parentEmit', emit)

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

    const transformValue = (item) => {
      const { field, componentProps: comProps, component } = item
      const componentProps = isFunction(comProps) ? comProps() : comProps

      const { data, summaryTotalFields } = unref(getProps)
      if (summaryTotalFields?.length && summaryTotalFields.includes(field)) {
        return handleValuePrecision(item, data)
      } else if (componentProps?.options) {
        return <ShyTag value={data[`${field}`]} {...componentProps}></ShyTag>
      } else if (
        [
          'DatePicker',
          'MonthPicker',
          'RangePicker',
          'WeekPicker',
          'TimePicker'
        ].includes(component)
      ) {
        if (!data[`${field}`]) return ''
        return dayjs(data[`${field}`]).format(
          componentProps?.valueFormat || 'YYYY-MM-DD'
        )
      } else return data[`${field}`]
    }

    const renderValue = (item) => {
      const { contentStyle, field, render } = item

      const { data } = unref(getProps)
      if (!data || isEmpty(data)) return null
      if (slots[`${field}Value`]) {
        return slots[`${field}Value`]?.({
          model: data,
          field: data[`${field}`]
        })
      } else if (render && isFunction(render)) {
        return render(unref(getValues)(item))
      } else {
        const contentStyles: CSSProperties = {
          ...unref(getProps).contentStyle,
          ...contentStyle
        }
        return <div style={contentStyles}>{transformValue(item)}</div>
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
          {getProps.value.isShowColon ? '：' : null}
          {item?.helpMessage ? (
            <BasicHelp
              class={`${prefixCls}-label-help`}
              placement="top"
              text={item?.helpMessage}
              iconSize="9px"
              {...item?.helpComponentProps}
            />
          ) : null}
        </div>
      )
    }

    const getShow = (
      item: DescItem
    ): { isShow: boolean; isIfShow: boolean } => {
      const { show, ifShow } = item

      let isShow = true
      let isIfShow = true

      if (isBoolean(show)) {
        isShow = show
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues)(item))
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues)(item))
      }
      return { isShow, isIfShow }
    }

    const getValues = computed(() => {
      return (item: DescItem) => {
        const { data } = unref(getProps)
        return {
          field: item.field,
          model: data,
          values: data as Recordable,
          schema: item,
          transformValue
        }
      }
    })

    const renderDescriptionsItem = (item: DescItem) => {
      const { colProps } = item
      const { isShow, isIfShow } = getShow(item)
      if (!isIfShow) return null
      return (
        <Descriptions.Item
          v-show={isShow}
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
      )
    }

    const renderSchema = (group: DescItem[] | DescItem) => {
      if (isArray(group)) {
        const props = pick(unref(getProps), ['bordered'])
        return (
          <Descriptions {...props}>
            {group.map((schema: DescItem) => renderDescriptionsItem(schema))}
          </Descriptions>
        )
      }

      const { isShow, isIfShow } = getShow(group)
      if (!isIfShow) return null

      const { componentProps, label, colProps } = group

      const realSpan =
        (colProps?.span ||
          unref(getProps)?.baseColProps?.span ||
          basicColProps) / basicRowProps

      const style = {
        [`--col-span`]: `${realSpan * 100}%`,
        [`--w-gap`]: `${realSpan * basicGap}px`
      }

      switch (componentProps?.groupType) {
        case 'Divider':
          return (
            <div style={style} class={`${prefixCls}-divider`} v-show={isShow}>
              <Divider {...componentProps}>{label}</Divider>
              <div class={`${prefixCls}-divider-content`}>
                {renderGroup(componentProps?.schemas)}
              </div>
            </div>
          )
        case 'Collapse':
        default:
          return (
            <div style={style} class={`${prefixCls}-group`} v-show={isShow}>
              <CustomCollapse schema={group} renderGroup={renderGroup} />
            </div>
          )
        case 'Custom':
          const { CustomGroupComp } = componentProps
          return (
            <div style={style} class={`${prefixCls}-custom`} v-show={isShow}>
              <CustomGroupComp
                {...componentProps}
                v-slots={{ ...componentProps?.slots }}
              >
                {renderGroup(componentProps?.schemas)}
              </CustomGroupComp>
            </div>
          )
        case 'Origin':
          return (
            <div style={style} class={`${prefixCls}-origin`} v-show={isShow}>
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
      <div class={prefixCls} style={{ '--gap': `${basicGap}px` }}>
        {renderGroup(unref(getProps).schemas)}
      </div>
    )
  }
})
