import { defineComponent } from 'vue'
import { useDesign } from '@shy-plugins/use'
import { InfoSchema } from '../types/table'

const ShyInfo = defineComponent({
  props: {
    schemas: {
      type: Array as PropType<InfoSchema[]>,
      default: () => []
    },
    infoData: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    }
  },
  setup(props) {
    const { prefixCls } = useDesign('ant-table-info')

    return () => {
      const { schemas, infoData } = props

      return (
        <div class={prefixCls}>
          {schemas.map((item) => {
            return (
              <div class={`${prefixCls}-item`}>
                <span class={`${prefixCls}-label`}>{item.label}</span>
                <span class={`${prefixCls}-value`}>{infoData[item.field]}</span>
              </div>
            )
          })}
        </div>
      )
    }
  }
})

export { ShyInfo }
