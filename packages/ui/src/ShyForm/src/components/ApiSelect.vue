<template>
  <Select
    @dropdown-visible-change="handleFetch"
    v-bind="$attrs"
    @change="handleChange"
    :options="getOptions"
    v-model:value="state"
    :filter-option="filterOption"
    show-search
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ '请等待数据加载完成...' }}
      </span>
    </template>
  </Select>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  unref,
  watch,
  toRaw
} from 'vue'
import { Select } from 'ant-design-vue'
import { isFunction } from '@shy-plugins/utils'
import { useRuleFormItem, useAttrs } from '@shy-plugins/use'
import { get, isEqual, omit } from 'lodash-es'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'

type OptionsItem = { label: string; value: string; disabled?: boolean }

export default defineComponent({
  name: 'ApiSelect',
  components: {
    Select,
    LoadingOutlined
  },
  inheritAttrs: false,
  props: {
    value: [Array, Object, String, Number],
    numberToString: {
      type: Boolean
    },
    stringToNumber: {
      type: Boolean
    },
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
      default: null
    },
    // api params
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    // support xxx.xxx.xx
    resultField: {
      type: String,
      default: ''
    },
    labelField: {
      type: String,
      default: 'label'
    },
    valueField: {
      type: String,
      default: 'value'
    },
    immediate: {
      type: Boolean,
      default: true
    },
    alwaysLoad: {
      type: Boolean,
      default: false
    }
  },
  emits: ['options-change', 'change', 'update:value'],
  setup(props, { emit, expose }) {
    const options = ref<OptionsItem[]>([])
    const loading = ref(false)
    const isFirstLoad = ref(true)
    const emitData = ref<any[]>([])
    const attrs = useAttrs()

    // Embedded in the form, just use the hook binding to perform form verification
    const [state] = useRuleFormItem(props, 'value', 'change', emitData)

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString, stringToNumber } = props

      return unref(options).reduce((prev, next: Recordable) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: test1(numberToString, stringToNumber, value)
          })
        }
        return prev
      }, [] as OptionsItem[])
    })

    watch(
      () => props.immediate && !props.alwaysLoad,
      (val) => {
        if (val) fetch()
      },
      {
        immediate: true
      }
    )

    watch(
      () => state.value,
      (v) => {
        emit('update:value', v)
      }
    )

    const tempParams = ref(props.params)

    watch(
      () => props.params,
      useDebounceFn(() => {
        if (isEqual(toRaw(tempParams.value), toRaw(props.params))) return
        tempParams.value = toRaw(props.params)
        fetch()
      }, 1),
      { deep: true }
    )

    function test1(numberToString, stringToNumber, value) {
      if (numberToString) {
        return `${value}`
      }
      if (stringToNumber) {
        return parseInt(value)
      }
      return value
    }

    async function fetch() {
      const api = props.api
      if (!api || !isFunction(api)) return
      options.value = []
      try {
        loading.value = true
        const res = await api(props.params)
        if (Array.isArray(res)) {
          options.value = res
          emitChange()
          return
        }
        if (props.resultField) {
          options.value = get(res, props.resultField) || []
        }
        emitChange()
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
        isFirstLoad.value = false
      }
    }

    async function handleFetch(visible) {
      if (visible) {
        if (props.alwaysLoad) {
          await fetch()
        } else if (!props.immediate && unref(isFirstLoad)) {
          await fetch()
          isFirstLoad.value = false
        }
      }
    }

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    function handleChange(val, ...args) {
      emitData.value = args
      emit('update:value', val)
    }

    const filterOption = (input: string, option: any) => {
      const label = attrs.value?.fieldNames?.label || 'label'
      if (typeof option[label] === 'string')
        return option[label]?.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    expose({ fetch })

    return {
      state,
      attrs,
      getOptions,
      loading,
      handleFetch,
      handleChange,
      filterOption
    }
  }
})
</script>
