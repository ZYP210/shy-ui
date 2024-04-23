<template>
  <div class="w-full h-full flex flex-col p-16px">
    <ShyTable
      titleHelpMessage="温馨提醒"
      @register="register"
      @selection-change="handleSelectChange"
    >
      <template #toolbar>
        <Button type="primary"> 主要 </Button>
        <BasicButton type="danger" @click="pushApi">危险</BasicButton>
        <BasicButton type="success" @click="pushApi">完成</BasicButton>
        <BasicButton type="waring" @click="pushApi">警告</BasicButton>
        <BasicButton type="message" @click="pushApi">信息</BasicButton>
        <Button> 默认 </Button>
      </template>

      <template #headerCell="{ column }">
        <div v-if="column.flag === 'INDEX'">111</div>
        <div v-else>{{ column.customTitle }}</div>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <ShyTableAction
            :actions="[
              {
                label: '编辑',
                // disabled: true,
                onClick: handleEdit.bind(null, record)
              },
              {
                label: '保存',
                onClick: handleSave.bind(null, record)
              },
              {
                label: '测试',
                onClick: handleSave.bind(null, record)
              },
              {
                label: '取消',
                popConfirm: {
                  title: '是否取消编辑',
                  confirm: handleCancel.bind(null, record)
                }
              }
            ]"
          />
        </template>
      </template>

      <template #footer="data">
        <ShyTableAction type="footer" :actions="getFooterActions(data)" />
      </template>
    </ShyTable>
  </div>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { ShyTable, useShyTable, ShyTableAction, BasicButton } from '3h1-ui'
import { useMessage } from '@shy-plugins/use'
import { cloneDeep } from 'lodash-es'
const { createMessage, createConfirm } = useMessage()
import { ref, onMounted } from 'vue'
// const schemas = [
//   { label: 'a', field: 'a', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'b', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'c', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'd', component: 'Input', colProps: { span: 8 } }
// ]

// const zzz = useRender()

// console.log(zzz)

const columns: any[] = [
  // {
  //   title: '产地范围',
  //   dataIndex: 'rangePlace',
  //   editRow: true,
  //   editable: true,
  //   editComponent: 'ApiSelect',
  //   editRule: true,
  //   editComponentProps: (params) => {
  //     // console.log('params', params)
  //     return {
  //       params: { type: 1 },
  //       api: (params) => {
  //         // console.log(params)
  //         return new Promise((resolve) => {
  //           setTimeout(() => {
  //             resolve([
  //               { label: 'a', value: 'a' },
  //               { label: 'b', value: 'b' }
  //             ])
  //           }, 3000)
  //         })
  //       }
  //     }
  //     // getPopupContainer: () => document.body
  //   },
  //   sorter: () => {},
  //   globalShow: false
  // },
  {
    title: '合格数',
    dataIndex: 'qualifiedNum',
    // width: 200,

    editComponent: 'InputNumber',
    editComponentProps({ record, tableAction }) {
      return {
        max: 5,
        precision: 0,
        onChange: (val) => {
          if (typeof val === 'number') {
            // console.log('222')
          }
        }
      }
    },
    editable: false,
    edit: false,
    editRule: true,
    globalShow: false
  },
  {
    title: '创建/更新时间',
    dataIndex: 'createTime',
    editRow: true,
    editRule: true,
    customRender: ({ text }) => {
      return text
    },
    globalShow: false
  },
  {
    title: '厂家名称',
    dataIndex: 'name',
    editRow: true,
    globalShow: false,
    resizable: true
  },
  {
    title: '电话',
    dataIndex: 'phone',
    component: 'Select',
    componentProps: {
      options: Array.from({ length: 100 }, (_, i) => {
        return { label: i, value: i }
      })
    },
    editRow: true,
    globalShow: false
  },
  {
    title: '地址',
    dataIndex: 'address',
    editRow: true,
    globalShow: false
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },

  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  },

  {
    title: '产地',
    // editRow: true,
    dataIndex: 'place'

    // editComponent: 'InputNumber',
    // editRule: true,
  }
]

const searchFormSchema = Array.from({ length: 20 }, (_, i) => {
  return {
    label: `demo${i}`,
    field: `demo${i}`,
    component: 'Input',
    componentProps: ({ ...ages }) => {
      return {
        onModelChange: (e) => {
          console.log(e, ages)
        }
      }
    },
    colProps: { span: 6 }
  }
})

