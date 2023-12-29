import { Pen } from '@meta2d/core'
import { deepClone } from '@meta2d/core'
import { mergeProps } from '../utils/index'
import { appearanceProps } from '../config/defaultsConfig'
import { toRaw } from 'vue'
import { ref, unref, reactive } from 'vue'
// 选中对象类型：0 - 画布；1 - 单个图元
// export enum SelectionMode {
//   File,
//   Pen,
// }

const selections = ref<Pen[] | Pen | any>([])

const isMultiPen = ref(false)

export const initPenConfig = deepClone(appearanceProps)
const reactivePenConfig = reactive(appearanceProps)

const curMode = ref('blueprints')

export const useSelection = () => {
  const select = (pens: Pen[]) => {
    if (pens.length > 0) {
      isMultiPen.value = pens!.length > 1
      if (unref(isMultiPen)) {
        selections.value = reactive(pens)
        for (let item of unref(selections)) {
          mergeProps(reactivePenConfig, item)
        }
      } else {
        selections.value = reactive(pens[0])
        selections.value.dataSource = selections.value.dataSource ?? {}
        mergeProps(reactivePenConfig, initPenConfig)
        mergeProps(reactivePenConfig, selections.value)
        const penRect = meta2d.getPenRect(toRaw(selections.value))
        Object.assign(reactivePenConfig, penRect)
      }
    }
  }

  const selectMode = (mode: 'blueprints' | 'pen' | 'line') => {
    curMode.value = mode
  }

  return {
    selections,
    curMode,
    isMultiPen,
    reactivePenConfig,
    select,
    selectMode
  }
}
