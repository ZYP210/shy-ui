<template>
  <div style="width: 100%">
    <div v-if="$slots.headerTop" style="margin: 5px">
      <slot name="headerTop"></slot>
    </div>
    <div class="flex items-center">
      <slot name="tableTitle" v-if="$slots.tableTitle"></slot>
      <!-- <TableTitle
        :helpMessage="titleHelpMessage"
        :title="title"
        v-if="!$slots.tableTitle && title"
      /> -->
      <div :class="`${prefixCls}__toolbar`">
        <div :class="`${prefixCls}__button`"><slot name="toolbar"></slot></div>
        <!-- <Divider type="vertical" v-if="$slots.toolbar && showTableSetting" /> -->
        <TableSetting
          :setting="tableSetting"
          v-if="showTableSetting"
          @columns-change="handleColumnChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { TableSetting, ColumnChangeParam } from '../types/table'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
// import { Divider } from 'ant-design-vue';
import TableSettingComponent from './settings/index.vue'
// import TableTitle from './TableTitle.vue';
import { useDesign } from '@shy-plugins/use'

export default defineComponent({
  name: 'BasicTableHeader',
  components: {
    // Divider,
    // TableTitle,
    TableSetting: TableSettingComponent
  },
  props: {
    title: {
      type: [Function, String] as PropType<
        string | ((data: Recordable) => string)
      >
    },
    tableSetting: {
      type: Object as PropType<TableSetting>
    },
    showTableSetting: {
      type: Boolean
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: ''
    }
  },
  emits: ['columns-change'],
  setup(_, { emit }) {
    const { prefixCls } = useDesign('basic-table-header')
    function handleColumnChange(data: ColumnChangeParam[]) {
      emit('columns-change', data)
    }
    return { prefixCls, handleColumnChange }
  }
})
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-basic-table-header';

.@{prefix-cls} {
  &__button {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > * {
      margin-right: 0.5rem;
    }
  }

  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    > * {
      margin-right: 8px;
    }
  }
}
</style>
