<template>
  <div class="w-full h-full flex flex-col p-16px overflow-hidden">
    <!-- <div class="flex-1 overflow-hidden"> -->
      <ShyTable @register="register" @selection-change="handleSelectChange">
        <!-- <template #toolbar="data">
          <ShyTableAction type="button" :actions="getHeaderActions(data)" />
          <BasicButton type="primary"> 主要 </BasicButton>
          <BasicButton type="danger" @click="pushApi">危险</BasicButton>
          <BasicButton type="success" @click="pushApi">完成</BasicButton>
          <BasicButton type="waring" @click="pushApi">警告</BasicButton>
          <BasicButton type="message" @click="pushApi">信息</BasicButton>
          <BasicButton> 默认 </BasicButton>
        </template> -->

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
                  // ifShow: false,
                  onClick: handleEdit.bind(null, record)
                },
                {
                  label: '智能',
                  // ifShow: false,
                  popConfirm: {
                    title: '确认保存?',
                    confirm: handleSave.bind(null, record)
                  }
                },
                {
                  label: '测试',
                  // ifShow: false,
                  onClick: handleSave.bind(null, record)
                },
                {
                  label: '删除',
                  popConfirm: {
                    title: '确认删除吗?',
                    confirm: handleRemove.bind(null, record)
                  }
                }
              ]"
            />
          </template>
        </template>

        <template #footer="data">
          <ShyTableAction type="button" :actions="getFooterActions(data)" />
        </template>
      </ShyTable>
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
import {
  ShyTable,
  useShyTable,
  ShyTableAction,
  BasicButton,
  ActionItem
} from '3h1-ui'
import { useMessage } from '@shy-plugins/use'
import { cloneDeep } from 'lodash-es'
const { createMessage, createConfirm } = useMessage()
import { ref, onMounted, h } from 'vue'
// const schemas = [
//   { label: 'a', field: 'a', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'b', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'c', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'd', component: 'Input', colProps: { span: 8 } }
// ]

// const zzz = useRender()

// console.log(zzz)

const columns: any[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    // align: 'left',
    // align: 'center',
    // width: 120,
    tag: true,
    tagMode: 'tag',
    options: [
      {
        label: '信息',
        value: '0',
        colorType: 'var(--gray-5)'
      },
      {
        label: '完成',
        value: '1',
        colorType: 'var(--primary-5)'
      },
      {
        label: '警告',
        value: '2',
        colorType: 'var(--orange-5)'
      },
      {
        label: '等待',
        value: '3',
        colorType: 'var(--blue-5)'
      },
      {
        label: '危险',
        value: '4',
        colorType: 'var(--red-5)'
      }
    ]
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
    // width: 1120,
    tag: true,
    // tagMode: 'tag',
    options: [
      {
        label: '信息',
        value: '0',
        colorType: 'var(--gray-5)'
      },
      {
        label: '完成',
        value: '1',
        colorType: 'var(--primary-5)'
      },
      {
        label: '警告',
        value: '2',
        colorType: 'var(--orange-5)'
      },
      {
        label: '等待',
        value: '3',
        colorType: 'var(--blue-5)'
      },
      {
        label: '危险',
        value: '4',
        colorType: 'var(--red-5)'
      }
    ]
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
    // width: 120,
    tag: true,
    tagMode: 'text',
    options: [
      {
        label: '信息',
        value: '0',
        colorType: 'var(--gray-5)'
      },
      {
        label: '完成',
        value: '1',
        colorType: 'var(--primary-5)'
      },
      {
        label: '警告',
        value: '2',
        colorType: 'var(--orange-5)'
      },
      {
        label: '等待',
        value: '3',
        colorType: 'var(--blue-5)'
      },
      {
        label: '危险',
        value: '4',
        colorType: 'var(--red-5)'
      }
    ]
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
    // width: 1120,
    // fixed: 'right',
    options: [
      {
        label: '信息',
        value: '0',
        colorType: 'var(--gray-5)'
      },
      {
        label: '完成',
        value: '1',
        colorType: 'var(--primary-5)'
      },
      {
        label:
          'jdlksajdlkasjdklsajklasjaslkdjsakldjsalkdjaskldasjdaskljdaslkdjaslkjdalksjdlksajdklsadjaslkdjsalkdjoiuewoiwugchsadkjhadkysoiduwoiudhajdhaskjdhasiudhw9iuqhd',
        value: '2',
        colorType: 'var(--orange-5)'
      },
      {
        label: '等待',
        value: '3',
        colorType: 'var(--blue-5)'
      },
      {
        label: '危险',
        value: '4',
        colorType: 'var(--red-5)'
      }
    ]
  },
  // {
  //   title: '数',
  //   dataIndex: 'qualifiedNum'
  // },
  {
    title: '收票时间',
    dataIndex: 'qualifiedNum'
    // customRender: ({ record }) => renderDate(record.receiptTime),
  },
  {
    title: '收票金额',
    dataIndex: 'amountPriceTaxSum'
  },
  {
    title: '创建人',
    dataIndex: 'creatorName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
    // customRender: ({ record }) => renderDate(record.createTime),
  }
]

