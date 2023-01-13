<template>
  <div :class="getClass" :style="getStyle">
    <div
      :class="`${prefixCls}-image-wrapper`"
      :style="getImageWrapperStyle"
      @click="openModal"
    >
      <div :class="`${prefixCls}-image-mask`" :style="getImageWrapperStyle">
        <Icon
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
        />
      </div>
      <img :src="sourceValue" v-if="sourceValue" alt="avatar" />
    </div>
    <a-button
      :class="`${prefixCls}-upload-btn`"
      @click="openModal"
      v-if="showBtn"
      v-bind="btnProps"
    >
      {{ btnText ? btnText : '选择图片' }}
    </a-button>

    <CopperModal
      @register="register"
      @upload-success="handleUploadSuccess"
      :uploadApi="uploadApi"
      :src="sourceValue"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  CSSProperties,
  unref,
  ref,
  watchEffect,
  watch,
  PropType
} from 'vue'
import CopperModal from './CopperModal.vue'
import { useModal } from '../../Modal'
import { useMessage } from '@shy-plugins/use'
import type { ButtonProps } from '../../Button'
import { Icon } from '../../Icon'

const props = {
  width: { type: [String, Number], default: '200px' },
  value: { type: String },
  showBtn: { type: Boolean, default: true },
  btnProps: { type: Object as PropType<ButtonProps> },
  btnText: { type: String, default: '' },
  uploadApi: {
    type: Function as PropType<({ file: Blob, name: string }) => Promise<void>>
  }
}

export default defineComponent({
  name: 'CropperAvatar',
  components: { CopperModal, Icon },
  props,
  emits: ['update:value', 'change'],
  setup(props, { emit, expose }) {
    const sourceValue = ref(props.value || '')

    const prefixCls = 'shy-cropper-avatar'

    const [register, { openModal, closeModal }] = useModal()
    const { createMessage } = useMessage()

    const getClass = computed(() => [prefixCls])

    const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px')

    const getIconWidth = computed(
      () => parseInt(`${props.width}`.replace(/px/, '')) / 2 + 'px'
    )

    const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }))

    const getImageWrapperStyle = computed(
      (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) })
    )

    watchEffect(() => {
      sourceValue.value = props.value || ''
    })

    watch(
      () => sourceValue.value,
      (v: string) => {
        emit('update:value', v)
      }
    )

    function handleUploadSuccess({ source, data }) {
      sourceValue.value = source
      emit('change', { source, data })
      createMessage.success('上传成功')
    }

    expose({ openModal: openModal.bind(null, true), closeModal })

    return {
      prefixCls,
      register,
      openModal: openModal as any,
      getIconWidth,
      sourceValue,
      getClass,
      getImageWrapperStyle,
      getStyle,
      handleUploadSuccess
    }
  }
})
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-cropper-avatar';

.@{prefix-cls} {
  display: inline-block;
  text-align: center;

  &-image-wrapper {
    overflow: hidden;
    cursor: pointer;
    background: @component-background;
    border: 1px solid @border-color-base;
    border-radius: 50%;

    img {
      width: 100%;
    }
  }

  &-image-mask {
    position: absolute;
    width: inherit;
    height: inherit;
    background: rgb(0 0 0 / 40%);
    border: inherit;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.4s;
    cursor: pointer;

    ::v-deep(svg) {
      margin: auto;
    }
  }

  &-image-mask:hover {
    opacity: 40;
  }

  &-upload-btn {
    margin: 10px auto;
  }
}
</style>
