import type {
  DescriptionProps,
  DescInstance,
  UseDescReturnType
} from './typing'
import { error, getDynamicProps } from '@shy-plugins/utils'
import { ref, unref, onUnmounted, watch, nextTick } from 'vue'

export function useShyDescriptions(
  props?: Partial<DescriptionProps>
): UseDescReturnType {
  const descRef = ref<Nullable<DescInstance>>(null)
  const loaded = ref(false)
  async function getDescription() {
    const desc = unref(descRef)
    if (!desc) {
      error(
        'useShyDescriptions() can only be used inside setup() or functional components!'
      )
    }
    await nextTick()
    return desc as DescInstance
  }

  function register(instance: DescInstance) {
    onUnmounted(() => {
      descRef.value = null
      loaded.value = false
    })
    if (unref(loaded) && instance === unref(descRef)) return

    descRef.value = instance
    loaded.value = true

    watch(
      () => props,
      () => {
        props && instance.setDescProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: DescInstance = {
    setDescProps: async (descProps: Partial<DescriptionProps>) => {
      const desc = await getDescription()
      desc?.setDescProps(descProps)
    }
  }

  return [register, methods]
}
