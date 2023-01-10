<template>
  <div>
    <Tag :color="data?.dictColor">
      <template v-if="data.dictIcon" #icon>
        <Icon :icon="data?.dictIcon" />
      </template>
      {{ data.dictValue }}
    </Tag>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { propTypes } from '/@/utils/propTypes';
  import Icon from '/@/components/Icon/index';

  export default defineComponent({
    name: 'TableDict',
    components: { Tag, Icon },
    props: {
      data: propTypes.object.def(),
    },
    setup() {},
  });
</script>
<style scoped>
  .app-iconify {
    vertical-align: middle;
  }
</style>
