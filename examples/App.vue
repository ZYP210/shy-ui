<template>
  <div class="box-main">
    <a-button @click="clickEvent">显示人物选择器</a-button>
    <user-select
      ref="userRef"
      :deptFun="deptFun"
      :userFun="userFun"
      @confirm="confirmEvent"
    >
    </user-select>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import axios from './plugins/axios.js'
const deptFun = async () => {
  try {
    const res = await axios({ url: '/api/blade-system/dept/list' })
    return res.data.data
  } catch {}
}

const userFun = async (deptId = undefined) => {
  try {
    const res = await axios({ url: '/api/blade-user/page', params: { deptId } })
    return res.data.data.records
  } catch {}
}

deptFun()

const userRef = ref()
const clickEvent = () => {
  userRef.value.open()
}

const confirmEvent = (list) => {
  console.log('list', list)
}
</script>

<style lang="less" scoped>
.box-main {
  overflow: hidden;
  margin: 100px auto 0;
  width: 1000px;
  // height: 1000px;
}
</style>
