import { defineComponent } from 'vue'
import { useDesign } from '@shy-plugins/use'
import { ShyForm } from '../../ShyForm'
import { BasicButton } from '../../Button'
import './style/index.less'

const ShyAdvancedSearch = defineComponent({
  props: {
    onRegister: {
      type: Function
    }
  },
  emits: ['register', 'reset'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('advanced-search')

    const handleReset = () => {
      emit('reset')
    }

    return () => {
      return (
        <div class={prefixCls}>
          <ShyForm onRegister={props.onRegister} />
          <div class={`${prefixCls}-actions`}>
            <BasicButton onClick={handleReset}>重置</BasicButton>
          </div>
        </div>
      )
    }
  }
})

export { ShyAdvancedSearch }
