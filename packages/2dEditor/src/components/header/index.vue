<template>
  <div class="flex">
    <Logo />
    <!-- <Toolbar /> -->
    <!-- <Action /> -->
  </div>
</template>

<script lang="ts" setup>
import Toolbar from './Toolbar.vue'
import Logo from './Logo.vue'
import Action from './Action.vue'
</script>

<style scoped lang="less">
.pen:hover {
  color: #1890ff;
  cursor: pointer;
}
.is-active {
  color: #1890ff;
}
</style>
