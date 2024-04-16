<template>
  <div class="w-full h-full flex items-center">
    <ColorPickerPopover v-model:color="color" />
    <!-- <template v-for="i in 10" :key="i">
      <div :style="{ backgroundColor: mixinUp(i) }">
        {{ i }}/{{ mixinUp(i) }}
      </div>
    </template> -->
    <div class="flex">
      <div class="flex-1">
        <div class="flex flex-col flex-col-reverse">
          <template v-for="i in 4" :key="i">
            <div :style="{ backgroundColor: mixinDown(i) }">
              {{ mixinDown(i) }}
            </div>
          </template>
        </div>
        <div :style="{ backgroundColor: color }">
          {{ color }}
        </div>
        <template v-for="i in 5" :key="i">
          <div :style="{ backgroundColor: mixinUp(i) }">
            {{ mixinUp(i) }}
          </div>
        </template>
      </div>
      <div class="flex-1">
        <template v-for="(item, index) in colors" :key="index">
          <div :style="{ backgroundColor: item }">
            {{ item }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { ColorPickerPopover } from '3h1-ui'
import tinycolor from 'tinycolor2'

const color = ref('#2DA44E')
const color1 = ref('#ffffff')
const color2 = ref('#000000')
const mixinUp = (i) => {
  return mix(color.value, color2.value, i * 0.1)
}

const mixinDown = (i) => {
  return mix(color.value, color1.value, i * 0.1)
}

const colors = {
  green_1: '#dafbe1',
  green_2: '#aceebb',
  green_3: '#6fdd8b',
  green_4: '#4ac26b',
  green_5: '#2da44e',
  green_6: '#1A7F37',
  green_7: '#116329',
  green_8: '#044f1e',
  green_9: '#003d16',
  green_10: '#002d11'
}

// const rgbToHsl = (R: number, G: number, B: number): number[] => {
//   const r = R / 255
//   const g = G / 255
//   const b = B / 255
//   const min = Math.min(r, g, b)
//   const max = Math.max(r, g, b)
//   const delta = max - min
//   let h: number
//   let s: number
//   if (max === min) {
//     h = 0
//   } else if (r === max) {
//     h = (g - b) / delta
//   } else if (g === max) {
//     h = 2 + (b - r) / delta
//   } else if (b === max) {
//     h = 4 + (r - g) / delta
//   }
//   h = Math.min(h * 60, 360)
//   if (h < 0) {
//     h += 360
//   }
//   const l = (min + max) / 2
//   if (max === min) {
//     s = 0
//   } else if (l <= 0.5) {
//     s = delta / (max + min)
//   } else {
//     s = delta / (2 - max - min)
//   }
//   return [h, s, l]
// }
const hexToRgb = (color: string): number[] => {
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)
  return [r, g, b]
}

const rgbToHex = (R: number, G: number, B: number): string[] => {
  const r = ('0' + (R || 0).toString(16)).slice(-2)
  const g = ('0' + (G || 0).toString(16)).slice(-2)
  const b = ('0' + (B || 0).toString(16)).slice(-2)
  return [r, g, b]
}

const minColorScale = (
  [R1, G1, B1]: number[],
  [R2, B2, G2]: number[],
  minWeight: number
): number[] => {
  const r = Math.round(R1 - Math.pow(minWeight * 4, 4) + R2 * minWeight)
  const g = Math.round(G1 - Math.pow(minWeight * 4, 4) + B2 * minWeight)
  const b = Math.round(B1 - Math.pow(minWeight * 4, 4) + G2 * minWeight)
  return [r, g, b]
}

const mix = (color1: string, color2: string, weight: number): string => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  const [r, g, b] = minColorScale(hexToRgb(color1), hexToRgb(color2), weight)
  // const [_r, _g, _b] = rgbToHex(r, g, b)
  return tinycolor({ r, g, b }).toHexString()
}
</script>
