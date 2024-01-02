import axios from './axios';

//保存模型
export const save = (data, flag) =>
  axios({
    url: '/zutai/iot/zutai/pages/save/all?flag=' + flag,
    method: 'post',
    data,
  });
//获取组态详情
export const detail = (id) =>
  axios({
    url: '/zutai/iot/zutai/pages/detail/all',
    method: 'get',
    params: {
      id: '1717111815531827202',
    },
  });

//获取项目列表
export const getProjectId = () => {
  return axios({
    url: '/zutai/iot/zutai/data/projectList',
    method: 'post',
    params: {
      current: 1,
      size: 1000,
    },
  });
};
//获取产品列表
export const getProductList = () => {
  return axios({
    url: '/zutai/iot/zutai/access/productList',
    method: 'get',
    params: {
      // current: 1,
      // size: 1000,
      // projectId,
    },
  });
};
//获取设备列表
export const getDeviceList = (productId) => {
  return axios({
    url: '/zutai/iot/zutai/access/deviceList',
    method: 'GET',
    params: {
      productId,
    },
  });
};
//获取属性列表
export const getDeviceFeatureList = (productSn) => {
  return axios({
    url: '/zutai/iot/zutai/access/getModels',
    method: 'get',
    params: {
      productSn,
    },
  });
};
//绑定设备
export const bindingDevice = (id, deviceIds) => {
  return axios({
    url: '/zutai/iot/zutai/pages/bindingDevice',
    method: 'get',
    params: {
      id: '1717111815531827202',
      deviceIds,
    },
  });
};
// 获取绑定设备
export const getBindingDevice = () => {
  return axios({
    url: '/zutai/iot/zutai/pages/getBindingDevicesByPageId',
    method: 'get',
    params: {
      id: '1717111815531827202',
    },
  });
};

//根据设备id获取组态id
export const getTopoId = (deviceKey) => {
  return axios({
    url: '/zutai/iot/zutai/pages/save/by/device',
    method: 'post',
    params: {
      deviceKey,
    },
  });
};
//获取自定义组件
export const getElements = () => {
  return axios({
    url: '/zutai/iot/zutai/widget/custom/all',
    method: 'get',
  });
};

//新增自定义图片
export const customSave = (data) => {
  return axios({
    url: '/zutai/iot/zutai/widget/custom/save/batch',
    method: 'post',
    data,
  });
};
//删除自定义图片
export const customRemove = (ids) => {
  return axios({
    url: '/zutai/iot/zutai/widget/custom/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};
//获取websocket前缀
export const getSocketUrl = () => {
  return axios({
    url: '/zutai/iot/zutai/websocket/prefix',
    method: 'get',
  });
};

//上传
export const upload = (params: any) => {
  const formData = new FormData();
  formData.append('file', params.file);
  return axios({
    url: '/zutai/blade-resource/oss/endpoint/put-file',
    method: 'post',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data;charset=UTF-8',
    },
  });
};
