<template>
  <a-form
    v-model:value="form"
    :labelCol="{ span: 12 }"
    :wrapperCol="{ span: 12 }"
  >
    <a-form-item label="名称">
      <a-input
        @change="handleChangeName"
        size="small"
        v-model:value="form.name"
      />
    </a-form-item>
    <a-form-item label="预设动画">
      <a-switch v-model:checked="form.isUsePreAnimation"></a-switch>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { useSelection } from '../../hooks/useSelections'
import { useLineAnimation } from '../../hooks/useLineAnimation'
import { ref, watch } from 'vue'

import {
  Form as AForm,
  Input as AInput,
  FormItem as AFormItem,
  Switch as ASwitch
} from 'ant-design-vue'
const { selections } = useSelection()
const { startLineAnimationPresetOne } = useLineAnimation()

const form = ref({
  isUsePreAnimation: false
})

watch(form.value, (value) => {
  if (value.isUsePreAnimation) {
    startLineAnimationPresetOne(selections?.value?.id)
  }
})

const handleChangeName = () => {
  console.log('meta', meta2d)
}
</script>
