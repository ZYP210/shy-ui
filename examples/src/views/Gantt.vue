<template>
  <div class="m-20px">
    <Gantt :option="options" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { Gantt } from '@shy-plugins/gantt'
import { ref } from 'vue'
const data = ref([])

setTimeout(() => {
  data.value = [
    {
      a: 'a',
      b: 'b',
      c: 'c',
      startTime: '2023-03-14 15:45:56',
      endTime: '2023-03-22 15:45:52'
    }
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // },
    // {
    //   a: 'a',
    //   b: 'b',
    //   c: 'c',
    //   startTime: '2022-01-01 00:00:00',
    //   endTime: '2022-02-01 00:00:00'
    // }
  ]
}, 1000)

const options = {
  columns: [
    {
      title: 'a',
      field: 'a'
    }
    // {
    //   title: 'b',
    //   field: 'b'
    // },
    // {
    //   title: 'c',
    //   field: 'c'
    // }
  ]
}
</script>

<style scoped></style>
