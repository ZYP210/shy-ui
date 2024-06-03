import ShyFlowDingDing from "./src/pages/index.vue";
import "./src/css/workflow.css";
import nodeWrap from "./src/components/nodeWrap.vue";
import addNode from "./src/components/addNode.vue";
import displayNodeWrap from "./src/components/displayNodeWrap.vue";
import store from "./src/store";

// 定义我们的插件
const myPlugin = {
  // 该插件有一个install方法
  // 方法的第一个参数是传入的Vue，第二个参数可以插件的自定义参数
  install(Vue, options) {
    Vue.component("ShyFlowDingDing", ShyFlowDingDing);
    Vue.component("nodeWrap", nodeWrap);
    Vue.component("addNode", addNode);
    Vue.component("displayNodeWrap", displayNodeWrap);
    Vue.directive("focus", {
      mounted(el) {
        el.focus()
      },
    });
    Vue.use(store);
  },
};

// 最后将插件导出，并在main.js中通过Vue.use()即可使用插件
export default myPlugin;
