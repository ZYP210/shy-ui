<template>
  <!-- <ConfigProvider :locale="zhCN">
    <Input></Input>
    <Preview v-if="propsRef?.isPreview" />
    <Edit v-else />
  </ConfigProvider> -->

  <Edit></Edit>
</template>

<script setup lang="ts">
// import { useMeta2d, initOptions } from '../hooks/useMeta2d'
import Edit from './Edit.vue'
// // import Preview from './Preview.vue'
// import { EditInstance, EditProps } from '../types/shy2Editor'
// // import { ConfigProvider, Input } from 'ant-design-vue'
// import { merge, omit } from 'lodash-es'
// import { createContext } from '../hooks/useContext'
// // import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import { computed, ref, unref, onMounted, reactive } from 'vue'

// withDefaults(defineProps<EditProps>(), {
//   isPreview: false
// })

// const propsRef = ref<Partial<EditProps> | null>(null)

// const emit = defineEmits(['register'])

// const setEditProps = (editProps: Partial<EditProps>): void => {
//   propsRef.value = {
//     ...(unref(propsRef) as Record<string, any>),
//     ...editProps
//   } as Record<string, any>
// }

// const getProps = computed(() => {
//   const options = merge(initOptions, propsRef.value?.options)
//   const props = omit(propsRef.value, ['api'])
//   return { ...props, options } as EditProps
// })

// const api = computed(() => {
//   return propsRef.value?.api!
// })

// type DeviceListType = {
//   deviceList: any[]
//   productList: any[]
//   selectList: any[]
// }

// const deviceDataSource = reactive<DeviceListType>({
//   deviceList: [],
//   productList: [],
//   selectList: []
// })

// const initData = async () => {
//   deviceDataSource.selectList = await api.value.getBindingDevice()
//   deviceDataSource.productList = await api.value.getProductList()
// }

// createContext({ api, deviceDataSource })

// const {} = useMeta2d(getProps)

// const methods: EditInstance = {
//   setEditProps
// }

// emit('register', methods)

// onMounted(() => {
//   initData()
// })
</script>
