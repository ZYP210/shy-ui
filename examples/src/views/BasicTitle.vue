<template>
  <div>
    <BasicTitle helpMessage="提示1" :expand="true">22222</BasicTitle>
    <BasicTitle :helpMessage="['提示1', '提示2']">标题</BasicTitle>

    <!-- // BasicArrow -->
    <!-- <BasicArrow :expand="true" /> -->
  </div>
</template>
<script lang="ts" setup>
import { BasicTitle, BasicArrow } from '3h1-ui'
</script>
