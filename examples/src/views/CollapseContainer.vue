<template>
  <div>
    <CollapseContainer title="区域折叠卡片容器" helpMessage="helpMessage">
      <div class="body"></div>
      <div>123</div>
      <div>235</div>
      <div>123</div>
      <div>235</div>
      <div>123</div>
      <div>235</div>
      <div>123</div>
      <div>235</div>
    </CollapseContainer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CollapseContainer } from '3h1-ui'

export default defineComponent({
  components: {
    CollapseContainer
  }
})
</script>

<style scoped lang="less">
.body {
  height: 300px;
  background-color: #eee;
}
</style>