const searchFormSchema = Array.from({ length: 1 }, (_, i) => {
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
    }
  }
})

const getHeaderActions = ({ rows, rowKeys, disabled }): ActionItem[] => {
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

const getFooterActions = ({ rows, rowKeys, disabled }): ActionItem[] => {
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

const length = ref(10)

const amount = ref(Math.random())
const infoData = computed(() => {
  return {
    amount: amount.value
  }
})

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
  api: (params): any => {
    const records = Array.from({ length: length.value }, (_, i) => {
      return {
        id: i,
        status: i,
        rangePlace: i,
        qualifiedNum: 777777,
        place: '河北',
        createTime: 1695024076000,
        name: i,
        phone: '1212121',
        address: '1111',
        remark: 999
      }
    })

    return {
      records,
      total: records.length
    }
  },
  // isShowFooterSettings: false,
  // isShowHeader: false,
  // isShowFooter: false,
  // headerAlign: 'left',
  onColumnsChange: (data) => {
    console.log(data)
  },
  onColumnsReset: () => {
    console.log('columns-reset')
  },
  // useInfo: true,
  infoConfig: {
    schemas: [
      {
        label: '金额',
        field: 'amount'
      }
    ],
    infoData
  },
  tableSetting: {
    // advancedSearch: true,
    showMore: true
  },
  // summaryPrecision: 0,
  resizable: true,
  // rowKey: 'id',
  // rowSelection: {
  //   type: 'checkbox'
  // },
  columns,
  // isShowPagination: false,
  isSortFetch: false,
  useSearchForm: true,
  // formLabelInInput: false,
  formConfig: {
    labelWidth: 60,
    schemas: [
      {
        label: '日期范围',
        component: 'RangePicker',
        field: 'createTime'
      },
      {
        label: '日期范围',
        component: 'RangePicker',

        field: 'createTime'
      },
      {
        label: '日期范围',
        component: 'RangePicker',
        field: 'createTime'
      },
      {
        label: '输入框',
        component: 'Input',
        componentProps: {
          placeholder: ''
        },
        field: 'createTime'
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime'
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime'
      },
      {
        label: '日期范围',
        component: 'RangePicker',
        field: 'createTime'
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime'
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime'
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime'
      },
      {
        label: '输入框',
        component: 'Input',
        field: 'createTime'
      }
    ]
  },
  // showSummaryTotal: true,
  summaryTotalFields: ['qualifiedNum'],
  showTableSetting: true,
  // useAdvancedSearch: true,
  // summaryPrecision: 2,
  // useAdvancedSearch: true,
  // clickToRowSelect: true,
  // useSearchForm: true,
  // canResize: false,
  // actionColumn: {
  //   dataIndex: 'action',
  //   title: '操作',
  //   width: 200
  // },
  showIndexColumn: true,
  // canResize: false
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

const handleRemove = () => {
  --length.value
  reload()
}

onMounted(() => {
  const form = getForm()
  setTimeout(() => {
    form.setFieldsValue({
      demo0: '123'
    })
  }, 1000)

  setInterval(() => {
    amount.value = Math.random()
  }, 1000)
})
</script>

<style scoped>
.p4 {
  /* height: 100%; */
  background-color: #f0f0f0;
}
</style>
