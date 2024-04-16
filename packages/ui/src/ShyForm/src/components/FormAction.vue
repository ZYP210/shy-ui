<template>
  <div :class="prefixCls" :style="{ textAlign: actionColOpt.style.textAlign }">
    <slot></slot>
    <FormItem>
      <slot name="resetBefore"></slot>
      <BasicButton
        type="default"
        v-bind="getResetBtnOptions"
        @click="resetAction"
        v-if="showResetButton"
      >
        {{ getResetBtnOptions.text }}
      </BasicButton>
      <slot name="submitBefore"></slot>

      <Button
        type="primary"
        v-bind="{ ...getSubmitBtnOptions }"
        @click="submitAction"
        v-if="showSubmitButton"
      >
        {{ getSubmitBtnOptions.text }}
      </Button>

      <slot name="advanceBefore"></slot>
      <slot name="advanceAfter"></slot>
    </FormItem>
  </div>
</template>
<script lang="ts">
import type { ColEx } from '../types/index'
import { defineComponent, computed, PropType } from 'vue'
import { Form, Col } from 'ant-design-vue'
import { BasicButton, ButtonProps } from '../../../Button'
import { useFormContext } from '../hooks/useFormContext'
import { watchEffect } from 'vue'
import { Button } from 'ant-design-vue'
import { useDesign } from '@shy-plugins/use'

type ButtonOptions = Partial<ButtonProps> & { text: string }

export default defineComponent({
  name: 'BasicFormAction',
  components: {
    FormItem: Form.Item,
    BasicButton,
    [Col.name]: Col,
    Button
  },
  props: {
    showResetButton: {
      type: Boolean,
      default: true
    },
    showSubmitButton: {
      type: Boolean,
      default: true
    },
    showAdvancedButton: {
      type: Boolean,
      default: true
    },
    resetButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({})
    },
    submitButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({})
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: () => ({})
    },
    actionSpan: {
      type: Number,
      default: 6
    },
    isAdvanced: {
      type: Boolean
    },
    hideAdvanceBtn: {
      type: Boolean
    }
  },
  // emits: ['toggle-advanced'],
  setup(props) {
    const { prefixCls } = useDesign('ant-form-action')
    
    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColOptions } = props
      const actionSpan = 24 - span
      const advancedSpanObj = showAdvancedButton
        ? { span: actionSpan < 6 ? 24 : actionSpan }
        : {}
      const actionColOpt: Partial<ColEx> = {
        style: { textAlign: 'right' },
        span: showAdvancedButton ? 6 : 4,
        ...advancedSpanObj,
        ...actionColOptions
      }
      return actionColOpt
    })

    const getResetBtnOptions = computed((): ButtonOptions => {
      return Object.assign(
        {
          text: '重置'
        },
        props.resetButtonOptions
      )
    })

    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          text: '查询'
        },
        {
          ...props.submitButtonOptions,
          loading: false
        }
      )
    })

    const getPreIcon = computed(() => {
      if (getSubmitBtnOptions.value.loading) {
        return undefined
      } else {
        return 'ant-design:search-outlined'
      }
    })

    watchEffect(() => {
      getPreIcon.value
    })

    // function toggleAdvanced() {
    //   emit('toggle-advanced');
    // }

    return {
      prefixCls,
      actionColOpt,
      getResetBtnOptions,
      getSubmitBtnOptions,
      // toggleAdvanced,
      ...useFormContext(),
      getPreIcon
    }
  }
})
</script>
<style lang="less" scoped></style>
