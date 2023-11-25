<template>
  <div class="m-4">
    <Button @click="handleGetForm">获取form</Button>
    <BasicForm
      :labelWidth="100"
      @register="registerForm"
      :actionColOptions="{ span: 24 }"
      @submit="handleSubmit"
    >
      <template #ApiModalSelect="{ model, field }">
        <ApiModalSelect
          v-model:value="model[field]"
          :fieldNames="{ label: 'a', value: 'id' }"
          @modal-confirm="handleModalChange"
        />
      </template>
    </BasicForm>

    <a-range-picker :value="timeRange" />
  </div>
</template>
<script lang="ts" setup>
import {
  BasicForm,
  FormSchema,
  useForm,
  TableChildren,
  ApiModalSelect
} from '3h1-ui'
import { Button } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'
import { onMounted } from 'vue'
import { ref } from 'vue'
import dayjs from 'dayjs'

const a = ref('')
const timeRange = [dayjs(), dayjs()]

const tree = {
  api: () => {
    return new Promise((resolve) =>
      resolve([{ label: '1', value: '1', children: [] }])
    )
  }
}

const schemas: FormSchema[] = [
  {
    field: 'type',
    label: '类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '资源', value: 1 },
        { label: '菜单', value: 2 }
      ],
      onChange: (e: any) => {
        console.log('888888', e)
      }
    }
  },

  {
    label: 'a',
    field: 'a',
    component: 'Input'
  },
  {
    label: 'b',
    field: 'b',
    component: 'Input'
  },

  {
    field: 'startDate',
    label: '日期范围',
    component: 'RangePicker',
    defaultValue: ['1996/10-10', '2023-11-10'],
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始日期', '结束日期']
    }
  }

  // {
  //   field: 'field',
  //   component: 'Input',
  //   label: '字段1',
  //   colProps: {
  //     span: 8
  //   },
  //   defaultValue: '1',

  //   componentProps: {
  //     placeholder: '自定义placeholder',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //     onInput: (e) => {
  //       console.log(1)
  //     }
  //   }
  // },
  // {
  //   field: 'ApiSelect',
  //   label: 'ApiSelect',
  //   component: 'ApiSelect',
  //   colProps: { span: 8 },
  //   componentProps: {
  //     api: () =>
  //       new Promise((resolve) =>
  //         resolve([
  //           { label: 'a', value: '1' },
  //           { label: 'b', value: '2' },
  //           { label: 'c', value: '3' },
  //           { label: 'd', value: '4' },
  //           { label: 'e', value: '5' },
  //           { label: '中文', value: '6' },
  //           { label: '英文', value: '7' },
  //           { label: '德文', value: '8' }
  //         ])
  //       )
  //   }
  // },
  // {
  //   field: 'ApiSelectFieldNames',
  //   label: 'ApiSelectFieldNames',
  //   component: 'ApiSelect',
  //   colProps: { span: 8 },
  //   componentProps: {
  //     api: () =>
  //       new Promise((resolve) =>
  //         resolve([
  //           { name: 'a', id: '1' },
  //           { name: 'b', id: '2' },
  //           { name: 'c', id: '3' },
  //           { name: 'd', id: '4' },
  //           { name: 'e', id: '5' },
  //           { name: '中文', id: '6' },
  //           { name: '英文', id: '7' },
  //           { name: '德文', id: '8' }
  //         ])
  //       ),
  //     fieldNames: { label: 'name', value: 'id' }
  //   }
  // },
  // {
  //   field: 'select',
  //   label: 'select',
  //   component: 'Select',
  //   colProps: { span: 8 },
  //   componentProps: {
  //     options: [
  //       { name: 'a', id: '1' },
  //       { name: 'b', id: '2' },
  //       { name: 'c', id: '3' },
  //       { name: 'd', id: '4' },
  //       { name: 'e', id: '5' },
  //       { name: '中文', id: '6' },
  //       { name: '英文', id: '7' },
  //       { name: '德文', id: '8' }
  //     ],
  //     fieldNames: { label: 'name', value: 'id' }
  //   }
  // },
  // {
  //   field: 'selectFieldsNames',
  //   label: 'selectFieldsNames',
  //   component: 'Select',
  //   colProps: { span: 8 },
  //   componentProps: {
  //     options: [
  //       { label: 'a', value: '1' },
  //       { label: 'b', value: '2' },
  //       { label: 'c', value: '3' },
  //       { label: 'd', value: '4' },
  //       { label: 'e', value: '5' },
  //       { label: '中文', value: '6' },
  //       { label: '英文', value: '7' },
  //       { label: '德文', value: '8' }
  //     ]
  //   }
  // },
  // {
  //   field: 'ApiTreeSelect',
  //   label: 'ApiTreeSelect',
  //   component: 'ApiTreeSelect',
  //   colProps: { span: 8 },
  //   componentProps: {
  //     api: () =>
  //       new Promise((resolve) =>
  //         resolve([
  //           {
  //             name: 'a',
  //             id: '1',
  //             children: [
  //               { name: 'b', id: '2' },
  //               { name: 'c', id: '3' }
  //             ]
  //           },
  //
  //           {
  //             name: 'd',
  //             id: '4',
  //             children: [
  //               { name: '中文', id: '6' },
  //               { name: '英文', id: '7' },
  //               { name: '德文', id: '8' }
  //             ]
  //           },
  //           { name: 'e', id: '5' }
  //         ])
  //       ),
  //     fieldNames: { label: 'name', value: 'id' }
  //   }
  // },
  //
  // {
  //   field: 'table',
  //   label: 'table',
  //   component: 'Table',
  //   componentProps: {
  //     columns: [
  //       {
  //         title: 'a',
  //         dataIndex: 'a'
  //       },
  //       {
  //         title: 'b',
  //         dataIndex: 'b'
  //       },
  //       {
  //         title: 'c',
  //         dataIndex: 'c'
  //       },
  //       {
  //         title: 'd',
  //         dataIndex: 'd'
  //       },
  //       {
  //         title: 'e',
  //         dataIndex: 'e'
  //       }
  //     ]
  //   }
  // }
  // {
  //   field: 'z',
  //   label: 'Divider',
  //   component: 'Divider',
  //   colProps: { span: 24 }
  // },
  // {
  //   field: 'c',
  //   label: '选择弹框',
  //   component: 'Input',
  //   slot: 'ApiModalSelect',
  //   componentProps: {
  //     autoLink: false
  //   },
  //   required: true
  // }
]
const { createMessage } = useMessage()
const [
  registerForm,
  { setFieldsValue, getFieldsValue, validate, updateSchema }
] = useForm({
  schemas
})

onMounted(() => {
  setFieldsValue({
    field: 123,
    table: [{ a: 1, b: 2, c: 3 }],
    c: '123'
  })
})

const data = ref([])
const columns = [
  {
    title: 'a',
    dataIndex: 'a'
  },
  {
    title: 'b',
    dataIndex: 'b'
  },
  {
    title: 'c',
    dataIndex: 'c'
  },
  {
    title: 'd',
    dataIndex: 'd'
  },
  {
    title: 'e',
    dataIndex: 'e'
  }
]

const change = () => {
  updateSchema([
    {
      field: 'a',
      defaultValue: '111',
      component: 'Select',
      componentProps: {
        disabled: true
      }
    },
    {
      field: 'b',
      defaultValue: '222',
      component: 'Select'
    }
  ])
}

const handleSubmit = (values: any) => {
  createMessage.success('click search,values:' + JSON.stringify(values))
}

const handleGetForm = async () => {
  const values = await validate()

  // console.log('values', values)
}

const handleModalChange = (rows) => {
  console.log('rows', rows)
}
</script>
