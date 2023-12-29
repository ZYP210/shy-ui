<template>
  <div class="w-300px flex items-center gap-8 cursor-pointer">
    <div v-for="action of actionList" @click="action.event">
      {{ action.label }}
    </div>
  </div>
  <DataSourceModal v-model:open="dataSourceModalOpen" />
</template>

<script lang="ts" setup>
import DataSourceModal from './components/dataSourceModal.vue';
const dataSourceModalOpen = ref(false);
const actionList = ref([
  {
    label: '数据源',
    event: () => {
      dataSourceModalOpen.value = true;
    },
  },
  {
    label: '保存',
    event: 'redo',
  },
  {
    label: '预览',
    event: 'import',
  },
  {
    label: '发布',
    event: 'export',
  },
]);
</script>
<style scoped lang="less"></style>
