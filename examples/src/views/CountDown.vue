<template>
  <CountButton a="1" :value="a" :count="10" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CountButton } from '3h1-ui'

export default defineComponent({
  components: { CountButton },
  data() {
    return {
      a: 10
    }
  }
})
</script>
