<template>
  <div class="w-full h-full relative">
    <div id="container"></div>
    <Drawer v-model:open="typeOpen">
      <Type />
    </Drawer>
    <Drawer :width="500" align="right" v-model:open="settingOpen">
      <Setting v-if="settingOpen" />
    </Drawer>
    <Action-Bar :style="{ right: settingOpen ? '550px' : '50px' }" />
  </div>
</template>

<script setup lang="ts">
import Drawer from "./Drawer.vue";
import Type from "/@/components/graph/Type.vue";
import { useGraph } from "/@/hooks/useGraph";
import ActionBar from "/@/components/graph/ActionBar.vue";
import Setting from "/@/components/graph/Setting.vue";

const { setGraphData, selectedNode } = useGraph();

const settingOpen = ref(false);
const typeOpen = ref(true);

watch(selectedNode, (val) => {
  if (!!val) {
    settingOpen.value = true;
  } else {
    settingOpen.value = false;
  }
});

onMounted(async () => {
  const res = await fetch("https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json");
  const data = await res.json();
  setGraphData(data);
});
</script>

<style scoped lang="less">
#container {
  height: 100%;
  width: 100%;
  background: rgb(246, 248, 255);
}
</style>

