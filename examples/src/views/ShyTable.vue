<template>
  <div class="w-full h-full flex flex-col p-16px overflow-hidden">
    <div class="flex-1 overflow-hidden">
      <ShyTable @register="register" @selection-change="handleSelectChange">
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
                  // ifShow: false,
                  onClick: handleEdit.bind(null, record)
                },
                {
                  label: '保存',
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
          <ShyTableAction type="footer" :actions="getFooterActions(data)" />
        </template>
      </ShyTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { ShyTable, useShyTable, ShyTableAction, BasicButton } from '3h1-ui'
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
    align: 'left',
    width: 120,
    tag: true,
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
    title: '图标',
    dataIndex: 'icon'
  },
  {
    title: '数',
    dataIndex: 'qualifiedNum',
    width: 1000
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: 160
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
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

const length = ref(21)

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
  isShowTitle: false,
  api: (params): any => {
    const records = Array.from({ length: length.value }, (_, i) => {
      return {
        id: i,
        status: i,
        rangePlace: i,
        place: '河北',
        createTime: 1695024076000,
        name: i,
        phone: '1212121',
        address: '1111',
        remark: 999,
        qualifiedNum: 122
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
  resizable: true,
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
      }
    ]
  },
  showSummaryTotal: true,
  summaryTotalFields: ['qualifiedNum'],
  showTableSetting: true,
  // summaryPrecision: 2,
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
  showIndexColumn: true
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
})
</script>

<style scoped>
.p4 {
  /* height: 100%; */
  background-color: #f0f0f0;
}
</style>
