import ShyForm from './src/ShyForm'
export * from './src/types/form'
export * from './src/types/formItem'
export * from './src/types/index'
export * from './src/componentMap'
export { useComponentRegister } from './src/hooks/useComponentRegister'
export { useShyForm } from './src/hooks/useShyForm'
export { default as FormItem } from './src/components/FormItem.vue'
export { default as ShyApiSelect } from './src/components/ApiSelect.vue'
export { default as ShyRadioButtonGroup } from './src/components/RadioButtonGroup.vue'
export { default as ShyApiTreeSelect } from './src/components/ApiTreeSelect.vue'
export { default as ShyApiTree } from './src/components/ApiTree.vue'
export { default as ShyApiRadioGroup } from './src/components/ApiRadioGroup.vue'
export { default as ShyApiCascader } from './src/components/ApiCascader.vue'
export { default as ShyApiTransfer } from './src/components/ApiTransfer.vue'
export { default as TableChildren } from './src/components/Table.vue'
export { default as ShyApiModalSelect } from './src/components/ApiModalSelect/ApiModalSelect.vue'
// import { App } from 'vue'

// const withInstall = <T>(component: T) => {
//   const comp = component as any

//   comp.install = (app: App) => {
//     app.component('BasicForm', component)
//   }
//   return component as T & Plugin
// }
// withInstall(BasicForm)

export { ShyForm }
