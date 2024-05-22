<template>
  <Transfer
    v-bind="getAttrs"
    :data-source="getdataSource"
    :filter-option="filterOption"
    :render="(item) => item.title"
    :showSelectAll="showSelectAll"
    :selectedKeys="selectedKeys"
    :targetKeys="getTargetKeys"
    :showSearch="showSearch"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref, unref, watchEffect } from 'vue'
import { Transfer } from 'ant-design-vue'
import { isFunction } from '@shy-plugins/utils'
import { get, omit } from 'lodash-es'
import { TransferDirection, TransferItem } from 'ant-design-vue/lib/transfer'
export default defineComponent({
  name: 'ApiTransfer',
  components: { Transfer },
  props: {
    value: { type: Array as PropType<Array<string>> },
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<TransferItem[]>>,
      default: null
    },
    params: { type: Object },
    dataSource: { type: Array as PropType<Array<TransferItem>> },
    immediate: {
      type: Boolean,
      default: true
    },
    alwaysLoad: {
      type: Boolean
    },
    afterFetch: { type: Function as PropType<Fn> },
    resultField: {
      type: String,
      default: ''
    },
    labelField: {
      type: String,
      default: 'title'
    },
    valueField: {
      type: String,
      default: 'key'
    },
    showSearch: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    filterOption: {
      type: Function as PropType<
        (inputValue: string, item: TransferItem) => boolean
      >
    },
    selectedKeys: { type: Array as PropType<Array<string>> },
    showSelectAll: { type: Boolean, default: false },
    targetKeys: { type: Array as PropType<Array<string>> }
  },
  emits: ['options-change', 'change', 'update:value'],
  setup(props, { attrs, emit }) {
    const _dataSource = ref<TransferItem[]>([])
    const _targetKeys = ref<string[]>([])

    const getAttrs = computed(() => {
      return {
        ...(!props.api ? { dataSource: unref(_dataSource) } : {}),
        ...attrs
      }
    })
    const getdataSource = computed(() => {
      const { labelField, valueField } = props

      const data = unref(_dataSource).reduce((prev, next: Recordable) => {
        if (next) {
          prev.push({
            ...omit(next, [labelField, valueField]),
            title: next[labelField],
            key: next[valueField]
          })
        }
        return prev
      }, [] as TransferItem[])
      return data
    })
    const getTargetKeys = computed<string[]>(() => {
      if (unref(_targetKeys).length > 0) {
        return unref(_targetKeys)
      }
      if (Array.isArray(props.value)) {
        return props.value
      }
      return []
    })

    function handleChange(
      keys: string[],
      direction: TransferDirection,
      moveKeys: string[]
    ) {
      _targetKeys.value = keys
      console.log(direction)
      console.log(moveKeys)
      emit('change', keys)
      emit('update:value', keys)
    }

    watchEffect(() => {
      props.immediate && !props.alwaysLoad && fetch()
      _targetKeys.value = props.value || []
    })

    watch(
      () => props.params,
      () => {
        fetch()
      },
      { deep: true }
    )

    async function fetch() {
      const api = props.api
      if (!api || !isFunction(api)) {
        if (Array.isArray(props.dataSource)) {
          _dataSource.value = props.dataSource
        }
        return
      }
      _dataSource.value = []
      try {
        const res = await api(props.params)
        if (Array.isArray(res)) {
          _dataSource.value = res
          emitChange()
          return
        }
        if (props.resultField) {
          _dataSource.value = get(res, props.resultField) || []
        }
        emitChange()
      } catch (error) {
        console.warn(error)
      } finally {
      }
    }
    function emitChange() {
      emit('options-change', unref(getdataSource))
    }
    return { getTargetKeys, getdataSource, getAttrs, handleChange }
  }
})
</script>
