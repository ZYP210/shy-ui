<template>
  <div class="table-settings">
    <GlobalSearch v-if="ifShowGlobalSearch" />

    <AdvancedSearchSetting
      v-if="getBindValues.useAdvancedSearch"
      :getPopupContainer="getTableContainer"
    />

    <ShowSearchSetting
      v-if="
        getBindValues?.formConfig?.schemas &&
        getBindValues?.formConfig?.schemas?.length !== 0
      "
      :getPopupContainer="getTableContainer"
    />

    <SizeSetting
      v-if="getSetting.size"
      :getPopupContainer="getTableContainer"
    />
    <ColumnSetting
      v-if="getSetting.setting"
      @columns-change="handleColumnChange"
      :getPopupContainer="getTableContainer"
    />
    <FullScreenSetting
      v-if="getSetting.fullScreen"
      :getPopupContainer="getTableContainer"
    />
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import type { TableSetting, ColumnChangeParam } from '../../types/table'
import { defineComponent, computed, unref } from 'vue'
import ColumnSetting from './ColumnSetting.vue'
import SizeSetting from './SizeSetting.vue'
import FullScreenSetting from './FullScreenSetting.vue'
import ShowSearchSetting from './ShowSearchSetting.vue'
import AdvancedSearchSetting from './AdvancedSearchSetting.vue'

import { useTableContext } from '../../hooks/useTableContext'
import GlobalSearch from './GlobalSearch.vue'

export default defineComponent({
  name: 'TableSetting',
  components: {
    GlobalSearch,
    ColumnSetting,
    SizeSetting,
    // RedoSetting,
    FullScreenSetting,
    ShowSearchSetting,
    AdvancedSearchSetting
  },
  props: {
    setting: {
      type: Object as PropType<TableSetting>,
      default: () => ({})
    }
  },
  emits: ['columns-change'],
  setup(props, { emit }) {
    // const { t } = useI18n()
    const table = useTableContext()

    const getSetting = computed((): TableSetting => {
      return {
        redo: true,
        size: true,
        setting: true,
        fullScreen: false,
        ...props.setting
      }
    })

    function handleColumnChange(data: ColumnChangeParam[]) {
      emit('columns-change', data)
    }

    function getTableContainer() {
      return table ? unref(table.wrapRef) : document.body
    }

    const { getBindValues } = useTableContext()

    const ifShowGlobalSearch = computed(() => {
      return (
        getBindValues.value.useAdvancedSearch &&
        getBindValues.value.columns.some((item) => {
          return (
            item.dataIndex !== 'action' &&
            [true, undefined].includes(item.globalShow)
          )
        })
      )
    })

    return {
      getSetting,
      handleColumnChange,
      getTableContainer,
      getBindValues,
      ifShowGlobalSearch
    }
  }
})
</script>
<style lang="less">
.table-settings {
  display: flex;
  align-items: center;
  & > * {
    margin-right: 12px;
  }

  svg {
    width: 1.3em;
    height: 1.3em;
  }
}
</style>
