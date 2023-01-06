<template>
  <div>
    <BasicTitle helpMessage="提示1" :span="true">标题</BasicTitle>
    <BasicTitle :helpMessage="['提示1', '提示2']">标题</BasicTitle>
  </div>
</template>
<script>
import { BasicTitle } from '3h1-ui'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { BasicTitle }
})
</script>
