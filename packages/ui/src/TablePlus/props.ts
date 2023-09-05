// 用于规定vxe-table默认props
import { VxeTableProps, VxeColumnProps } from 'vxe-table'

export const basicProps: VxeTableProps = {
  border: false,
  size: 'mini',
  align: 'left',
  // 行设置
  rowConfig: {
    isHover: true,
    height: 40
  },
  // 序号设置
  seqConfig: {},
  // 高度
  height: 'auto',
  // autoResize: true
  headerCellStyle: {
    backgroundColor: '#fafafa',
    color: 'rgba(0, 0, 0, 0.85)'
  },
  sortConfig: {
    showIcon: false
  }
}

export const basicColumn: VxeColumnProps = {
  showHeaderOverflow: 'tooltip',
  showOverflow: 'tooltip',
  align: 'left',
  visible: true,
  sortable: true
}

export const basicFormConfig = {
  labelWidth: 80
}
