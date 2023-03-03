<template>
  <div class="m-20px">
    <Gantt :option="options" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { Gantt } from '@shy-plugins/gantt'

const data = [
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  },
  {
    a: 'a',
    b: 'b',
    c: 'c',
    startTime: '2022-01-01 00:00:00',
    endTime: '2022-02-01 00:00:00'
  }
]

const options = {
  columns: [
    {
      title: 'a',
      field: 'a'
    },
    {
      title: 'b',
      field: 'b'
    },
    {
      title: 'c',
      field: 'c'
    }
  ]
}
</script>

<style scoped></style>
