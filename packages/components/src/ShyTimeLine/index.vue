<template>
  <section class="shy-time-line">
    <a-timeline :pending="props.option?.pending" :mode="props.option?.mode">
      <a-timeline-item :position="item.position" :color="item.color" v-for="(item, index) in props.data" :key="index">
        <template #dot v-if="item.dotIcon">
          <component :is="item.dotIcon" />
        </template>
        <p v-for="(e, i) in item.content" :key="i">
          <span v-if="e.label">{{ e.label }}:</span>
          <span>{{ e.value }}</span>
        </p>
      </a-timeline-item>
    </a-timeline>
  </section>
</template>
<script setup lang="ts">
interface itemContent {
  label?: string;
  value?: string;
}

interface dataItem {
  color?: string;
  dotIcon?: string;
  position?: string | "left";
  content: Array<itemContent>;
}

const props = defineProps({
  data: {
    required: true,
    type: Array<dataItem>,
  },
  option: {
    type: Object,
    defautle: () => {
      return {
        pending: false,
        mode: "left",
      };
    },
  },
});
</script>

<style lang="less" scoped>
.shy-time-line {
  width: 100%;
  height: 100%;
}
</style>
