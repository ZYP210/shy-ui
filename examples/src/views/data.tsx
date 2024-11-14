import { RouterLink } from 'vue-router'
import { get } from 'lodash-es'
import { ShyTable, BasicTitle, useShyTable, BasicButton } from '3h1-ui'
import { Collapse } from 'ant-design-vue'
import dayjs from 'dayjs'
import { withModifiers } from 'vue'
export const CollapseComp = defineComponent({
  inheritAttrs: false,
  props: {
    label: String
  },
  emits: ['expand'],
  setup(props, { slots, emit }) {
    const parentEmit = inject('parentEmit')

    const activeKey = ref(['1'])

    watch(
      () => activeKey.value,
      (val) => {
        emit('expand', !!val.length)
      }
    )

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
                  extra: () => slots?.extra?.(parentEmit)
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
        extra: (emit) => <BasicButton onClick={withModifiers(() => emit('zzz', 'zzz'), ['stop'])}>ppp</BasicButton>
      },
      onExpand: (val) => {
        console.log(val)
      },
      schemas: [
        {
          label: '项目编号',
          field: 'projectCode',
          helpMessage: () => (
            <ShyTable
              isShowHeader={false}
              canResize={false}
              isShowFooter={false}
              columns={[
                {
                  title: '类型',
                  dataIndex: 'a',
                  width: 100,
                  align: 'center',
                },
                {
                  title: '一类',
                  dataIndex: 'b',
                  width: 100,
                  align: 'center',
                },
                {
                  title: '二类',
                  dataIndex: 'c',
                  width: 100,
                  align: 'center',
                },
                {
                  title: '三类',
                  dataIndex: 'd',
                  width: 100,
                  align: 'center',
                },
                {
                  title: '备注',
                  dataIndex: 'e',
                  ellipsis: false,
                  width: 350,
                  customCell: (_, index) => {
                    if (!index) {
                      return { rowSpan: 2, style: { 'white-space': 'pre-wrap' } }
                    }
                    return { rowSpan: 0 }
                  }
                }
              ]}
              dataSource={[
                {
                  a: '标准',
                  b: '300/晚',
                  c: '250/晚',
                  d: '180/晚',
                  e: `一类：北京、上海、广州、深圳；\n二类：省会城市及天津、重庆、大连、厦门、青岛、无锡、苏州；\n三类：其他城市、县城及乡镇。\n\n高层管理人员（副总及以上）不超以上标准的1.5倍。`
                },
                {
                  a: '同性别同住',
                  b: '350/晚',
                  c: '280/晚',
                  d: '200/晚',
                  e: ''
                }
              ]}
            />
          ),
          helpComponentProps: {
            overlayInnerStyle: {
              width: '800px'
            },
            color: 'var(--theme)',
            placement: 'rightBottom'
          },
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
