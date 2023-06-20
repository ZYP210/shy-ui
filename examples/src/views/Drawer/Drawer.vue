<template>
  <BasicDrawer @register="register" :title="title" width="50%">
    Drawer Info.
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { BasicButton, BasicDrawer, useDrawerInner } from '3h1-ui'
import { onMounted, ref } from 'vue'

const title = ref('')
const [register] = useDrawerInner((data) => {
  title.value = data.title
  console.log(data.title)
})
</script>
