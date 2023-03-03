<template>
  <div class="current-line">
    <div class="current-line-title">
      {{ time }}
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{ minTime: number; secondWidth: number }>(),
  {}
)
const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
const width = ref<string>('0px')
const time = ref<string>('')
setInterval(() => {
  const currentUnix = dayjs().unix()
  width.value = props.secondWidth * (currentUnix - props.minTime) + 'px'
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)
</script>

<style lang="less" scoped>
.current-line {
  top: 0;
  bottom: 0;
  position: absolute;
  left: 0px;
  width: v-bind(width);
  background-color: rgba(181, 207, 212, 0.3);
  border-right: 1px solid #880a11;
  box-sizing: border-box;
}

.current-line-title {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(200px);
  width: 180px;
  text-align: left;
  font-size: 12px;
  color: #959434;
}
</style>
