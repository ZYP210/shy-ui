<template>
  <CountButton a="1" :value="a" :count="20" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CountButton } from '3h1-ui'

export default defineComponent({
  components: { CountButton },
  data() {
    return {
      a: 5
    }
  }
})
</script>
