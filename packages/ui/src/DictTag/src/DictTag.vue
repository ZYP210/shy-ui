<template>
  <Tag :color="dictData?.cssClass">{{ dictData?.label }}</Tag>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUpdated, PropType, ref } from 'vue'
import { useDict, DictDataType } from '@shy-plugins/use'
import { Tag } from 'ant-design-vue'

export default defineComponent({
  name: 'DictTag',
  props: {
    type: {
      type: String as PropType<string>,
      required: true
    },
    value: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      required: true
    },
    useDictStore: {
      type: Function as PropType<() => any>,
      required: true
    }
  },
  components: {
    Tag
  },
  setup(props) {
    const { getDictOptions } = useDict(props.useDictStore)
    const dictData = ref<DictDataType>()
    const getDictObj = (dictType: string, value: string) => {
      const dictOptions = getDictOptions(dictType)
      dictOptions.forEach((dict: DictDataType) => {
        if (dict.value === value) {
          dictData.value = dict
        }
      })
    }

    onMounted(() => {
      return getDictObj(props.type, props.value?.toString())
    })

    onUpdated(() => {
      getDictObj(props.type, props.value?.toString())
    })

    return {
      dictData
    }
  }
})
</script>
