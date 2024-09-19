<template>
  <div class="bar">
    <a-space-compact block>
      <a-tooltip title="放大">
        <a-button @click="graph?.zoomBy(1.2, animation)">
          <div class="i-ant-design:plus-outlined" />
        </a-button>
      </a-tooltip>
      <a-tooltip title="缩小">
        <a-button @click="graph?.zoomBy(0.8, animation)">
          <div class="i-ant-design:minus-outlined" />
        </a-button>
      </a-tooltip>
      <a-tooltip title="画布1 : 1">
        <a-button @click="graph?.fitCenter()">
          <div class="i-ant-design:one-to-one-outlined" />
        </a-button>
      </a-tooltip>
      <a-tooltip title="全屏">
        <a-button @click="graph?.fitView()">
          <div class="i-ant-design:fullscreen-outlined" />
        </a-button>
      </a-tooltip>
    </a-space-compact>
  </div>
</template>

<script lang="ts" setup>
import { useGraph, animation } from "/@/hooks/useGraph";
const { graph } = useGraph();
</script>

<style scoped lang="less">
.bar {
  position: absolute;
  bottom: 20px;
  z-index: 101;
  transition: all ease 0.3s;
}
</style>

