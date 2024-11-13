import { RouterLink } from 'vue-router'
import { get } from 'lodash-es'
import { ShyTable, BasicTitle, useShyTable } from '3h1-ui'
import { Collapse } from 'ant-design-vue'
import dayjs from 'dayjs'

export const infoSchemas = [
  {
    label: '基本信息',
    field: '',
    component: 'Group',
    componentProps: {
      groupType: 'Group',
      schemas: [
        {
          label: '采购合同编号',
          field: 'purchaseCode',
          colProps: { span: 12 }
        },
        {
          label: '类型',
          field: 'contractTypeMsg',
          colProps: { span: 12 }
        },
        {
          label: '关联项目编号',
          field: 'projectCode',

          colProps: { span: 12 }
        },
        {
          label: '关联项目名称',
          field: 'projectName',
          colProps: { span: 12 }
        },
        {
          label: '申请人',
          field: 'purchaseUserName',
          colProps: { span: 12 }
        },
        {
          label: '申请部门',
          field: 'deptName',
          colProps: { span: 12 }
        },
        {
          label: '供应商名称',
          field: 'supplyName',
          colProps: { span: 12 }
        },
        {
          label: '供应商联系人',
          field: 'supplyContactsNameContent',
          colProps: { span: 12 }
        },
        {
          label: '付款方式',
          field: 'paymentType',
          colProps: { span: 24 }
        },
        {
          label: '备注',
          field: 'remark',
          colProps: { span: 24 }
        }
      ]
    },
    colProps: { span: 24 }
  },
  {
    label: '财务信息',
    field: '',
    component: 'Group',
    componentProps: {
      groupType: 'Group',
      schemas: [
        {
          label: '合同总金额',
          field: 'purchaseAmount',
          colProps: { span: 24 }
        }
      ]
    },
    colProps: { span: 24 }
  },
  {
    label: '明细信息',
    field: '',
    component: 'Group',
    componentProps: {
      groupType: 'Group',
      schemas: [
        {
          label: '',
          field: 'productList',

          colProps: { span: 24 }
        }
      ]
    },
    colProps: { span: 24 }
  },
  {
    label: '出入库记录',
    field: '',
    component: 'Group',
    componentProps: {
      groupType: 'Group',
      schemas: [
        {
          label: '',
          field: 'stockTicketList',
          colProps: { span: 24 }
        }
      ]
    },
    colProps: { span: 24 }
  },
  {
    label: '合同附件',
    field: '',
    component: 'Group',
    componentProps: {
      groupType: 'Group',
      schemas: [
        {
          label: '',
          field: 'fileIds',
          colProps: { span: 24 }
        }
      ]
    },
    colProps: { span: 24 }
  }
]
