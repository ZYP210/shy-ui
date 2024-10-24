import { Tabs } from 'ant-design-vue'

export default defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="shy-ant-form-collapse overflow-hidden">
        <Tabs class="w-full">
          <Tabs.TabPane key="1" tab="销售金额变更" />
          <Tabs.TabPane key="2" tab="追加成本" />
        </Tabs>
        <div class="ant-collapse-content-box overflow-hidden">
          {slots?.default?.()}
        </div>
      </div>
    )
  }
})
