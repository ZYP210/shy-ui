<template>
  <div class="h-full pb-5 box-border">
    <a-tabs centered class="h-60px" v-model:activeKey="activeTab">
      <a-tab-pane :tab="tab.label" v-for="tab in tabList" :key="tab.value" />
    </a-tabs>

    <div class="h-[calc(100%-60px)] overflow-auto">
      <a-collapse v-if="activeTab === '1'" v-model:activeKey="activeKey">
        <a-collapse-panel
          :header="item.title"
          v-for="item in getDynamicSchema"
          :key="item.title"
        >
          <Form
            v-if="curMode === 'pen'"
            :schema="item.children"
            v-model:formModel="reactivePenConfig"
          />

          <LineProps v-else-if="curMode === 'line'" />
          <Form
            v-else
            :schema="item.children"
            v-model:formModel="canvasFormModel"
          />
        </a-collapse-panel>
      </a-collapse>

      <Form
        class="p-10px"
        v-else
        :schema="configSchema"
        v-model:formModel="currPenDataSource"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Options } from '@meta2d/core'
import Form from '../form/index.vue'
import {
  baseSchema,
  canvasSchema,
  textSchema,
  echartsSchema,
  setParams
} from './props.data'
import { useSelection } from '../../hooks/useSelections'
import { useContext } from '../../hooks/useContext'
import type { FormSchema } from '../../types/form'
import {
  Tabs as ATabs,
  Collapse as ACollapse,
  CollapsePanel as ACollapsePanel,
  TabPane as ATabPane
} from 'ant-design-vue'
import { useEventBus } from '../../hooks/useEventBus'
import LineProps from './LineProps.vue'
import { ref, reactive, unref, toRefs, watch, computed, onUnmounted } from 'vue'

const { deviceDataSource, api } = useContext()

const { selectList } = toRefs(deviceDataSource)

setParams({ selectList }, api)

const eventbus = useEventBus()
const { reactivePenConfig, selections } = useSelection()

const { curMode } = useSelection()

const configSchema = ref<FormSchema[]>([])
const currPenDataSource = ref<Recordable>({})

watch([selections, curMode], ([curSelect, curMode]) => {
  activeTab.value = '1'
  configSchema.value = []

  if (curMode === 'blueprints') {
    currPenDataSource.value = []
    return
  }

  currPenDataSource.value = curSelect?.dataSource
  const key = curSelect?.name
  if (!key) return
  switch (key) {
    case 'text':
      configSchema.value = textSchema
      break
    case 'echarts':
      configSchema.value = echartsSchema
      break
  }
})

const activeKey = ref<string[]>([])
const tabList = computed(() => {
  const tabs = [{ value: '1', label: '配置' }]
  if (configSchema.value.length) {
    tabs.push({ value: '2', label: '数据' })
  }
  return tabs
})

const activeTab = ref('1')

const getDynamicSchema = computed(() => {
  if (curMode.value === 'blueprints') {
    activeKey.value = [canvasSchema[1].title]
    return canvasSchema
  } else {
    activeKey.value = [baseSchema[0].title]
    return baseSchema
  }
})

const canvasFormModel = ref<Options>({})

eventbus.customOn('opened', () => {
  canvasFormModel.value = meta2d.getOptions()
})

onUnmounted(() => {
  eventbus.customOff('opened', () => {
    canvasFormModel.value = meta2d.getOptions()
  })
})
</script>

<style scoped lang="less">
::-webkit-scrollbar {
  display: none;
}
</style>
../../hooks/useSelections../../hooks/useContext
