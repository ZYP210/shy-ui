<template>
  <div class="p-10px h-full overflow-hidden">
    <Process
      :data="data"
      :columns="columns"
      :options="options"
      :label-width="50"
    />
  </div>
</template>
<script lang="ts" setup>
import { Process } from '3h1-ui'

const options = [
  {
    value: '1',
    label: '处理中',
    colorType: 'var(--blue-5)',
    cssClass: ''
  },
  {
    value: '2',
    label: '通过',
    colorType: 'var(--green-5)',
    cssClass: ''
  },
  {
    value: '3',
    label: '不通过',
    colorType: 'var(--red-5)',
    cssClass: ''
  },
  {
    value: '4',
    label: '已取消',
    colorType: 'var(--gray-5)',
    cssClass: ''
  },
  {
    value: '5',
    label: '驳回',
    colorType: 'var(--red-5)',
    cssClass: ''
  }
]

const columns = [
  {
    title: '审批人',
    dataIndex: 'nickname',
  },
  {
    title: '审批结果',
    tag: true,
    options: options,
    dataIndex: 'result'
  },
  {
    title: '审批评论',
    dataIndex: 'reason'
  }
]

const data = [
  {
    id: '66217d9b-1d98-11ef-9749-5a3436b4e2c2',
    name: '业务立项申请',
    claimTime: null,
    createTime: 1716972586000,
    suspensionState: null,
    processInstance: {
      id: '7cc73344-1ce6-11ef-9787-5a3436b4e2c2',
      name: '项目立项',
      startUserId: '1775385726868267009',
      startUserNickname: '张莉',
      processDefinitionId:
        'create_project:15:1f1483a8-f554-11ee-b001-3e6026be1055'
    },
    endTime: null,
    durationInMillis: null,
    result: 1,
    reason: null,
    definitionKey: 'Activity_08j268u',
    assigneeUser: {
      id: '1775385726868267009',
      nickname: '张莉',
      deptId: null,
      deptName: '企业数字化部',
      result: 1,
      reason: null,
      endTime: null,
      durationInMillis: null,
      claimTime: null,
      createTime: 1716972586000
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1775385726868267009',
        nickname: '张莉',
        deptId: null,
        deptName: '企业数字化部',
        result: 1,
        reason: null,
        endTime: null,
        durationInMillis: null,
        claimTime: null,
        createTime: 1716972586000
      }
    ]
  },
  {
    id: '69facdb4-1d53-11ef-9787-5a3436b4e2c2',
    name: '总经理审批',
    claimTime: null,
    createTime: 1716942957000,
    suspensionState: null,
    processInstance: {
      id: '7cc73344-1ce6-11ef-9787-5a3436b4e2c2',
      name: '项目立项',
      startUserId: '1775385726868267009',
      startUserNickname: '张莉',
      processDefinitionId:
        'create_project:15:1f1483a8-f554-11ee-b001-3e6026be1055'
    },
    endTime: 1716972586000,
    durationInMillis: 29628816,
    result: 5,
    reason: '123',
    definitionKey: 'Activity_1h7ejot',
    assigneeUser: {
      id: '1775385397464408066',
      nickname: '徐启胜',
      deptId: null,
      deptName: '徐启胜板块',
      result: 5,
      reason: '123',
      endTime: 1716972586000,
      durationInMillis: 29628816,
      claimTime: null,
      createTime: 1716942957000
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1775385397464408066',
        nickname: '徐启胜',
        deptId: null,
        deptName: '徐启胜板块',
        result: 5,
        reason: '123',
        endTime: 1716972586000,
        durationInMillis: 29628816,
        claimTime: null,
        createTime: 1716942957000
      }
    ]
  },
  {
    id: '7cf08d4e-1ce6-11ef-9787-5a3436b4e2c2',
    name: '分管副总审批',
    claimTime: null,
    createTime: 1716896174000,
    suspensionState: null,
    processInstance: {
      id: '7cc73344-1ce6-11ef-9787-5a3436b4e2c2',
      name: '项目立项',
      startUserId: '1775385726868267009',
      startUserNickname: '张莉',
      processDefinitionId:
        'create_project:15:1f1483a8-f554-11ee-b001-3e6026be1055'
    },
    endTime: 1716942957000,
    durationInMillis: 46783329,
    result: 2,
    reason: '1',
    definitionKey: 'Activity_0qqdtit',
    assigneeUser: {
      id: '1775385392611598338',
      nickname: '江水',
      deptId: null,
      deptName: '江水板块',
      result: 2,
      reason: '1',
      endTime: 1716942957000,
      durationInMillis: 46783329,
      claimTime: null,
      createTime: 1716896174000
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1775385392611598338',
        nickname: '江水',
        deptId: null,
        deptName: '江水板块',
        result: 2,
        reason: '1',
        endTime: 1716942957000,
        durationInMillis: 46783329,
        claimTime: null,
        createTime: 1716896174000
      }
    ]
  },
  {
    id: '7cc7cf90-1ce6-11ef-9787-5a3436b4e2c2',
    name: '业务立项申请',
    claimTime: null,
    createTime: 1716896173000,
    suspensionState: null,
    processInstance: {
      id: '7cc73344-1ce6-11ef-9787-5a3436b4e2c2',
      name: '项目立项',
      startUserId: '1775385726868267009',
      startUserNickname: '张莉',
      processDefinitionId:
        'create_project:15:1f1483a8-f554-11ee-b001-3e6026be1055'
    },
    endTime: 1716896174000,
    durationInMillis: 263,
    result: 2,
    reason: '',
    definitionKey: 'Activity_08j268u',
    assigneeUser: {
      id: '1775385726868267009',
      nickname: '张莉',
      deptId: null,
      deptName: '企业数字化部',
      result: 2,
      reason: '',
      endTime: 1716896174000,
      durationInMillis: 263,
      claimTime: null,
      createTime: 1716896173000
    },
    parentTaskId: null,
    children: null,
    userList: [
      {
        id: '1775385726868267009',
        nickname: '张莉',
        deptId: null,
        deptName: '企业数字化部',
        result: 2,
        reason: '',
        endTime: 1716896174000,
        durationInMillis: 263,
        claimTime: null,
        createTime: 1716896173000
      }
    ]
  }
].map((ele) => ({ ...ele, ...ele.assigneeUser }))
</script>
