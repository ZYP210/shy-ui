<template>
  <div class="p-10px h-full overflow-hidden">
    <Process :data="data" :columns="columns" />
  </div>
</template>
<script lang="ts" setup>
import { formatToDateTime } from '@shy-plugins/utils'
import { Process } from '3h1-ui'
import { Tag } from 'ant-design-vue'
import { h } from 'vue'

const columns = [
  {
    key: 'name'
  },
  {
    key: 'user',
    label: '审批人',
    customRender: ({ user }) => user?.map((ele) => h(Tag, null, ele))
  },
  {
    key: 'result',
    label: '审批结果'
  },
  {
    key: 'createTime',
    customRender: ({ createTime }) => formatToDateTime(createTime)
  }
]

const data = [
  {
    id: '59ba2ccc-02c9-11ef-bf94-3ee9f734d794',
    name: '业务申请提前开工',
    claimTime: null,
    createTime: 1714024929000,
    suspensionState: null,
    processInstance: {
      id: 'a1026c64-02c8-11ef-82d6-3e6026be1055',
      name: '提前开工',
      startUserId: '1000000000000000001',
      startUserNickname: 'admin',
      processDefinitionId:
        'advance_work_flow:9:8d7451e3-02c8-11ef-82d6-3e6026be1055'
    },
    endTime: null,
    durationInMillis: null,
    result: '处理中',
    reason: null,
    definitionKey: 'Activity_02hv1ud',
    assigneeUser: {
      id: '1000000000000000001',
      nickname: 'admin',
      deptId: null,
      deptName: '安徽三禾一信息科技有限公司'
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1000000000000000001',
        nickname: 'admin',
        deptId: null,
        deptName: '安徽三禾一信息科技有限公司'
      }
    ],
    user: ['admin']
  },
  {
    id: '53c66e9d-02c9-11ef-bf94-3ee9f734d794',
    name: '职能部门会签',
    claimTime: null,
    createTime: 1714024919000,
    suspensionState: null,
    processInstance: {
      id: 'a1026c64-02c8-11ef-82d6-3e6026be1055',
      name: '提前开工',
      startUserId: '1000000000000000001',
      startUserNickname: 'admin',
      processDefinitionId:
        'advance_work_flow:9:8d7451e3-02c8-11ef-82d6-3e6026be1055'
    },
    endTime: 1714024930000,
    durationInMillis: 9848,
    result: '驳回',
    reason: '不通过, 已回退',
    definitionKey: 'Activity_16ejav7',
    assigneeUser: {
      id: '1000000000000000271',
      nickname: '孙晓敏',
      deptId: null,
      deptName: '商务中心'
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1000000000000000271',
        nickname: '孙晓敏',
        deptId: null,
        deptName: '商务中心'
      }
    ],
    user: ['孙晓敏']
  },
  {
    id: 'ff4dd418-02c8-11ef-82a5-3ee9f734d794',
    name: '业务申请提前开工',
    claimTime: null,
    createTime: 1714024777000,
    suspensionState: null,
    processInstance: {
      id: 'a1026c64-02c8-11ef-82d6-3e6026be1055',
      name: '提前开工',
      startUserId: '1000000000000000001',
      startUserNickname: 'admin',
      processDefinitionId:
        'advance_work_flow:9:8d7451e3-02c8-11ef-82d6-3e6026be1055'
    },
    endTime: 1714024919000,
    durationInMillis: 141551,
    result: '通过',
    reason: '',
    definitionKey: 'Activity_02hv1ud',
    assigneeUser: {
      id: '1000000000000000001',
      nickname: 'admin',
      deptId: null,
      deptName: '安徽三禾一信息科技有限公司'
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1000000000000000001',
        nickname: 'admin',
        deptId: null,
        deptName: '安徽三禾一信息科技有限公司'
      }
    ],
    user: ['admin']
  },
  {
    id: 'a166ac95-02c8-11ef-82d6-3e6026be1055',
    name: '职能部门会签',
    claimTime: null,
    createTime: 1714024620000,
    suspensionState: null,
    processInstance: {
      id: 'a1026c64-02c8-11ef-82d6-3e6026be1055',
      name: '提前开工',
      startUserId: '1000000000000000001',
      startUserNickname: 'admin',
      processDefinitionId:
        'advance_work_flow:9:8d7451e3-02c8-11ef-82d6-3e6026be1055'
    },
    endTime: 1714024784000,
    durationInMillis: 157461,
    result: '驳回',
    reason: '不通过, 已回退',
    definitionKey: 'Activity_16ejav7',
    assigneeUser: {
      id: '1000000000000000271',
      nickname: '孙晓敏',
      deptId: null,
      deptName: '商务中心'
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1000000000000000271',
        nickname: '孙晓敏',
        deptId: null,
        deptName: '商务中心'
      }
    ],
    user: ['孙晓敏']
  },
  {
    id: 'a106d941-02c8-11ef-82d6-3e6026be1055',
    name: '业务申请提前开工',
    claimTime: null,
    createTime: 1714024619000,
    suspensionState: null,
    processInstance: {
      id: 'a1026c64-02c8-11ef-82d6-3e6026be1055',
      name: '提前开工',
      startUserId: '1000000000000000001',
      startUserNickname: 'admin',
      processDefinitionId:
        'advance_work_flow:9:8d7451e3-02c8-11ef-82d6-3e6026be1055'
    },
    endTime: 1714024620000,
    durationInMillis: 610,
    result: '通过',
    reason: '',
    definitionKey: 'Activity_02hv1ud',
    assigneeUser: {
      id: '1000000000000000001',
      nickname: 'admin',
      deptId: null,
      deptName: '安徽三禾一信息科技有限公司'
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1000000000000000001',
        nickname: 'admin',
        deptId: null,
        deptName: '安徽三禾一信息科技有限公司'
      }
    ],
    user: ['admin']
  }
]
</script>
