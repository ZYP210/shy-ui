<template>
  <div>
    <ClickOutSide @clickOutside="() => (showRef = false)">
      <div @click="() => (showRef = true)">
        {{
          showRef
            ? '鼠标点击那部（点击边框外可以恢复）'
            : '点击该区域状态(初始状态)'
        }}
      </div>
    </ClickOutSide>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ClickOutSide } from '3h1-ui'

const showRef = ref(false)
</script>
