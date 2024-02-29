<template>
  <div :class="prefixCls">
    <div v-if="isShowHeader" :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-header-title`">
        <div
          v-if="!loading"
          :class="`${prefixCls}-header-title-icon`"
          @click="emit('cancel')"
        >
          <ArrowLeftOutlined :style="{ fontSize: `16px` }" />
        </div>
        <div v-if="loading" :class="`${prefixCls}-header-title-loading-icon`">
          <LoadingOutlined :style="{ fontSize: `16px` }" />
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
    <div v-if="isShowFooter" :class="`${prefixCls}-footer ${footerAlignRef}`">
      <div
        :class="`${prefixCls}-footer-buttons ${cancelAlignRef}`"
        v-if="isShowBtn"
      >
        <Button
          v-if="isShowCancelBtn"
          :class="`${prefixCls}-footer-cancel-button`"
          :loading="loading"
          @click="emit('cancel')"
        >
          {{ cancelBtnText }}
        </Button>
        <div :class="`${prefixCls}-footer-fn-buttons`">
          <Button
            v-if="isShowSaveBtn"
            type="primary"
            :loading="loading"
            @click="emit('save')"
          >
            {{ saveBtnText }}
          </Button>
          <Button
            v-if="isShowSubmitBtn"
            type="primary"
            :loading="loading"
            @click="emit('submit')"
          >
            {{ submitBtnText }}
          </Button>
          <slot name="buttons"></slot>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { defineComponent, computed } from 'vue'
import { basicContainerProps } from './props'
import { useDesign } from '@shy-plugins/use'

export default defineComponent({
  components: {
    Button,
    ArrowLeftOutlined,
    LoadingOutlined
  },
  props: basicContainerProps,
  emits: ['submit', 'cancel', 'save'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('basic-container')

    const cancelAlignRef = computed(() => {
      return `${prefixCls}-footer-cancel-${props.cancelAlign}`
    })

    const footerAlignRef = computed(() => {
      return `${prefixCls}-footer-${props.footerAlign}`
    })

    return {
      cancelAlignRef,
      footerAlignRef,
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
  overflow: hidden;
  background: #fff;

  &-header {
    display: flex;
    width: 100%;
    height: fit-content;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eaeaea;
    gap: 8px;

    &-title {
      display: flex;
      align-items: center;
      gap: 16px;

      &-icon {
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
    overflow: auto;
  }

  &-footer {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    border-top: 1px solid #eaeaea;

    &-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &-fn-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  &-footer-left {
    justify-content: flex-start;
  }

  &-footer-center {
    justify-content: center;
  }

  &-footer-right {
    justify-content: flex-end;
  }

  &-footer-cancel-left {
    flex-direction: row;
  }

  &-footer-cancel-right {
    flex-direction: row-reverse;
  }
}
</style>
