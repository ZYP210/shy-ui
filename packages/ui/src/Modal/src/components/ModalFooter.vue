<template>
  <div>
    <slot name="insertFooter"></slot>
    <BasicButton
      type="default"
      v-bind="cancelButtonProps"
      @click="handleCancel"
      v-if="showCancelBtn"
    >
      {{ cancelText }}
    </BasicButton>
    <slot name="centerFooter"></slot>
    <BasicButton
      type="primary"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      v-if="showOkBtn"
    >
      {{ okText }}
    </BasicButton>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
import { BasicButton } from '../../../Button/index'
import { defineComponent } from 'vue'

import { basicProps } from '../props'

export default defineComponent({
  name: 'BasicModalFooter',
  props: basicProps,
  emits: ['ok', 'cancel'],
  components: {
    BasicButton
  },
  setup(_, { emit }) {
    function handleOk(e: Event) {
      emit('ok', e)
    }
    function handleCancel(e: Event) {
      emit('cancel', e)
    }

    return { handleOk, handleCancel }
  }
})
</script>
