<template>
  <div class="box-main">
    <s-page v-model:page="page"></s-page>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const page = ref({
  current: 2,
  pageSize: 20,
  total: 100
})
</script>

<style lang="less" scoped>
.box-main {
  margin: 100px auto 0;
  width: 1000px;
  height: 1000px;
}
</style>
