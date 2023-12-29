import { Options, Meta2d, Pen } from '@meta2d/core'
import { flowPens } from '@meta2d/flow-diagram'
import { activityDiagram } from '@meta2d/activity-diagram'
import { classPens } from '@meta2d/class-diagram'
import { sequencePens, sequencePensbyCtx } from '@meta2d/sequence-diagram'
import { onMounted, onUnmounted, ref } from 'vue'
import { formPens } from '@meta2d/form-diagram'
import { useSelection } from './useSelections'
import { register as registerEcharts } from '@meta2d/chart-diagram'
import { mergeProps } from '../utils/index'
import { EditProps } from '../types/shy2Editor'
import { useEventBus } from './useEventBus'
import { Ref } from 'vue'

const { select, selectMode, isMultiPen, selections, reactivePenConfig } =
  useSelection()

const event = useEventBus()

export const initOptions: Options = {
  grid: true,
  gridColor: '#e2e2e2',
  gridSize: 20,
  background: '#ecf2fe',
  rule: true
}

export const useMeta2d = (config: Ref<EditProps> | ComputedRef<EditProps>) => {
  onMounted(() => {
    const domId = config.value.isPreview ? 'meta2d-preview' : 'meta2d'
    const isLocked = config.value.isPreview ? 1 : 0

    new Meta2d(domId, config.value.options)
    meta2d.register(flowPens())
    meta2d.register(activityDiagram())
    meta2d.register(classPens())
    meta2d.register(sequencePens())
    meta2d.registerCanvasDraw(sequencePensbyCtx())
    meta2d.registerCanvasDraw(formPens())

    registerEcharts()

    if (config.value.dataSource) meta2d.open(config.value.dataSource)
    if (config.value.options) meta2d.setOptions(config.value.options)
    meta2d.store.data.locked = isLocked

    // 监听消息事件
    meta2d.on('contextmenu', contextmenu)
    // meta2d.on('click', click);

    // const pen: Pen = {
    //   type: 1,
    //   name: "line",
    //   anchors: [
    //     { x: 0, y: 0 },
    //     { x: 1, y: 1 },
    //   ],
    //   animateLineDash: [5, 10],
    //   color: "#478BFF00",
    //   borderColor: "#186DFF78",
    //   x: 100,
    //   y: 100,
    //   width: 100,
    //   height: 200,
    //   lineWidth: 4,
    //   borderWidth: 12,
    //   autoPlay: true,
    //   lineAnimateType: 1,
    //   animateSpan: 1,
    //   animateColor: "#478BFFFF",
    //   animateDotSize: 20,
    //   animateReverse: false,
    // };

    // meta2d.addPen(pen);
    // meta2d.inactive();
    // meta2d.startAnimate([pen]);

    // meta2d.startAnimate(meta2d.store.data.pens);

    meta2d.on('active', (pens?: Pen[]) => {
      if (pens) select(pens)
      // event.customEmit('active', pens);
    })

    meta2d.on('click', (pen: any) => {
      if (pen.pen === undefined) {
        selectMode('blueprints')
      } else if (pen?.pen?.name === 'line') {
        selectMode('line')
      } else {
        selectMode('pen')
      }
    })

    //合并多个事件，监听一个即可
    meta2d.on('update', () => {
      meta2d.emit('editPen')
    })
    meta2d.on('resizePens', () => {
      meta2d.emit('editPen')
    })
    meta2d.on('rotatePens', () => {
      meta2d.emit('editPen')
    })
    meta2d.on('valueUpdate', () => {
      meta2d.emit('editPen')
    })

    meta2d.on('editPen', () => {
      if (isMultiPen.value) {
        // 若有多个图元，则设置以最后一个图元为主
        for (let i of unref(selections)) {
          mergeProps(reactivePenConfig, i)
        }
      } else {
        mergeProps(reactivePenConfig, unref(selections))
      }
    })

    event.customEmit('opened')
  })

  onUnmounted(() => {
    if (meta2d) {
      meta2d.off('contextmenu', contextmenu)
      meta2d.off('click', click)
      meta2d.destroy()
    }
  })
  const contextMenuVisible = ref(false)
  function contextmenu() {
    contextMenuVisible.value = true
  }
  function click() {
    contextMenuVisible.value = false
  }
  return {
    contextMenuVisible
  }
}
