<template>
  <CropperImage
    ref="refCropper"
    :src="img"
    @cropend="handleCropend"
    style="width: 40vw"
  />
  <AvatarCropper @before-upload="handleBeforeUpload" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CropperImage, AvatarCropper } from '3h1-ui'
import img from '../assets/imgs/1.jpg'

export default defineComponent({
  components: {
    CropperImage,
    AvatarCropper
  },
  setup() {
    const info = ref('')
    const cropperImg = ref('')

    function handleCropend({ imgBase64, imgInfo }) {
      info.value = imgInfo
      cropperImg.value = imgBase64
    }

    const handleBeforeUpload = ({ file, closeModal, filename }) => {
      console.log(file, filename)
      closeModal()
    }

    return {
      img,
      info,
      cropperImg,
      handleCropend,
      handleBeforeUpload
    }
  }
})
</script>
