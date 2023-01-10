<template>
  <div class="p-4 flex justify-center">
    <div class="demo-wrap p-10">
      <StrengthMeter placeholder="默认" />
      <StrengthMeter placeholder="禁用" disabled />
      <br />
      <StrengthMeter
        placeholder="隐藏input"
        :show-input="false"
        value="!@#qwe12345"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StrengthMeter } from '3h1-ui'
</script>

<style lang="less" scoped>
.demo-wrap {
  width: 50%;
  background: #fff;
  border-radius: 10px;
}
</style>