const getFooterActions = ({ rows, rowKeys, disabled }) => {
  return [
    {
      tooltip: '777',
      label: '删除',
      type: 'danger',
      disabled
    },
    {
      label: '导出',
      type: 'default',
      disabled
    },
    {
      label: '测试',
      disabled
    },
    {
      label: '取消',
      disabled
    }
  ]
}

const [
  register,
  {
    reload,
    setProps,
    getDataSource,
    setTableData /*getSelectRows, clearSelectedRowKeys*/,
    getForm
  }
] = useShyTable({
  // isShowTitle: false,
  api: ({ current, size }): any => {
    // console.log(params)
    return {
      records: Array.from({ length: 1 }, (_, i) => {
        return {
          id: i,
          status: i,
          rangePlace: i,
          place: '河北',
          createTime: 1695024076000,
          name: 'zzz',
          phone: '1212121',
          address: '1111',
          remark: 999,
          qualifiedNum: 100000.11111111
        }
      }),
      total: 100
    }
  },
  // isShowFooterSettings: false,
  // isShowHeader: false,
  // isShowFooter: false,
  // headerAlign: 'left',
  rowKey: 'id',
  columns,
  // isShowPagination: false,
  isSortFetch: false,
  useSearchForm: true,
  formConfig: {
    schemas: [
      {
        label: '日期范围',
        component: 'RangePicker',
        field: 'createTime',
        colProps: { span: 6 }
      },
      {
        label: '日期范围',
        component: 'RangePicker',

        field: 'createTime',
        colProps: { span: 6 }
      },
      {
        label: '日期范围',
        component: 'RangePicker',
        field: 'createTime',
        colProps: { span: 6 }
      },
      {
        label: '输入框',
        component: 'Input',
        componentProps: {
          placeholder: ''
        },
        field: 'createTime',
        colProps: { span: 4 }
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime',
        colProps: { span: 4 }
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime',
        colProps: { span: 4 }
      },
      {
        label: '日期范围',
        component: 'RangePicker',
        field: 'createTime',
        colProps: { span: 6 }
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime',
        colProps: { span: 4 }
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime',
        colProps: { span: 4 }
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime',
        colProps: { span: 4 }
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime',
        colProps: { span: 4 }
      },
    ]
  },
  resizable: true,
  showSummaryTotal: true,
  summaryTotalFields: ['qualifiedNum'],
  showTableSetting: true,
  // useAdvancedSearch: true,
  rowSelection: {},
  clickToRowSelect: false,
  // useSearchForm: true,
  // canResize: false,
  actionColumn: {
    dataIndex: 'action',
    title: '操作',
    fixed: 'right'
  },
  showIndexColumn: true,
  // canResize: false,
  // indexColumn: {}
})

function handleSelectChange({ rows }) {}

const currentEditKeyRef = ref('')

//保存&修改
async function handleSave(record) {
  const valid = await record.onValid?.()
  if (!valid) {
    createMessage.error('填写必填内容')
    return
  }
  try {
    const data = cloneDeep(record.editValueRefs)
    console.log('data', data)

    if (record.id.toString().indexOf('noSave') !== -1) {
      // await saveApi([data])
    } else {
      // await updateApi({ ...data, id: record.id })
    }
    const pass = await record.onEdit?.(false, true)
    if (pass) {
      currentEditKeyRef.value = ''
    }
    createMessage.success('数据已保存')
    reload()
  } catch (error) {
    createMessage.error('保存失败')
  }
}
function handleEdit(record) {
  currentEditKeyRef.value = record.key
  record.onEdit?.(true)
}
function handleCancel(record) {
  currentEditKeyRef.value = ''
  record.onEdit?.(false, false)
  if (record.id.toString().indexOf('noSave') == -1) return
  getDataSource().shift()
}
const pushApi = async () => {
  createMessage.warn('数据已保存')
  createConfirm({
    title: 111,
    iconType: 'error'
  })
  // const pass = await Promise.all(
  //   getDataSource().map(async (item) => {
  //     return await item.onValid()
  //   })
  // )
}

onMounted(() => {
  const form = getForm()
  setTimeout(() => {
    form.setFieldsValue({
      demo0: '123'
    })
  }, 1000)
})
</script>

<style scoped>
.p4 {
  /* height: 100%; */
  background-color: #f0f0f0;
}
</style>
