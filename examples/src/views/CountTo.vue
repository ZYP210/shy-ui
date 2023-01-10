<template>
  <CountTo
    prefix="$"
    :color="'#409EFF'"
    :startVal="1"
    :endVal="200000"
    :duration="8000"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CountTo } from '3h1-ui'

export default defineComponent({
  components: {
    CountTo
  }
})
</script>
