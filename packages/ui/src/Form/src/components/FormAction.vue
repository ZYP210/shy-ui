<template>
  <div
    style="width: 100%"
    v-if="showActionButtonGroup"
    :style="{ textAlign: actionColOpt.style.textAlign }"
  >
    <FormItem class="shy-form-action">
      <slot name="resetBefore"></slot>
      <BasicButton
        type="default"
        class="mr-2"
        v-bind="getResetBtnOptions"
        @click="resetAction"
        v-if="showResetButton"
      >
        {{ getResetBtnOptions.text }}
      </BasicButton>
      <slot name="submitBefore"></slot>

      <Button
        type="primary"
        class="mr-2"
        v-bind="{ ...getSubmitBtnOptions }"
        @click="submitAction"
        v-if="showSubmitButton"
      >
        {{ getSubmitBtnOptions.text }}
      </Button>

      <slot name="advanceBefore"></slot>
      <!-- <Button
        type="link"
        size="small"
        @click="toggleAdvanced"
        v-if="showAdvancedButton && !hideAdvanceBtn"
      >
        {{ isAdvanced ? t('component.form.putAway') : t('component.form.unfold') }}
        <BasicArrow class="ml-1" :expand="!isAdvanced" up />
      </Button> -->
      <slot name="advanceAfter"></slot>
    </FormItem>
  </div>
</template>
<script lang="ts">
import type { ColEx } from '../types/index'
//import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import { defineComponent, computed, PropType } from 'vue'
import { Form, Col } from 'ant-design-vue'
import { BasicButton, ButtonProps } from '../../../Button'
// import { BasicArrow } from '/@/components/Basic';
import { useFormContext } from '../hooks/useFormContext'
import { propTypes } from '@shy-plugins/utils'
import { watchEffect } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'
type ButtonOptions = Partial<ButtonProps> & { text: string }

export default defineComponent({
  name: 'BasicFormAction',
  components: {
    FormItem: Form.Item,
    BasicButton,
    [Col.name]: Col,
    Button,
    SearchOutlined
  },
  props: {
    showActionButtonGroup: propTypes.bool.def(true),
    showResetButton: propTypes.bool.def(true),
    showSubmitButton: propTypes.bool.def(true),
    showAdvancedButton: propTypes.bool.def(true),
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
    actionSpan: propTypes.number.def(6),
    isAdvanced: propTypes.bool,
    hideAdvanceBtn: propTypes.bool
  } as any,
  emits: ['toggle-advanced'],
  setup(props) {
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
