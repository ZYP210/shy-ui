<template>
  <FlowChart :data="demoData" />
</template>

<script lang="ts" setup>
import { FlowChart } from '3h1-ui'
import { PageWrapper } from '/@/components/Page'

import demoData from './dataTurbo.json'
</script>
