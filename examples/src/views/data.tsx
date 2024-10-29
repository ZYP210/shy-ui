import { RouterLink } from 'vue-router'
import { get } from 'lodash-es'
import { ShyTable, BasicTitle, useShyTable } from '3h1-ui'
import { Collapse } from 'ant-design-vue'
import dayjs from 'dayjs'
export const infoSchemas = [
  {
    label: '不含税金额',
    field: 'taxFreeAmount'
  },
  {
    label: '税额',
    field: 'taxAmount'
  },
  {
    label: '含税总价',
    field: 'taxationSumAmount'
  }
]
export const productColumns = [
  {
    title: '产品编码',
    dataIndex: 'productCode'
  },
  {
    title: '产品名称',
    dataIndex: 'productName'
  },
  {
    title: '规格型号',
    dataIndex: 'modelType'
  },
  {
    title: '单位',
    dataIndex: 'unitCode',
    customRender: ({ record }) => {
      return '222'
    },
    width: 50
  },
  {
    title: '数量',
    dataIndex: 'purchaseNum',
    width: 50
  },
  {
    title: '含税单价(元)',
    dataIndex: 'taxUnitPriceAmount'
  },
  {
    title: '税率',
    dataIndex: 'taxRate',
    width: 50
  },
  {
    title: '不含税金额',
    dataIndex: 'taxFreeAmount',
    width: 90,
    type: 'text'
  },
  {
    title: '税额',
    dataIndex: 'taxAmount',
    width: 90,
    type: 'text'
  },
  {
    title: '含税总价',
    dataIndex: 'taxationSumAmount',
    width: 90,
    type: 'text'
  }
]
const CollapseComp = defineComponent({
  inheritAttrs: false,
  props: {
    label: String
  },
  setup(props, { slots }) {
    const activeKey = ref(['1'])

    return () => (
      <Collapse
        class={`shy-basic-descriptions-group-collapse`}
        bordered={false}
        v-model:activeKey={activeKey.value}
      >
        <Collapse.Panel
          key="1"
          v-slots={{
            header: () => <BasicTitle>{props.label}</BasicTitle>
          }}
        >
          {slots?.default?.()}
        </Collapse.Panel>
      </Collapse>
    )
  }
})
export const descriptions: any[] = [
  {
    label: '',
    field: '-',
    component: 'Group',
    componentProps: {
      label: '基本信息',
      groupType: 'Custom',
      CustomGroupComp: CollapseComp,
      schemas: [
        {
          label: '合同编号',
          field: 'contractCode',
          colProps: { span: 8 }
        },
        {
          label: '合同类型',
          field: 'contractTypeMsg',
          colProps: { span: 8 }
        },
        {
          label: '合同签订主体',
          field: 'signCompany',
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
          label: '',
          field: '',
          render: () => <span></span>,
          colProps: { span: 8 }
        },
        {
          label: '中标通知书',
          field: 'bidId',
          colProps: { span: 8 }
        },
        {
          label: '中标时间',
          field: 'bidWinTime',
          render: ({ model }) =>
            model.bidWinTime
              ? dayjs(+model.bidWinTime).format('YYYY-MM-DD')
              : '',
          colProps: { span: 8 }
        },
        {
          label: '',
          field: '',
          render: () => <span></span>,
          colProps: { span: 8 }
        },
        {
          label: '收款方式',
          field: 'paymentType',
          colProps: { span: 24 }
        },

        {
          label: '质保条款',
          field: 'warrantyDescription',
          colProps: { span: 24 }
        },
        {
          label: '验收条款',
          field: 'checkDescription',
          colProps: { span: 24 }
        },
        {
          label: '备注',
          field: 'remark',
          colProps: { span: 24 }
        }
      ]
    }
  },
  {
    label: '',
    field: '-',
    component: 'Group',
    componentProps: {
      label: '财务信息',
      groupType: 'Custom',
      CustomGroupComp: CollapseComp,
      schemas: [
        {
          label: '合同额/元',
          field: 'contractAmount',
          colProps: { span: 8 }
        },
        {
          label: '整单折扣额',
          field: 'discountAmount',
          colProps: { span: 8 }
        },
        {
          label: '',
          field: '',
          render: () => <span></span>,
          colProps: { span: 8 }
        }
      ]
    }
  },
  {
    label: '',
    field: '-',
    component: 'Group',
    componentProps: {
      label: '合同明细',
      groupType: 'Custom',
      CustomGroupComp: CollapseComp,
      schemas: [
        {
          label: '',
          field: 'scmProductRefPageList',
          render: ({ model }) => {
            const productTableSum = {
              taxFreeAmount: model?.scmProductRefPageList
                ?.reduce((prev, cur) => prev + (cur.taxFreeAmount || 0), 0)
                .toFixed(2),
              taxAmount: model?.scmProductRefPageList
                ?.reduce((prev, cur) => prev + (cur.taxAmount || 0), 0)
                .toFixed(2),
              taxationSumAmount: model?.scmProductRefPageList
                ?.reduce((prev, cur) => prev + (cur.taxationSumAmount || 0), 0)
                .toFixed(2)
            }

            const [registerProductTable] = useShyTable({
              columns: productColumns,
              tableSetting: {
                showMore: true,
                setting: false,
                size: false
              },
              useInfo: true,
              infoConfig: {
                schemas: infoSchemas,
                infoData: productTableSum
              },
              indexColumnProps: {
                fixed: 'left'
              },
              summaryTotalFields: [
                'taxUnitPriceAmount',
                'taxFreeAmount',
                'taxAmount',
                'taxationSumAmount'
              ],
              showTableSetting: false,
              showIndexColumn: true,
              canResize: false,
              useSearchForm: false,
              isShowFooter: false
            })

            return (
              <ShyTable onRegister={registerProductTable} dataSource={[{}]} />
            )
          },
          colProps: { span: 24 }
        }
      ]
    }
  },
  {
    label: '',
    field: '-',
    component: 'Group',
    componentProps: {
      label: '合同附件',
      groupType: 'Custom',
      CustomGroupComp: CollapseComp,
      schemas: [
        {
          label: '',
          field: 'fileIds',
          required: true,
          component: 'Input',
          rules: [
            { trigger: 'change', required: true, message: '请选择上传文件' }
          ],
          colProps: { span: 24 }
        }
      ]
    },
    colProps: { span: 24 }
  }
]
