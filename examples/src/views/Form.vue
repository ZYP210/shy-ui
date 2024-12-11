<template>
  <div class="p-16px w-full overflow-auto">
    <div class="flex gap-8px">
      <Button @click="handleGetForm">获取form</Button>
      <!-- <Button @click="handlePush">push200条数据</Button> -->
      <Button @click="handleReset">reset</Button>
    </div>
    <ShyForm :labelWidth="100" @register="registerForm" @submit="handleSubmit" @zzz="handleCustomFn">
      <template #ApiModalSelect="{ model, field }">
        <ShyApiModalSelect v-model:value="model[field]" :fieldNames="{ label: 'a', value: 'id' }"
          @modal-confirm="handleModalChange" />
      </template>
    </ShyForm>
    <!-- <div class="h-2000px"></div> -->
  </div>
</template>
<script lang="tsx" setup>
import type { ShyFormSchema } from '3h1-ui'
import {
  useShyForm,
  ShyApiModalSelect,
  ShyForm,
  ShyTable,
  BasicButton
} from '3h1-ui'
import { Button, Select } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'
import { h, onMounted } from 'vue'
import { ref } from 'vue'
import { theme } from 'ant-design-vue'
import BasicTitle from './BasicTitle.vue'
import { commentProps } from 'ant-design-vue/es/comment'
import customComp from '../components/customComp'

const { useToken } = theme
const { token } = useToken()

const handleCustomFn = (...args) => {
  // console.log(args)
}

// const handlePush = () => {
//   setFieldsValue({
//     faultDate: '2021-09-01',
//     // zzz: {
//     //   Table: Array.from({ length: 1 }, (_, i) => {
//     //     return {
//     //       a: 1,
//     //       b: 2,

//     //       c: 4,
//     //       d: ''
//     //     }
//     //   })
//     // },
//     Table: Array.from({ length: 1 }, (_, i) => {
//       return {
//         a: 1,
//         b: 2,

//         c: 4,
//         d: ''
//       }
//     })
//   })
// }
const bindCol = [
  {
    title: '产品编号',
    dataIndex: 'productCode',
    width: 100,
    type: 'text'
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    width: 100,
    type: 'text'
  },

  {
    title: '单位',
    dataIndex: 'unitName',
    width: 50,
    type: 'text'
  },
  {
    title: '金额',
    dataIndex: 'price',
    width: 100,
    type: 'text'
  },
  {
    title: '数量',
    dataIndex: 'storageNum',
    width: 60,
    type: 'text'
  },
  {
    title: '单价',
    dataIndex: 'unitPrice',
    width: 100,
    type: 'text'
  },
  {
    title: '规格型号',
    dataIndex: 'modelType',
    width: 100,
    type: 'text'
  }
]

const schemas = ref<ShyFormSchema[]>([
  {
    field: 'sss',
    label: 'sss',
    component: 'Select',
    componentProps: {
      slots: {
        default: () => {
          return <Select.Option value={2}>sss</Select.Option>
        }
      },

    }
  }

])
const { createMessage } = useMessage()
const [
  registerForm,
  { setFieldsValue, getFieldsValue, validate, updateSchema, resetFields }
] = useShyForm({
  labelWidth: 200,
  schemas: schemas as any,
  // formLabelInInput: true,
  layout: 'vertical',
  baseColProps: { span: 8 },
  onFieldValueChange: (field, value) => {
    // console.log('field', field, value)
  }
  // showActionButtonGroup: true
})

const handleReset = () => {
  resetFields()
}

onMounted(() => {
  setFieldsValue({
    xzz: {
      date: '2024-11-14T01:51:36.695Z',
      xzz: {
        text: '💥💥 重要提醒 💥💥\n今晚对禾管家二期系统进行升级，当前版本为V2.0.9,更新内容如下：'
      },
      zzz: {
        title: '新增功能🌟',
        zzz: {
          text: '入库管理：在带入库单模块中添加直发功能'
        }
      }
    }
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
