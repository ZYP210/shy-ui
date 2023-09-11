<template>
  <div style="overflow: hidden">
    <CaretUpOutlined :style="getStyleUp" @click="handleUpClick" />
    <CaretDownOutlined :style="getStyleDown" @click="handleDownClick" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'
const basStyle = {
  display: 'block',
  color: '#bfbfbf',
  fontSize: '12px'
}

const emits = defineEmits(['change'])

const curPicker = ref(0)
const handleUpClick = () => {
  curPicker.value === 1 ? (curPicker.value = 0) : (curPicker.value = 1)
}

const handleDownClick = () => {
  curPicker.value === 2 ? (curPicker.value = 0) : (curPicker.value = 2)
}

watch(curPicker, (value) => {
  emits('change', value)
})

const getStyleUp = computed(() => {
  return {
    ...basStyle,
    transform: 'transLateY(2px)',
    color: curPicker.value === 1 ? '#4B8FF9' : '#bfbfbf'
  }
})

const getStyleDown = computed(() => {
  return {
    ...basStyle,
    transform: 'transLateY(-2px)',
    color: curPicker.value === 2 ? '#4B8FF9' : '#bfbfbf'
  }
})
</script>

<style></style>
