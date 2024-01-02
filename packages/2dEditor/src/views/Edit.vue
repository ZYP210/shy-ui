<template>
  <Header
    class="h-50px box-border mb-10px border-b-1px border-solid border-[#eee] shadow"
  />
  <div class="flex h-[calc(100%-60px)]">
    <Graphics class="w-300px flex-none" />
    <div id="meta2d" class="flex-auto overflow-hidden"></div>
    <Props
      class="w-300px flex-none border-t-1px border-solid border-[#eee] pl-10px pr-10px"
    />
  </div>
</template>

<script setup lang="ts">
// import Props from '../components/props/index.vue'
// import Graphics from './Graphics.vue'
import Header from '../components/header/index.vue'
</script>
