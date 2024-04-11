<template>
  <div>
    <slot name="insertFooter"></slot>
    <Button
      v-bind="cancelButtonProps"
      @click="handleCancel"
      v-if="showCancelBtn"
    >
      {{ cancelText }}
    </Button>
    <slot name="centerFooter"></slot>
    <Button
      :type="okType"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      v-if="showOkBtn"
    >
      {{ okText }}
    </Button>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'

import { basicProps } from '../props'

export default defineComponent({
  name: 'BasicModalFooter',
  props: basicProps,
  emits: ['ok', 'cancel'],
  components: {
    Button
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
