<template>
  <ShyLayoutContainer :grid-layouts="gridLayouts" :gap="10">
    <div>111</div>
    <div>222</div>
    <div>333</div>
    <div>444</div>
    <div>555</div>
    <div>666</div>
    <div>777</div>
    <div>888</div>
  </ShyLayoutContainer>
</template>

<script setup lang="ts">
import { ShyLayoutContainer } from '3h1-ui'

// 行起始 列起始 行结束 列结束
const gridLayouts = ref<[number, number, number, number][]>([
  [1, 1, 1, 25],
  [2, 1, 8, 5],
  [8, 1, 14, 5],
  [14, 1, 20, 5],
  [2, 5, 20, 21],
  [2, 21, 8, 25],
  [8, 21, 20, 25],
  [20, 1, 27, 25]
])
</script>
