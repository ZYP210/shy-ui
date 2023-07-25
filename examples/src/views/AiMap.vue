<template>
  <AiMap ref="aiMap"></AiMap>
</template>

<script lang="ts" setup>
import { AiMap } from '@shy-plugins/ai-map'
import { onMounted } from 'vue'
import { ref } from 'vue'
import a from './car.png'

const aiMap = ref()

onMounted(async () => {
  aiMap.value.renderMap()

  // const res = await aiMap.value.getSearchResult('国轩高科')
  // aiMap.value.setMarker()
  aiMap.value.map.on('load', () => {
    // aiMap.value.setPoint2D()
    aiMap.value.setIcon({ url: a })
    // aiMap.value.setLine()
    // aiMap.value.setAnchor({ img: a, markerHtml: '<div>123<div>' })
  })

  setTimeout(() => {
    // const layer =
    // console.log(layer)
  }, 3000)
})
</script>
