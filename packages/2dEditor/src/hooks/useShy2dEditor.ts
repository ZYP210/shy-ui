import type {
  EditProps,
  EditInstance,
  UseDescReturnType
} from '../types/shy2Editor'
import { ref, getCurrentInstance, unref, onUnmounted, watch } from 'vue'

export function useShy2dEditor(props?: Partial<EditProps>): UseDescReturnType {
  if (!getCurrentInstance()) {
    throw new Error(
      'useShy2dEditor() can only be used inside setup() or functional components!'
    )
  }
  const edit = ref<Nullable<EditInstance>>(null)
  const loaded = ref(false)

  function register(instance: EditInstance) {
    onUnmounted(() => {
      edit.value = null
      loaded.value = false
    })
    if (unref(loaded) && instance === unref(edit)) return
    edit.value = instance
    loaded.value = true

    watch(
      () => props,
      () => {
        props && instance.setEditProps(props)
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: EditInstance = {
    setEditProps: (descProps: Partial<EditProps>): void => {
      unref(edit)?.setEditProps(descProps)
    }
  }

  return [register, methods]
}
