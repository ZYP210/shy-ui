<template>
  <div>
    <BasicHelp :text="['提示1', '提示2']" />
    <BasicHelp text="提示" />
  </div>
</template>
<script>
import { BasicHelp } from '3h1-ui'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { BasicHelp }
})
</script>
