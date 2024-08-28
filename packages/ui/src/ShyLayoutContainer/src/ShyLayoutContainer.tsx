import {
  computed,
  defineComponent,
  ref,
  StyleValue,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { shyLayoutContainerProps, shyGridItemProps } from './props'
import { useDesign } from '@shy-plugins/use'
import { isArray, isNumber } from 'lodash-es'
import './style/index.less'

const GridItem = defineComponent({
  props: shyGridItemProps,
  setup(props) {
    const { prefixCls } = useDesign('layout-container-item')

    const bindStyleVariables = computed<StyleValue>(() => {
      return {
        '--grid-area': props.gridArea!.join(' / ')
      }
    })

    return () => {
      return (
        <div class={prefixCls} style={bindStyleVariables.value}>
          {props.item}
        </div>
      )
    }
  }
})

const ShyLayoutContainer = defineComponent({
  props: shyLayoutContainerProps,
  setup(props, { slots }) {
    const { prefixCls } = useDesign('layout-container')

    const layoutRef = ref()

    const width = ref(0)
    const height = ref(0)

    const renderGridItems = computed(() => {
      const gridItems = slots?.default?.() ?? []

      return gridItems.map((item, index) => {
        return <GridItem item={item} gridArea={props.gridLayouts[index]} />
      })
    })

    const bindStyleVariables = computed<StyleValue>(() => {
      return {
        '--min-columns': `${
          width.value / props.col -
          (isArray(props.gap) ? props.gap[0] : props.gap)
        }px`,
        '--min-rows': `${
          height.value / props.row -
          (isArray(props.gap) ? props.gap[1] : props.gap)
        }px`,
        '--gap': isArray(props.gap) ? props.gap.join(' ') : `${props.gap}px`,
        '--width': isNumber(props.width) ? `${props.width}px` : props.width,
        '--height': isNumber(props.height) ? `${props.height}px` : props.height
      }
    })

    onMounted(() => {
      width.value = layoutRef.value.clientWidth
      height.value = layoutRef.value.clientHeight

      window.addEventListener('resize', () => {
        width.value = layoutRef.value.clientWidth
        height.value = layoutRef.value.clientHeight
      })
    })

    onBeforeUnmount(() => {
      layoutRef.value.removeEventListener('resize', () => {})
    })

    return () => {
      return (
        <div class={prefixCls} ref={layoutRef} style={bindStyleVariables.value}>
          {renderGridItems.value}
        </div>
      )
    }
  }
})

export { ShyLayoutContainer }
