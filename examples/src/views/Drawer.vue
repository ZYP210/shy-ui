<template>
  <BasicDrawer
    @register="register"
    v-bind="$attrs"
    title="Drawer Title"
    width="50%"
  >
    Drawer Info.
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { BasicDrawer, useDrawer } from '3h1-ui'
import { onMounted } from 'vue'

const [register, { openDrawer }] = useDrawer()

onMounted(() => {
  openDrawer(true)
})
</script>
