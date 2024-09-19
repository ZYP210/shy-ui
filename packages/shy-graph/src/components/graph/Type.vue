<template>
  <div class="h-full w-full box-border p-2 flex flex-col overflow-hidden">
    <a-tabs v-model:activeKey="activeKey" centered>
      <a-tab-pane key="1" tab="点类型"></a-tab-pane>
      <a-tab-pane key="2" tab="边类型"></a-tab-pane>
    </a-tabs>
    <div class="flex-1 p-2 box-border flex flex-col overflow-hidden">
      <a-input-search v-model:value="searchValue" placeholder="请输入搜索关键字" />
      <div class="flex-1 mt-10px h-full flex flex-col gap-10px w-full overflow-auto">
        <div
          v-for="item in typeList"
          class="p-3 hover:bg-[#1650ff0f] hover:text-[#1650ff] cursor-pointer rounded-md relative group"
          @click="handleFocus(item)"
        >
          {{ item.id }}
          <div
            class="i-ant-design:delete-outlined hidden absolute top-1/2 right-5 transform -translate-y-1/2 group-hover:block"
            @click.stop="handleDelete(item)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGraph, animation } from "/@/hooks/useGraph";

const activeKey = ref("1");
const searchValue = ref("");
const { graph, nodes, edges, updateGraphData } = useGraph();

const typeList = computed(() => {
  const list = activeKey.value === "1" ? nodes.value : edges.value;
  return list.filter((item: any) => {
    const regex = new RegExp(unref(searchValue), "i");
    return regex.test(item.id);
  });
});

const handleFocus = (item) => {
  graph?.focusElement(item.id, animation);
  graph?.setElementState(item.id, "onActivated");
};

const handleDelete = (item) => {
  if (activeKey.value === "1") {
    graph?.removeData({
      nodes: [item.id],
    });
  } else {
    graph?.removeData({
      edges: [item.id],
    });
  }
  updateGraphData();
  graph?.render();
  graph?.resize();
  graph?.fitCenter();
};
</script>

<style scoped lang="less"></style>

