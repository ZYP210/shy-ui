<template>
  <ShyFlowDingDing
    :initData="initData"
    :customApi="customApi"
    @getNodeJson="getNodeJson"
    :option="option"
  />
</template>

<script setup lang="ts">
console.log('3333')

const getNodeJson = (playload) => {
  console.log('----', playload)
}
const customApi = {
  type: [
    {
      value: 10,
      label: '角色',
      colorType: 'info',
      cssClass: ''
    },
    {
      value: 20,
      label: '部门的成员',
      colorType: 'primary',
      cssClass: ''
    },
    {
      value: 21,
      label: '部门的负责人',
      colorType: 'primary',
      cssClass: ''
    },
    {
      value: 22,
      label: '岗位',
      colorType: 'success',
      cssClass: ''
    },
    {
      value: 30,
      label: '用户',
      colorType: 'info',
      cssClass: ''
    },
    {
      value: 40,
      label: '用户组',
      colorType: 'warning',
      cssClass: ''
    },
    {
      value: 50,
      label: '自定义脚本',
      colorType: 'danger',
      cssClass: ''
    }
  ],
  dept: [
    {
      id: 100,
      name: '芋道源码',
      parentId: 0,
      children: [
        {
          id: 173,
          name: 'test',
          parentId: 100
        }
      ]
    }
  ],
  role: [
    {
      value: 207,
      label: 'tes'
    },
    {
      value: 1,
      label: '超级管理员'
    },
    {
      value: 2,
      label: '普通角色'
    },
    {
      value: 208,
      label: '1'
    },
    {
      value: 206,
      label: 'st'
    }
  ],
  post: [
    {
      value: 1,
      label: '董事长'
    },
    {
      value: 2,
      label: '项目经理'
    },
    {
      value: 36,
      label: '12'
    },
    {
      value: 35,
      label: '1'
    }
  ],
  user: [
    {
      value: 1,
      label: 'admin'
    }
  ],
  userGroup: [
    {
      value: 1,
      label: 'admin'
    }
  ],
  script: [
    {
      value: 10,
      label: '流程发起人',
      colorType: '',
      cssClass: ''
    },
    {
      value: 20,
      label: '流程发起人的一级领导',
      colorType: '',
      cssClass: ''
    },
    {
      value: 21,
      label: '流程发起人的二级领导',
      colorType: '',
      cssClass: ''
    }
  ],
  authorityTableList: [
    {
      key: '77543614-19c2-478c-8820-00d41ef8b33e',
      label: '子表单',
      operate: true,
      readonly: false,
      hidden: false
    },
    {
      key: '77543614-19c2-478c-8820-00d41ef8b33e',
      label: '子表单',
      operate: true,
      readonly: false,
      hidden: false
    },
    {
      key: '77543614-19c2-478c-8820-00d41ef8b33e',
      label: '子表单',
      operate: true,
      readonly: false,
      hidden: false
    }
  ]
}

const option = {
  nodeType: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  isLook: false,
  isStatus: false
}

const initData = {
  deploymentId: '123123', // 列表id
  name: 'ceshi', // 名称
  nodeConfig: {}
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
