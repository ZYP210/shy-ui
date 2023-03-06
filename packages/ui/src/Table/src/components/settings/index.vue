<template>
  <div class="table-settings">
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
import RedoSetting from './RedoSetting.vue'
import FullScreenSetting from './FullScreenSetting.vue'
import ShowSearchSetting from './ShowSearchSetting.vue'

// import { useI18n } from '/@/hooks/web/useI18n'
import { useTableContext } from '../../hooks/useTableContext'

export default defineComponent({
  name: 'TableSetting',
  components: {
    ColumnSetting,
    SizeSetting,
    // RedoSetting,
    FullScreenSetting,
    ShowSearchSetting
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

    return { getSetting, handleColumnChange, getTableContainer, getBindValues }
  }
})
</script>
<style lang="less">
.table-settings {
  & > * {
    margin-right: 12px;
  }

  svg {
    width: 1.3em;
    height: 1.3em;
  }
}
</style>
