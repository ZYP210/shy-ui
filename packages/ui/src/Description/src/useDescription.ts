import type {
  DescriptionProps,
  DescInstance,
  UseDescReturnType
} from './typing'
import { ref, getCurrentInstance, unref, onUnmounted, watch } from 'vue'

export function useDescription(
  props?: Partial<DescriptionProps>
): UseDescReturnType {
  if (!getCurrentInstance()) {
    throw new Error(
      'useDescription() can only be used inside setup() or functional components!'
    )
  }
  const desc = ref<Nullable<DescInstance>>(null)
  const loaded = ref(false)

  function register(instance: DescInstance) {
    onUnmounted(() => {
      desc.value = null
      loaded.value = false
    })
    if (unref(loaded) && instance === unref(desc)) return

    desc.value = instance
    loaded.value = true

    watch(
      () => props,
      () => {
        props && instance.setDescProps(props)
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: DescInstance = {
    setDescProps: (descProps: Partial<DescriptionProps>): void => {
      unref(desc)?.setDescProps(descProps)
    }
  }

  return [register, methods]
}
