<template>
  <TreeSelect
    v-bind="getAttrs"
    @change="handleChange"
    show-search
    :filterTreeNode="filterTreeNode"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
  </TreeSelect>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref, onMounted, unref } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { isArray, isFunction } from '@shy-plugins/utils'
import { get } from 'lodash-es'
import { LoadingOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'ApiTreeSelect',
  components: { TreeSelect, LoadingOutlined },
  props: {
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<Recordable>>
    },
    params: { type: Object },
    immediate: { type: Boolean, default: true },
    resultField: {
      type: String,
      default: ''
    }
  },
  emits: ['options-change', 'change'],
  setup(props, { attrs, emit }) {
    const treeData = ref<Recordable[]>([])
    const isFirstLoaded = ref<Boolean>(false)
    const loading = ref(false)
    const getAttrs = computed(() => {
      return {
        ...(props.api ? { treeData: unref(treeData) } : {}),
        ...attrs
      } as Recordable
    })

    function handleChange(...args) {
      emit('change', ...args)
    }

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoaded) && fetch()
      },
      { deep: true }
    )

    watch(
      () => props.immediate,
      (v) => {
        v && !isFirstLoaded.value && fetch()
      }
    )

    onMounted(() => {
      props.immediate && fetch()
    })

    async function fetch() {
      const { api } = props
      if (!api || !isFunction(api)) return
      loading.value = true
      treeData.value = []
      let result
      try {
        result = await api(props.params)
      } catch (e) {
        console.error(e)
      }
      loading.value = false
      if (!result) return
      if (!isArray(result)) {
        result = get(result, props.resultField)
      }
      treeData.value = (result as Recordable[]) || []
      isFirstLoaded.value = true
      emit('options-change', treeData.value)
    }

    const filterTreeNode = (input, node) => {
      if (
        typeof node[getAttrs.value?.fieldNames?.label || 'label'] === 'string'
      ) {
        if (
          node[getAttrs.value?.fieldNames?.label || 'label'].indexOf(input) !==
          -1
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (
          node[getAttrs.value?.fieldNames?.label || 'label'].indexOf(input) !==
          -1
        ) {
          return true
        } else {
          return false
        }
      }
    }

    return { getAttrs, loading, handleChange, filterTreeNode }
  }
})
</script>
