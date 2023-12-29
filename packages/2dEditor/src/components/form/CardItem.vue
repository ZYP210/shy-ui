<template>
  <div>
    <a-button @click="addForm">
      {{ addText }}
    </a-button>
    <div
      v-for="(_, i) in modelList"
      class="my-5 relative border-1px border-solid border-[#eee] pt-7 px-2 shadow content"
    >
      <!-- <delete-outlined
        @click="deleteForm(i)"
        class="absolute top-2 right-2 z-100 text-[16px] cursor-pointer hidden icon"
      /> -->
      <Form :schema="children" v-model:formModel="formModel[i]" :index="i" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button as AButton } from 'ant-design-vue'
// import { DeleteOutlined } from '@ant-design/icons-vue';
import Form from './index.vue'
import { ref, watch } from 'vue'
type Props = {
  addText: string
  value: any[]
  children: any[]
}

const props = withDefaults(defineProps<Props>(), {
  addText: '',
  value: () => [],
  children: () => []
})

const modelList = ref<any[]>([])
const formModel = ref<any[]>([])

watch(
  () => props.value,
  (val: any) => {
    modelList.value = val
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.value,
  () => {
    formModel.value = props.value
  },
  { immediate: true, deep: true }
)

watchEffect(() => {
  emit('update:value', unref(formModel))
})

const emit = defineEmits(['update:value', 'change'])

const addForm = () => {
  const index = modelList.value.length
  props.children.forEach((item) => {
    if (!formModel.value[index]) {
      formModel.value[index] = {}
    }
    formModel.value[index][item.field] = ''
  })
}

const deleteForm = (index: number) => {
  formModel.value.splice(index, 1)
}
</script>

<style scoped lang="less">
.content:hover > .icon {
  display: block;
}
</style>
