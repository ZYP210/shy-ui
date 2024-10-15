<template>
  <div class="p-16px">
    <ShyDescriptions size="middle" title="基础示例" @register="register">
    </ShyDescriptions>
  </div>
</template>
<script lang="ts" setup>
import { ShyDescriptions, useShyDescriptions } from '3h1-ui'
import BasicTitle from './BasicTitle.vue'

import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { colProps } from 'ant-design-vue/es/grid/Col'
const mockData: any = {
  username: 'test',
  summary: '1111',
  summary1: 888888,
  age: 123,
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '1',
  sex: '男',
  certy: '2',
  tag: 'orange'
}

const schemas = [
  {
    field: 'zzz',
    label: 'zzz',
    component: 'Custom',
    componentProps: {
      CustomGroupComp: BasicTitle,
      schemas: [
        {
          field: 'zzz1',
          label: 'zzz1',
          colProps: {
            span: 12
          }
        },
        {
          field: 'zzz2',
          label: 'zzz2',
          colProps: {
            span: 12
          }
        }
      ]
    }
  },
  {
    field: 'username',
    label: '用户名',
    colProps: {
      span: 3
    },
    componentProps: {
      options: [
        { label: '男', value: 'test' },
        { label: '女', value: '女' }
      ]
    }
  },
  {
    field: 'username',
    label: '用户名zzz',
    colProps: {
      span: 21
    },
    componentProps: {
      options: [
        { label: '男', value: 'test' },
        { label: '女', value: '女' }
      ]
    }
  },

  {
    field: 'summary',
    label: '摘要',
    component: 'Divider',
    render: (value: any) => h(Tag, { color: 'green' }, { default: () => value })
  },
  {
    field: 'summary1',
    label: '摘要1',
    component: 'Group',
    componentProps: {
      schemas: [
        {
          field: 'summary1',
          label: '摘要1',
          component: 'Group',
          componentProps: {
            schemas: [
              {
                field: 'sunlei',
                label: '摘要555',
                colProps: {
                  span: 24
                },
                customRender: (value: any) =>
                  h(Tag, { color: 'green' }, { default: () => '434343' })
              }
            ]
          }
        },
        {
          field: 'summary2',
          label: '摘要2',
          colProps: {
            span: 24
          },
          render: (value: any) =>
            h(Tag, { color: 'green' }, { default: () => value })
        }
      ]
    }
  },
  {
    field: 'age',
    label: '年龄',
    colProps: {
      span: 4
    },
    render: (value: any) =>
      h(Tag, { color: 'orange' }, { default: () => value })
  },
  {
    field: 'phone',
    label: '电话',
    colProps: {
      span: 4
    },
    render: (value: any) => h(Tag, { color: 'cyan' }, { default: () => value })
  },
  {
    field: 'email',
    label: '邮箱',
    colProps: {
      span: 16
    },
    render: (value: any) =>
      h(Tag, { color: 'magenta' }, { default: () => value })
  },
  {
    field: 'addr',
    label: '地址',
    colProps: {
      span: 24
    },
    render: (value: any) =>
      h(Tag, { color: 'volcano' }, { default: () => value })
  },
  {
    field: 'addr',
    label: '地址111',
    colProps: {
      span: 24
    },
    render: (value: any) =>
      h(Tag, { color: 'volcano' }, { default: () => value })
  }
]

const [register] = useShyDescriptions({
  data: mockData,
  schemas,
  labelWidth: 100,
  bordered: false
})
onMounted(() => {
  // setDescProps({ data: mockData, labelWidth: 110 })
})
</script>
