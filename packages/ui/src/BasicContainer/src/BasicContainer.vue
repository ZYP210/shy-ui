<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-header-title`">
        <div :class="`${prefixCls}-header-title-icon`" @click="emit('cancel')">
          <ArrowLeftOutlined :style="{ fontSize: `14px` }" />
        </div>
        <div :class="`${prefixCls}-header-title-text`">{{ title }}</div>
      </div>
      <div :class="`${prefixCls}-header-extra`">
        <slot name="extra"></slot>
      </div>
    </div>
    <div :class="`${prefixCls}-content`">
      <slot></slot>
    </div>
    <div :class="`${prefixCls}-footer`">
      <slot name="buttons"></slot>
      <Button type="primary" @click="emit('submit')">
        {{ submitBtnText }}
      </Button>
      <Button @click="emit('cancel')">
        {{ cancelBtnText }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { basicContainerProps } from './props'
import { useDesign } from '@shy-plugins/use'

export default defineComponent({
  components: {
    Button,
    ArrowLeftOutlined
  },
  props: basicContainerProps,
  emit: ['submit', 'cancel'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('basic-container')

    return {
      prefixCls,
      emit
    }
  }
})
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-basic-container';

.@{prefix-cls} {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  overflow: auto;
  background: #fff;

  &-header {
    display: flex;
    width: 100%;
    height: fit-content;
    align-items: center;
    padding: 0 16px;

    &-title {
      display: flex;
      align-items: center;

      &-icon {
        margin-right: 14px;
        cursor: pointer;
      }

      &-text {
        font-size: 20px;
        line-height: 20px;
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    padding: 0 16px;
  }
}
</style>
