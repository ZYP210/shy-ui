<template>
  <QrCode :value="qrCodeUrl" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { QrCode } from '@shy-plugins/qrcode'
const qrCodeUrl = 'https://www.vvbin.cn'
export default defineComponent({
  components: { QrCode },
  setup() {
    return {
      qrCodeUrl
    }
  }
})
</script>
<style scoped></style>
