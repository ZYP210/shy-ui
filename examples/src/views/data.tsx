import { RouterLink } from 'vue-router'
import { get } from 'lodash-es'
import { ShyTable, BasicTitle, useShyTable } from '3h1-ui'
import { Collapse } from 'ant-design-vue'
import dayjs from 'dayjs'
export const CollapseComp = defineComponent({
  inheritAttrs: false,
  props: {
    label: String
  },
  emits: ['expand'],
  setup(props, { slots, emit }) {
    const activeKey = ref(['1'])

    watch(
      () => activeKey.value,
      (val) => {
        emit('expand', !!val.length)
      }
    )

    console.log(slots)

    return () => (
      <Collapse
        class={`shy-basic-descriptions-group-collapse`}
        bordered={false}
        v-model:activeKey={activeKey.value}
      >
        <Collapse.Panel
          key="1"
          v-slots={{
            header: () => (
              <BasicTitle>
                {{
                  default: () => props.label,
                  extra: () => slots?.extra?.(emit)
                }}
              </BasicTitle>
            )
          }}
        >
          {slots?.default?.()}
        </Collapse.Panel>
      </Collapse>
    )
  }
})

export const record = ref<Recordable>({})

export const projectFn = ref(() => {})
export const infoSchemas = [
  {
    label: '',
    field: '',
    component: 'Group',
    componentProps: {
      label: '项目明细',
      groupType: 'Custom',
      CustomGroupComp: CollapseComp,
      slots: {
        extra: () => <span>222</span>
      },
      onExpand: (val) => {
        console.log(val)
      },
      schemas: [
        {
          label: '项目编号',
          field: 'projectCode',
          colProps: { span: 8 }
        },
        {
          label: '项目名称',
          field: 'projectName',
          colProps: { span: 8 }
        },
        {
          label: '项目类型',
          field: 'projectTypeMsg',
          colProps: { span: 8 }
        },
        {
          label: '项目经理',
          field: 'projectManageUserName',
          colProps: { span: 8 }
        },
        {
          label: '商务人员',
          field: 'businessLiaisonName',
          colProps: { span: 8 }
        },
        {
          label: '业务部门',
          field: 'businessDeptName',
          colProps: { span: 8 }
        },
        {
          label: '业务员',
          field: 'businessUserName',
          colProps: { span: 8 }
        },
        {
          label: '客户名称',
          field: 'customName',
          colProps: { span: 8 }
        },
        {
          label: '客户联系人',
          field: 'contactsName',
          colProps: { span: 8 }
        },

        {
          label: '备注',
          field: 'remark',
          colProps: { span: 24 }
        }
      ]
    },
    colProps: { span: 24 }
  }
]

// export const infoSchemas = [
//   {
//     label: '基本信息',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Group',
//       schemas: [
//         {
//           label: '采购合同编号',
//           field: 'purchaseCode',
//           colProps: { span: 12 }
//         },
//         {
//           label: '类型',
//           field: 'contractTypeMsg',
//           colProps: { span: 12 }
//         },
//         {
//           label: '关联项目编号',
//           field: 'projectCode',

//           colProps: { span: 12 }
//         },
//         {
//           label: '关联项目名称',
//           field: 'projectName',
//           colProps: { span: 12 }
//         },
//         {
//           label: '申请人',
//           field: 'purchaseUserName',
//           colProps: { span: 12 }
//         },
//         {
//           label: '申请部门',
//           field: 'deptName',
//           colProps: { span: 12 }
//         },
//         {
//           label: '供应商名称',
//           field: 'supplyName',
//           colProps: { span: 12 }
//         },
//         {
//           label: '供应商联系人',
//           field: 'supplyContactsNameContent',
//           colProps: { span: 12 }
//         },
//         {
//           label: '付款方式',
//           field: 'paymentType',
//           colProps: { span: 24 }
//         },
//         {
//           label: '备注',
//           field: 'remark',
//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   },
//   {
//     label: '财务信息',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Custom',
//       CustomGroupComp: <div></div>,
//       schemas: [
//         {
//           label: '合同总金额',
//           field: 'purchaseAmount',
//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   },
//   {
//     label: '明细信息',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Group',
//       schemas: [
//         {
//           label: '',
//           field: 'productList',

//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   },
//   {
//     label: '出入库记录',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Group',
//       schemas: [
//         {
//           label: '',
//           field: 'stockTicketList',
//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   },
//   {
//     label: '合同附件',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Group',
//       schemas: [
//         {
//           label: '',
//           field: 'fileIds',
//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   }
// ]
