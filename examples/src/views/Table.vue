<template>
  <div class="flex flex-col">
    <div class="flex-auto p-10px">
      <BasicTable
        title="基础示例"
        titleHelpMessage="温馨提醒"
        @register="register"
        @selection-change="handleSelectChange"
      >
        <template #toolbar>
          <a-button type="primary"> 操作按钮 </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <TableAction
              :actions="[
                {
                  label: '编辑',
                  onClick: handleEdit.bind(null, record)
                },
                {
                  label: '保存',
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
      </BasicTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reject } from 'lodash-es'
import { BasicTable, useTable, TableAction } from '3h1-ui'
import { useMessage } from '@shy-plugins/use'
import { cloneDeep } from 'lodash-es'
const { createMessage } = useMessage()

// const schemas = [
//   { label: 'a', field: 'a', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'b', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'c', component: 'Input', colProps: { span: 8 } },
//   { label: 'a', field: 'd', component: 'Input', colProps: { span: 8 } }
// ]
const columns = [
  {
    title: '产地范围',
    dataIndex: 'rangePlace',
    editRow: true,
    editComponent: 'Select',
    editComponentProps: {
      options: [
        { label: 1, value: 2 },
        { label: 2, value: 3 }
      ],
      getPopupContainer: () => document.body
    }
  },
  {
    title: '产地',
    editRow: true,
    dataIndex: 'place',
    editComponent: 'Input',
    customRender: ({ record }) => {
      return record
    }
  },

  {
    title: '创建/更新时间',
    dataIndex: 'createTime',
    editRow: true,
    customRender: ({ text }) => {
      return text
    }
  },
  {
    title: '厂家名称',
    dataIndex: 'name',
    editRow: true,
    editRule: true
  },
  {
    title: '电话',
    dataIndex: 'phone',
    editRow: true,
    editRule: (text) => {
      return new Promise((resolve) => {
        if (!text) resolve('错误')
        else resolve('')
      })
    }
  },
  {
    title: '地址',
    dataIndex: 'address',
    editRow: true
  },
  {
    title: '备注',
    editRow: true,
    dataIndex: 'remark'
  }
]
const [
  register,
  {
    reload,
    setProps,
    getDataSource,
    setTableData /*getSelectRows, clearSelectedRowKeys*/
  }
] = useTable({
  api: () => {
    return new Promise((reject) => {
      reject([
        {
          id: '1704062192584458242',
          status: 0,
          rangePlace: '国产',
          place: '上海',
          createTime: 1695115061000,
          name: 'zzz',
          address: '1111',
          remark: '999'
        },
        {
          id: '1703938810197053441',
          status: 0,
          rangePlace: '国产',
          place: '衡水',
          createTime: 1695085645000,
          name: 'zzz',
          phone: '1212121',
          address: '1111',
          remark: '999'
        },
        {
          id: '1703680571205570561',
          status: 0,
          rangePlace: '国产',
          place: '河北',
          createTime: 1695024076000,
          name: 'zzz',
          phone: '1212121',
          address: '1111',
          remark: '999'
        },
        {
          id: '1703680511969415170',
          status: 0,
          rangePlace: '国产',
          place: '重庆',
          createTime: 1695024062000,
          name: 'zzz',
          phone: '1212121',
          address: '1111',
          remark: '999'
        },
        {
          id: '1703667719287689218',
          status: 0,
          rangePlace: '进口',
          place: '新西兰',
          createTime: 1695021012000,
          name: 'zzz',
          phone: '1212121',
          address: '1111',
          remark: '999'
        }
      ])
    })
  },
  rowKey: 'id',
  columns,
  pagination: { pageSize: 1 },
  rowSelection: { type: 'checkbox' },
  clickToRowSelect: false,
  useSearchForm: true,
  actionColumn: {
    width: 150,
    dataIndex: 'action'
  }
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
</script>

<style scoped>
.p4 {
  /* height: 100%; */
  background-color: #f0f0f0;
}
</style>
