import { createStore } from "vuex";
export default createStore({
  state: {
    deploymentId: "",
    isTried: false,
    promoterDrawer: false,
    flowPermission1: {},
    approverDrawer: false,
    approverConfig1: {},
    copyerDrawer: false,
    copyerConfig1: {},
    conditionDrawer: false,
    conditionsConfig1: {
      conditionNodes: [],
    },
    branchDrawer: false,
    branchConfig1: {},
    users: [],
    roles: [],
    depts: [],
    nodeList: [],
    isLook: false,
    authorityTableList: [], //权限配置table列表

    posts: [],
    userGroups: [],
    scripts: [],
    types: [],
  },
  mutations: {
    setIsLook(status, isLook) {
      status.isLook = isLook;
    },
    setNodeTypeList(status, nodeList) {
      status.nodeList = nodeList;
    },
    setTableId(status, payload) {
      status.deploymentId = payload;
    },
    setIsTried(status, payload) {
      status.isTried = payload;
    },
    setPromoter(status, payload) {
      status.promoterDrawer = payload;
    },
    setFlowPermission(status, payload) {
      status.flowPermission1 = payload;
    },
    setApprover(status, payload) {
      status.approverDrawer = payload;
    },
    setApproverConfig(status, payload) {
      status.approverConfig1 = payload;
    },
    setCopyer(status, payload) {
      status.copyerDrawer = payload;
    },
    setCopyerConfig(status, payload) {
      status.copyerConfig1 = payload;
    },
    setCondition(status, payload) {
      status.conditionDrawer = payload;
    },
    setConditionsConfig(status, payload) {
      status.conditionsConfig1 = payload;
    },

    setBranch(status, payload) {
      status.branchDrawer = payload;
    },

    setBranchConfig(status, payload) {
      status.branchConfig1 = payload;
    },

    setUserList(status, users) {
      status.users = users;
    },
    setRoleList(status, roles) {
      status.roles = roles;
    },
    setDeptList(status, depts) {
      status.depts = depts;
    },

    setAuthorityTableList(status, authorityTableList) {
      status.authorityTableList = authorityTableList;
    },
    setPostList(status, posts) {
      status.posts = posts;
    },
    setUserGroupList(status, userGroups) {
      status.userGroups = userGroups;
    },
    setScriptList(status, scripts) {
      status.scripts = scripts;
    },
    setTypeList(status, types) {
      status.types = types;
    },
  },
  actions: {},
  modules: {},
});
