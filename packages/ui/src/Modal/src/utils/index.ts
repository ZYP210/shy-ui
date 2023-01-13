import { cloneDeep } from 'lodash-es'
import { isObject } from './is'

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  const res: any = cloneDeep(src)
  for (key in target) {
    res[key] = isObject(res[key])
      ? deepMerge(res[key], target[key])
      : (res[key] = target[key])
  }
  return res
}
/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}
