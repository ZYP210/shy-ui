<template>
  <BasicTree :treeData="treeData"></BasicTree>
</template>

<script setup lang="ts">
import { BasicTree, TreeItem } from '3h1-ui'
import { ref } from 'vue'
const treeData = ref<TreeItem[]>([])
</script>

<style scoped></style>
