<template>
  <div class="p-5 w-full h-full overflow-hidden">
    <div>
      <div class="mb-10">
        <div class="text-16px font-500 mb-5">概念名称</div>
        <a-input v-if="selectedNode?.data" v-model:value="selectedNode.data.name" />
      </div>

      <div class="mb-10">
        <div class="text-16px font-500 mb-5">{{ selectedNode?.targetType === "node" ? "节点" : "边" }}样式配置</div>
        <StyleConfigTable v-model:selectedNode="selectedNode" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StyleConfigTable from "./StyleConfigTable.vue";
import { useGraph } from "/@/hooks/useGraph";
const { selectedNode } = useGraph();
</script>

<style scoped lang="less"></style>

