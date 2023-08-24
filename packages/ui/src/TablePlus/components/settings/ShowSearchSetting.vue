<template>
  <Tooltip placement="top">
    <template #title>
      <span>显隐搜索</span>
    </template>
    <BarsOutlined @click="redo" />
  </Tooltip>
</template>
<script lang="ts">
import { defineComponent, unref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { BarsOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@shy-plugins/use'
import { useTableContext } from '../../hooks/useTableContext'

export default defineComponent({
  name: 'RedoSetting',
  components: {
    BarsOutlined,
    Tooltip
  },
  setup() {
    const table = useTableContext()
    const { t } = useI18n()

    function redo() {
      const isShowSearch = unref(table.getBindValues).isShowSearch
      table.setProps({ isShowSearch: !isShowSearch })
    }

    return { redo, t }
  }
})
</script>
