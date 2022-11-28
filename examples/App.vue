<template>
  <div class="box-main">
    <s-table @add-event="hadnleAdd" :column="column" :data="data">
      <template #a="{ row }">{{ row.a }}</template>
      <template #menuLeft>
        <a-button>123</a-button>
      </template>

      <template #menuRight>
        <a-button>插槽1</a-button>
        <a-button>插槽2</a-button>
      </template>
    </s-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const hadnleAdd = (a) => {
  console.log('a', a)
}
const column = [
  {
    title: '账号',
    dataIndex: 'a',
    slot: true
  },
  {
    title: '用户姓名',
    dataIndex: 'b'
  },
  {
    title: '年龄',
    dataIndex: 'c'
  }
]

const data = [
  {
    a: 1,
    b: 2,
    c: 3
  },
  {
    a: 1,
    b: 2,
    c: 3
  },
  {
    a: 1,
    b: 2,
    c: 3
  },
  {
    a: 1,
    b: 2,
    c: 3
  }
]
</script>

<style lang="less" scoped>
.box-main {
  margin: 100px auto 0;
  width: 1000px;
  height: 1000px;
}
</style>
