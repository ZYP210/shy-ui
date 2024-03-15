<template>
  <div class="m-4">
    <Button @click="handleGetForm">获取form</Button>
    <Button @click="handleReset">reset</Button>
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
import { ref, h } from 'vue'
import dayjs from 'dayjs'
import { Select } from 'ant-design-vue'
const a = ref('')

const timeRange = [dayjs(), dayjs()]

const tree = {
  api: () => {
    return new Promise((resolve) =>
      resolve([{ label: '1', value: '1', children: [] }])
    )
  }
}

const schemas = ref<FormSchema[]>([
  { field: 'aa', label: '数字框', component: 'InputNumber' },
  // {
  //   field: 'type',
  //   label: '类型',
  //   component: 'ApiCascader',
  //   componentProps: {
  //     // initFetchParams: { zzz: 3 },
  //     params: { zzz: 1 },
  //     api: async (params) => {
  //       console.log(params)
  //       return [
  //         {
  //           label: 2,
  //           value: 3,
  //           children: [
  //             { label: 'zzz', value: 5, isLeaf: true },
  //             { label: 'zzz3333', value: 6, isLeaf: true }
  //           ]
  //         },
  //         {
  //           label: 4,
  //           value: 4
  //         }
  //       ]
  //     },
  //     isLeaf: (record) => {
  //       return record.isLeaf
  //     },
  //     onChange: (e, ...v) => {
  //       console.log('ApiCascader====>:', e, v)
  //     }
  //     // options: [
  //     //   { label: 1, value: 1, children: [{ label: 2, value: 2 }] },
  //     //   { label: 3, value: 3, isLeaf: false }
  //     // ]
  //     // onChange: (e: any) => {
  //     //   console.log('888888', e)
  //     // }
  //   }
  // },
  // {
  //   label: 'a',
  //   field: 'a',
  //   component: 'Input',
  //   componentProps: {
  //     onModelChange: (e) => {
  //       console.log('111', e)
  //     }
  //   }
  // },
  // {
  //   label: 'b',
  //   field: 'b',
  //   component: 'Input'
  // },
  // {
  //   label: 'c',
  //   field: 'c',
  //   required: true,
  //   component: 'ApiTransfer',
  //   defaultValue: ['0', '1'],
  //   componentProps: {
  //     api: () =>
  //       new Promise((resolve) =>
  //         resolve(
  //           Array.from({ length: 20 }, (_, i) => {
  //             return {
  //               key: i.toString(),
  //               title: `content${i + 1}`,
  //               description: `description of content${i + 1}`
  //             }
  //           })
  //         )
  //       )
  //   }
  // },
  {
    field: 'startDate',
    label: '日期范围',
    component: 'DatePicker',
    colProps: { span: 24 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true
    }
  },
  {
    field: '1111',
    label: '上传',
    component: 'Upload',
    colProps: { span: 24 },
    componentProps: {
      maxNumber: 2,
      api: async (params) => {
        console.log(params)
        return {
          status: 'success',
          data: {
            url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
          }
        }
      }
    }
  },
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
  //   field: 'test',
  //   label: 'test',
  //   component: 'ApiSelect',
  //   render: () => {
  //     return h(Select, {
  //       options: [{ label: 'a', value: '1' }],
  //       onChange: (...args) => {
  //         console.log(2222, args)
  //       }
  //     })
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
  //       ),
  //     immediate: true,
  //     onModelChange: (e) => {
  //       console.log('111', e)
  //     }
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
  {
    field: 'table',
    label: 'table',
    component: 'Table',
    required: true,
    colProps: { span: 24 },
    componentProps: ({ ...ages }) => {
      return {
        onModelChange: (e) => {
          // console.log(e, ages)
        },
        columns: [
          {
            title: 'a',
            dataIndex: 'a',
            required: true
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
      }
    }
  },
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
  // },
  {
    label: 'Tinymce',
    field: 'Tinymce',
    component: 'Tinymce'
  }
])
const { createMessage } = useMessage()
const [
  registerForm,
  { setFieldsValue, getFieldsValue, validate, updateSchema, resetFields }
] = useForm({
  schemas
})

const handleReset = () => {
  resetFields()
}

onMounted(() => {
  setFieldsValue({
    Tinymce: '123',
    startDate: new Date().getTime()
  })
  // setTimeout(() => {
  //   setFieldsValue({
  //     table: [{ a: 9, b: 10, c: 11 }],
  //     ApiSelect: '123'
  //   })
  // }, 5000)
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
    // {
    //   field: 'a',
    //   defaultValue: '111',
    //   component: 'Select',
    //   componentProps: {
    //     disabled: true
    //   }
    // },
    // {
    //   field: 'b',
    //   defaultValue: '222',
    //   component: 'Select'
    // }
  ])
}

const handleSubmit = (values: any) => {
  createMessage.success('click search,values:' + JSON.stringify(values))
}

const handleGetForm = async () => {
  try {
    const values = await validate()

    console.log('values', values)
  } catch (error) {
    console.log(error)
  }
}

const handleModalChange = (rows) => {
  console.log('rows', rows)
}
</script>
