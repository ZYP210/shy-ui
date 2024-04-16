import { computed, defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import {
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'
import { useTableContext } from '../../hooks/useShyTableContext'

const ShyTableFullScreen = defineComponent({
  setup() {
    const table = useTableContext()
    const { toggle, isFullscreen } = useFullscreen(table.wrapRef as any)

    const renderIcon = computed(() =>
      !isFullscreen.value ? (
        <FullscreenOutlined onClick={toggle} />
      ) : (
        <FullscreenExitOutlined onClick={toggle} />
      )
    )

    return () => {
      return (
        <Tooltip placement="top" v-slots={{ title: () => <span>全屏</span> }}>
          {renderIcon.value}
        </Tooltip>
      )
    }
  }
})

export { ShyTableFullScreen }
