// 用于规定vxe-table默认props
import { VxeTableProps, VxeColumnProps } from 'vxe-table'
export const basicProps: VxeTableProps = {
  border: true,
  size: 'small',
  // 行设置
  rowConfig: {
    isHover: true,
    height: 40
  },
  // 序号设置
  seqConfig: {},
  // 高度
  height: 'auto'
  // autoResize: true
}

export const basicColumn: VxeColumnProps = {
  showHeaderOverflow: 'tooltip',
  showOverflow: 'tooltip',
  align: 'center'
}

export const basicFormConfig = {
  labelWidth: 80
}
