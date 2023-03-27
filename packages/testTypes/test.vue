<template>
  <div>
    123
    <div>{{ props.a }}</div>
    <div>{{ a.a }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  a: string
}

const a: Props = { a: '1' }

const props = defineProps({
  a: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
