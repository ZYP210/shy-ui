<template>
  <BasicButton @click="handleClick">打开drawer</BasicButton>
  <Drawer @register="register"> </Drawer>
</template>
<script lang="ts" setup>
import { BasicButton, BasicDrawer, useDrawer } from '3h1-ui'
import { onMounted, ref } from 'vue'
import Drawer from './Drawer/Drawer.vue'

const [register, { openDrawer }] = useDrawer()

let index = 0
const title = ref()
const handleClick = () => {
  title.value = index++
  openDrawer(true, { title: title.value.toString() })
}
</script>
