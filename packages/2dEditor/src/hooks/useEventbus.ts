import { onUnmounted } from 'vue'
import mitt from 'mitt'

const emitter = mitt()

const customEmit = (eventName: string, value?: any) => {
  emitter.emit(eventName, value)
}

const customOn = (eventName: string, callback: Function) => {
  emitter.on(eventName, (value) => callback(value))
}

const customOff = (eventName: string, callback: Function) => {
  emitter.off(eventName, (value) => callback(value))
}

export const useEventBus = () => {
  onUnmounted(() => {
    emitter.all.clear()
  })

  return {
    customEmit,
    customOn,
    customOff
  }
}
