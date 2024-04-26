<template>
  <div class="w-full h-full flex items-center">
    <ColorPickerPopover v-model:value="color" />
    <div class="flex">
      <div class="flex-1">
        <div class="flex flex-col flex-col-reverse"></div>
        <div :style="{ backgroundColor: color }">
          {{ color }}
        </div>
        <template v-for="i in 5" :key="i"> </template>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColorPickerPopover } from '3h1-ui'
import chroma from 'chroma-js'

const color = ref('#0969DA')

const colorScale = [0.815, 0.63, 0.424, 0.295, 0.19, 0.152, 0.054]

for (let i = 0; i < colorScale.length; i++) {
  console.log(
    `%c ${chroma(color.value).luminance(colorScale[i], 'lch').hex()}`,
    `background:${chroma(color.value).luminance(colorScale[i], 'lch').hex()}`
  )
}
</script>
