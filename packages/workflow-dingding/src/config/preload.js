import { mapState } from "./lib";
function All() {}
All.prototype = {
  timer: "",
  debounce(fn, delay = 500) {
    var _this = this;
    return function (arg) {
      //获取函数的作用域和变量
      let that = this;
      let args = arg;
      clearTimeout(_this.timer); // 清除定时器
      _this.timer = setTimeout(function () {
        fn.call(that, args);
      }, delay);
    };
  },
  setCookie(val) {
    //cookie设置[{key:value}]、获取key、清除['key1','key2']
    for (var i = 0, len = val.length; i < len; i++) {
      for (var key in val[i]) {
        document.cookie =
          key + "=" + encodeURIComponent(val[i][key]) + "; path=/";
      }
    }
  },
  getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0, len = arrCookie.length; i < len; i++) {
      var arr = arrCookie[i].split("=");
      if (name == arr[0]) {
        return decodeURIComponent(arr[1]);
      }
    }
  },
  clearCookie(name) {
    var myDate = new Date();
    myDate.setTime(-1000); //设置时间
    for (var i = 0, len = name.length; i < len; i++) {
      document.cookie =
        "" + name[i] + "=''; path=/; expires=" + myDate.toGMTString();
    }
  },
  arrToStr(arr, key = "name") {
    if (arr && arr.length > 0) {
      return arr
        .map((item) => {
          return item[key];
        })
        .toString();
    }
  },
  toggleClass(arr, elem, key = "id") {
    return arr.some((item) => {
      return item[key] == elem[key];
    });
  },
  toChecked(arr, elem, key = "id") {
    var isIncludes = this.toggleClass(arr, elem, key);
    !isIncludes ? arr.push(elem) : this.removeEle(arr, elem, key);
  },
  removeEle(arr, elem, key = "id") {
    var includesIndex;
    arr.map((item, index) => {
      if (item[key] == elem[key]) {
        includesIndex = index;
      }
    });
    arr.splice(includesIndex, 1);
  },
  setApproverStr(nodeConfig) {
    if (nodeConfig.settype == 1) {
      if (nodeConfig.approvalList.length == 1) {
        return nodeConfig.approvalList[0].name;
      } else if (nodeConfig.approvalList.length > 1) {
        if (nodeConfig.examineMode == 1) {
          return this.arrToStr(nodeConfig.approvalList);
        } else if (nodeConfig.examineMode == 2) {
          return nodeConfig.approvalList.length + "人会签";
        }
      }
    } else if (nodeConfig.settype == 2) {
      let level =
        nodeConfig.directorLevel == 1
          ? "直接主管"
          : "第" + nodeConfig.directorLevel + "级主管";
      if (nodeConfig.examineMode == 1) {
        return level;
      } else if (nodeConfig.examineMode == 2) {
        return level + "会签";
      }
    } else if (nodeConfig.settype == 4) {
      if (nodeConfig.selectRange == 1) {
        return "发起人自选";
      } else {
        if (nodeConfig.approvalList.length > 0) {
          if (nodeConfig.selectRange == 2) {
            return "发起人自选";
          } else {
            return "发起人从" + nodeConfig.approvalList[0].name + "中自选";
          }
        } else {
          return "";
        }
      }
    } else if (nodeConfig.settype == 5) {
      return "发起人自己";
    } else if (nodeConfig.settype == 7) {
      return (
        "从直接主管到通讯录中级别最高的第" +
        nodeConfig.examineEndDirectorLevel +
        "个层级主管"
      );
    }
  },
  dealStr(str, obj) {
    let arr = [];
    let list = str.split(",");
    for (var elem in obj) {
      list.map((item) => {
        if (item == elem) {
          arr.push(obj[elem].value);
        }
      });
    }
    return arr.join("或");
  },
  conditionStr(nodeConfig, index) {
    const type = nodeConfig.type;
    var { expression } = nodeConfig.conditionNodes[index];
    if (!expression) {
      return index == nodeConfig.conditionNodes.length - 1 &&
        nodeConfig.conditionNodes[0].expression
        ? type === 3
          ? "其他分支并行执行"
          : "其他条件进入此流程"
        : type === 3
        ? "请设置分支"
        : "请设置条件";
    } else {
      return expression;
    }
  },
  copyerStr(nodeConfig) {
    if (nodeConfig.approvalList.length != 0) {
      return this.arrToStr(nodeConfig.approvalList);
    } else {
      if (nodeConfig.ccSelfSelectFlag == 1) {
        return "发起人自选";
      }
    }
  },
  toggleStrClass(item, key) {
    let a = item.zdy1 ? item.zdy1.split(",") : [];
    return a.some((item) => {
      return item == key;
    });
  },

  handleTree(data, id, parentId, children) {
    if (!Array.isArray(data)) {
      console.warn("data must be an array");
      return [];
    }
    const config = {
      id: id || "id",
      parentId: parentId || "parentId",
      childrenList: children || "children",
    };

    const childrenListMap = {};
    const nodeIds = {};
    const tree = [];

    for (const d of data) {
      const parentId = d[config.parentId];
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = [];
      }
      nodeIds[d[config.id]] = d;
      childrenListMap[parentId].push(d);
    }

    for (const d of data) {
      const parentId = d[config.parentId];
      if (nodeIds[parentId] == null) {
        tree.push(d);
      }
    }

    for (const t of tree) {
      adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
      if (childrenListMap[o[config.id]] !== null) {
        o[config.childrenList] = childrenListMap[o[config.id]];
      }
      if (o[config.childrenList]) {
        for (const c of o[config.childrenList]) {
          adaptToChildrenList(c);
        }
      }
    }
    return tree;
  },
  getApproverLabel(type, value) {
    // switch (type) {
    //   case 10:
    //     return roles.find((ele) => ele.value === value)?.label;
    //     break;
    //   case
    // }
  },
  getRuleTypeDic() {
    let { users, roles, depts, posts, userGroups, scripts } = mapState();
    return {
      10: {
        options: roles,
      },
      20: {
        options: depts,
        component: "TreeSelect",
        fieldNames: {
          label: "name",
          value: "id",
          children: "children",
        },
      },
      21: {
        options: depts,
        component: "TreeSelect",
        fieldNames: {
          label: "name",
          value: "id",
          children: "children",
        },
      },
      22: {
        options: posts,
      },
      30: {
        options: users,
      },
      31: {
        options: users,
      },
      32: {
        options: users,
      },
      40: {
        options: userGroups,
      },
      50: {
        options: scripts,
      },
    };
  },
  findTreeNode(tree, func, config = {}) {
    config = Object.assign(
      { id: "id", children: "children", pid: "pid" },
      config
    );
    const { children } = config;
    const list = [...tree];
    for (const node of list) {
      if (func(node)) {
        return node;
      } else {
        if (node[children]) {
          return this.findTreeNode(node[children], func, config);
        }
      }
    }
  },
  buildShortUUID(prefix = "") {
    let unique = 0;
    const time = Date.now();
    const random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + "_" + random + unique + String(time);
  },
};
export default new All();
