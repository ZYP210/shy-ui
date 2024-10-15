import { defineComponent, SlotsType } from 'vue'
import type { App } from 'vue'
import { basicColProps } from './props'
import { useDesign } from '@shy-plugins/use'
const { prefixCls } = useDesign('basic-description')

const DescriptionsItem = defineComponent({
  name: 'DescriptionsItem',
  props: {
    label: String,
    span: Number,
    mode: String
  },
  setup(props, { slots }) {
    const { span, mode } = props
    return () => (
      <div
        class={`${prefixCls}-row`}
        style={{
          flex: `0 0 ${((span || basicColProps) / 24) * 100}%`,
          flexDirection: mode === 'horizontal' ? 'row' : 'column'
        }}
      >
        <div class={`${prefixCls}-label`}>{props.label}</div>
        <div class={`${prefixCls}-value`}> {slots.default?.()}</div>
      </div>
    )
  }
})

const Descriptions = defineComponent({
  name: 'Descriptions',
  props: {
    bordered: Boolean
  },
  slots: Object as SlotsType<{
    default?: any
  }>,
  Item: DescriptionsItem,
  setup(props, { slots }) {
    const { bordered } = props
    return () => (
      <div
        class={[
          `${prefixCls}-wrapper`,
          bordered ? `${prefixCls}-wrapper-bordered` : ''
        ]}
      >
        {slots.default?.()}
      </div>
    )
  }
})

Descriptions.install = function (app: App) {
  app.component(Descriptions.name!, Descriptions)
  app.component(Descriptions.Item.name, Descriptions.Item)
  return app
}

export default Descriptions
