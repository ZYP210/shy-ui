type tableOption = {
  menuShow?: boolean;
  menuWidth?: number;
  [propName: string]: any;
};

//接口类型
export interface apiInterface {
  add?: Function;
  update?: Function;
  getDetail?: Function;
  remove?: Function;
  getList?: Function;
}

//公共hook配置项
export interface commonHookOption {
  formOption?: object;
  tableOption?: tableOption;
  searchOption?: object;
  submitEvent?: Function;
  dialogOption?: object;
  [propName: string]: any;
}

//弹窗表单类型
export interface dialogInterface {
  type: string; //弹窗类型
  title: string; //查看表单类型
  [propName: string]: any;
}

//表格类型
export interface tableColumnInterface {
  title: string;
  dataIndex: string;
  [propName: string]: any;
}

//表单类型

export interface formColumnInterface {
  label: string;
  prop: string;
  type?: string;
  span?: number;
  [propName: string]: any;
}
