<template>
  <div></div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
export interface Props {
  folderUrl: string
}
const props = withDefaults(defineProps<Props>(), {
  folderUrl: '/'
})

const loadImg = (url) => {
  const img = import.meta.glob(url, { eager: true })
  console.log('img', img)
}

watch(
  () => props.folderUrl,
  (url) => {
    console.log('url', url)
    loadImg(url)
  }
)

console.log('props', props)
</script>

<style scoped></style>
