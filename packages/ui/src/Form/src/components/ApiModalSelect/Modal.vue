<template>
  <BasicModal title="title"></BasicModal>
</template>

<script setup lang="ts">
import { useModalInner, BasicModal } from '../../../../Modal'

const [register] = useModalInner()
</script>

<style scoped></style>
