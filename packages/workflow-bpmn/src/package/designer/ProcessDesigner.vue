<template>
  <div class="my-process-designer">
    <div class="my-process-designer__header" style="z-index: 999; display: table-row-group">
      <slot name="control-header"></slot>
      <template v-if="!$slots['control-header']">
        <ButtonGroup key="file-control">
          <Button @click="refFile.click()">
            <Icon icon="ep:folder-opened" class="mr-1px" />
            打开文件
          </Button>
          <Tooltip color="#fff" placement="bottom">
            <template #title>
              <div style="color: #409eff">
                <Button type="link" @click="downloadProcessAsXml()">下载为XML文件</Button>
                <br />
                <Button type="link" @click="downloadProcessAsSvg()">下载为SVG文件</Button>
                <br />
                <Button type="link" @click="downloadProcessAsBpmn()">下载为BPMN文件</Button>
              </div>
            </template>
            <Button>
              <Icon icon="ep:download" class="mr-1px" />
              下载文件
            </Button>
          </Tooltip>
          <Tooltip color="#fff" placement="bottom">
            <Button>
              <Icon icon="ep:view" class="mr-1px" />
              浏览
            </Button>
            <template #title>
              <Button type="link" @click="previewProcessXML">预览XML</Button>
              <br />
              <Button type="link" @click="previewProcessJson">预览JSON</Button>
            </template>
          </Tooltip>
          <Tooltip v-if="props.simulation" :title="simulationStatus ? '退出模拟' : '开启模拟'">
            <Button @click="processSimulation">
              <Icon icon="ep:cpu" class="mr-1px" />
              模拟
            </Button>
          </Tooltip>
        </ButtonGroup>
        <ButtonGroup key="align-control">
          <Tooltip title="向左对齐">
            <Button @click="elementsAlign('left')" class="align align-bottom">
              <Icon icon="fa:align-left" class="mr-1px" />
            </Button>
          </Tooltip>
          <Tooltip title="向右对齐">
            <Button class="align align-right" @click="elementsAlign('right')">
              <Icon icon="fa:align-left" class="mr-1px" />
            </Button>
          </Tooltip>
          <Tooltip title="向上对齐">
            <Button class="align align-top" @click="elementsAlign('top')">
              <Icon icon="fa:align-left" class="mr-1px" />
            </Button>
          </Tooltip>
          <Tooltip title="向下对齐">
            <Button class="align align-bottom" @click="elementsAlign('bottom')">
              <Icon icon="fa:align-left" class="mr-1px" />
            </Button>
          </Tooltip>
          <Tooltip title="水平居中">
            <Button class="align align-center" @click="elementsAlign('center')">
              <Icon icon="fa:align-left" class="mr-1px" />
            </Button>
          </Tooltip>
          <Tooltip title="垂直居中">
            <Button class="align align-middle" @click="elementsAlign('middle')">
              <Icon icon="fa:align-left" class="mr-1px" />
            </Button>
          </Tooltip>
        </ButtonGroup>
        <ButtonGroup key="scale-control">
          <Tooltip title="缩小视图">
            <Button :disabled="defaultZoom < 0.2" @click="processZoomOut()">
              <Icon icon="ep:zoom-out" class="mr-1px" />
            </Button>
          </Tooltip>
          <Button>{{ Math.floor(defaultZoom * 10 * 10) + '%' }}</Button>
          <Tooltip title="放大视图">
            <Button :disabled="defaultZoom > 4" @click="processZoomIn()">
              <Icon icon="ep:zoom-in" class="mr-1px" />
            </Button>
          </Tooltip>
          <Tooltip title="重置视图并居中">
            <Button @click="processReZoom()">
              <Icon icon="ep:scale-to-original" class="mr-1px" />
            </Button>
          </Tooltip>
        </ButtonGroup>
        <ButtonGroup key="stack-control">
          <Tooltip title="撤销">
            <Button :disabled="!revocable" @click="processUndo()">
              <Icon icon="ep:refresh-left" class="mr-1px" />
            </Button>
          </Tooltip>
          <Tooltip title="恢复">
            <Button :disabled="!recoverable" @click="processRedo()">
              <Icon icon="ep:refresh-right" class="mr-1px" />
            </Button>
          </Tooltip>
          <Tooltip title="重新绘制">
            <Button @click="processRestart">
              <Icon icon="ep:refresh" class="mr-1px" />
            </Button>
          </Tooltip>
        </ButtonGroup>
        <Button @click="processSave" type="primary" :disabled="simulationStatus">
          <Icon icon="ep:plus" class="mr-1px" />
          保存模型
        </Button>
      </template>
      <!-- 用于打开本地文件-->
      <input
        type="file"
        id="files"
        ref="refFile"
        style="display: none"
        accept=".xml, .bpmn"
        @change="importLocalFile"
      />
    </div>
    <div class="my-process-designer__container">
      <div
        class="my-process-designer__canvas"
        ref="bpmnCanvas"
        id="bpmnCanvas"
        style="width: 1680px; height: 800px"
      ></div>
      <!-- <div id="js-properties-panel" class="panel"></div> -->
      <!-- <div class="my-process-designer__canvas" ref="bpmn-canvas"></div> -->
    </div>
    <Modal
      title="预览"
      v-model:visible="previewModelVisible"
      width="80%"
      :footer="null"
      wrap-class-name="full-modal"
    >
      <!-- append-to-body -->
      <div>
        <code class="hljs">
          <!-- 高亮代码块 -->
          {{ previewResult }}
        </code>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '3h1-ui';
  import { Button, Tooltip, Modal, ButtonGroup } from 'ant-design-vue';
  import { useMessage } from '@shy-plugins/use';
  import BpmnModeler from 'bpmn-js/lib/Modeler';
  import DefaultEmptyXML from './plugins/defaultEmpty';
  // 翻译方法
  import customTranslate from './plugins/translate/customTranslate';
  import translationsCN from './plugins/translate/zh';
  // 模拟流转流程
  import tokenSimulation from 'bpmn-js-token-simulation';
  // 标签解析 Moddle
  import camundaModdleDescriptor from './plugins/descriptor/camundaDescriptor.json';
  import activitiModdleDescriptor from './plugins/descriptor/activitiDescriptor.json';
  import flowableModdleDescriptor from './plugins/descriptor/flowableDescriptor.json';
  // 标签解析 Extension
  import camundaModdleExtension from './plugins/extension-moddle/camunda';
  import activitiModdleExtension from './plugins/extension-moddle/activiti';
  import flowableModdleExtension from './plugins/extension-moddle/flowable';
import { XmlNode, XmlNodeType, parseXmlString } from 'steady-xml';
import { ref,onMounted,onBeforeMount,onBeforeUnmount,provide ,computed,defineProps,defineEmits } from 'vue';
const { createConfirm, createMessage } = useMessage();  
  const bpmnCanvas = ref();
const refFile = ref();
  
  const emit = defineEmits([
    'destroy',
    'init-finished',
    'save',
    'commandStack-changed',
    'input',
    'change',
    'canvas-viewbox-changed',
    // eventName.name
    'element-click',
  ]);
  const props = defineProps({
    value: String, // xml 字符串
    // valueWatch: true, // xml 字符串的 watch 状态
    processId: String, // 流程 key 标识
    processName: String, // 流程 name 名字
    formId: Number, // 流程 form 表单编号
    translations: {
      // 自定义的翻译文件
      type: Object,
      default: () => {},
    },
    additionalModel: [Object, Array], // 自定义model
    moddleExtension: {
      // 自定义moddle
      type: Object,
      default: () => {},
    },
    onlyCustomizeAddi: {
      type: Boolean,
      default: false,
    },
    onlyCustomizeModdle: {
      type: Boolean,
      default: false,
    },
    simulation: {
      type: Boolean,
      default: true,
    },
    keyboard: {
      type: Boolean,
      default: true,
    },
    prefix: {
      type: String,
      default: 'camunda',
    },
    events: {
      type: Array,
      default: () => ['element.click'],
    },
    headerButtonSize: {
      type: String,
      default: 'small',
      validator: (value: string) => ['default', 'medium', 'small', 'mini'].indexOf(value) !== -1,
    },
    headerButtonType: {
      type: String,
      default: 'primary',
      validator: (value: string) =>
        ['default', 'primary', 'success', 'warning', 'danger', 'info'].indexOf(value) !== -1,
    },
  });

  provide('configGlobal', props);
  let bpmnModeler: any = null;
  const defaultZoom = ref(1);
  const previewModelVisible = ref(false);
  const simulationStatus = ref(false);
  const previewResult = ref('');
  const previewType = ref('xml');
  const recoverable = ref(false);
  const revocable = ref(false);
  const additionalModules = computed(() => {
    const Modules: any[] = [];
    // 仅保留用户自定义扩展模块
    if (props.onlyCustomizeAddi) {
      if (Object.prototype.toString.call(props.additionalModel) == '[object Array]') {
        return props.additionalModel || [];
      }
      return [props.additionalModel];
    }

    // 插入用户自定义扩展模块
    if (Object.prototype.toString.call(props.additionalModel) == '[object Array]') {
      Modules.push(...(props.additionalModel as any[]));
    } else {
      props.additionalModel && Modules.push(props.additionalModel);
    }

    // 翻译模块
    const TranslateModule = {
      translate: ['value', customTranslate(props.translations || translationsCN)],
    };
    Modules.push(TranslateModule);

    // 模拟流转模块
    if (props.simulation) {
      Modules.push(tokenSimulation);
    }

    // 根据需要的流程类型设置扩展元素构建模块
    // if (this.prefix === "bpmn") {
    //   Modules.push(bpmnModdleExtension);
    // }
    if (props.prefix === 'camunda') {
      Modules.push(camundaModdleExtension);
    }
    if (props.prefix === 'flowable') {
      Modules.push(flowableModdleExtension);
    }
    if (props.prefix === 'activiti') {
      Modules.push(activitiModdleExtension);
    }

    return Modules;
  });
  const moddleExtensions = computed(() => {
    const Extensions: any = {};
    // 仅使用用户自定义模块
    if (props.onlyCustomizeModdle) {
      return props.moddleExtension || null;
    }

    // 插入用户自定义模块
    if (props.moddleExtension) {
      for (let key in props.moddleExtension) {
        Extensions[key] = props.moddleExtension[key];
      }
    }

    // 根据需要的 "流程类型" 设置 对应的解析文件
    if (props.prefix === 'activiti') {
      Extensions.activiti = activitiModdleDescriptor;
    }
    if (props.prefix === 'flowable') {
      Extensions.flowable = flowableModdleDescriptor;
    }
    if (props.prefix === 'camunda') {
      Extensions.camunda = camundaModdleDescriptor;
    }
    return Extensions;
  });
const initBpmnModeler = () => {    
    if (bpmnModeler) return;
  let data = document.getElementById('bpmnCanvas');
    bpmnModeler = new BpmnModeler({
      container: data,
      keyboard: props.keyboard ? { bindTo: document } : null,
      additionalModules: additionalModules.value,
      moddleExtensions: moddleExtensions.value,
    });
    emit('init-finished', bpmnModeler);
    initModelListeners();
  };

  const initModelListeners = () => {
    const EventBus = bpmnModeler.get('eventBus');
    // 注册需要的监听事件, 将. 替换为 - , 避免解析异常
    props.events.forEach((event: any) => {
      EventBus.on(event, function (eventObj) {
        let eventName = event.replace(/\./g, '-');
        // eventName.name = eventName
        let element = eventObj ? eventObj.element : null;
        emit('element-click', element, eventObj);
        // emit(eventName, element, eventObj)
      });
    });
    // 监听图形改变返回xml
    EventBus.on('commandStack.changed', async (event) => {
      try {
        recoverable.value = bpmnModeler.get('commandStack').canRedo();
        revocable.value = bpmnModeler.get('commandStack').canUndo();
        let { xml } = await bpmnModeler.saveXML({ format: true });
        emit('commandStack-changed', event);
        emit('input', xml);
        emit('change', xml);
      } catch (e: any) {
        console.error(`[Process Designer Warn]: ${e.message || e}`);
      }
    });
    // 监听视图缩放变化
    bpmnModeler.on('canvas.viewbox.changed', ({ viewbox }) => {
      emit('canvas-viewbox-changed', { viewbox });
      const { scale } = viewbox;
      defaultZoom.value = Math.floor(scale * 100) / 100;
    });
  };
  /* 创建新的流程图 */
  const createNewDiagram = async (xml) => {
    // 将字符串转换成图显示出来
    let newId = props.processId || `Process_${new Date().getTime()}`;
    let newName = props.processName || `业务流程_${new Date().getTime()}`;
    let xmlString = xml || DefaultEmptyXML(newId, newName, props.prefix);
    try {
      let { warnings } = await bpmnModeler.importXML(xmlString);
      if (warnings && warnings.length) {
        warnings.forEach((warn) => console.warn(warn));
      }
    } catch (e: any) {
      console.error(`[Process Designer Warn]: ${e.message || e}`);
    }
  };

  // 下载流程图到本地
  const downloadProcess = async (type) => {
    try {
      // 按需要类型创建文件并下载
      if (type === 'xml' || type === 'bpmn') {
        const { err, xml } = await bpmnModeler.saveXML();
        // 读取异常时抛出异常
        if (err) {
          console.error(`[Process Designer Warn ]: ${err.message || err}`);
        }
        let { href, filename } = setEncoded(type.toUpperCase(), xml);
        downloadFunc(href, filename);
      } else {
        const { err, svg } = await bpmnModeler.saveSVG();
        // 读取异常时抛出异常
        if (err) {
          return console.error(err);
        }
        let { href, filename } = setEncoded('SVG', svg);
        downloadFunc(href, filename);
      }
    } catch (e: any) {
      console.error(`[Process Designer Warn ]: ${e.message || e}`);
    }
    // 文件下载方法
    function downloadFunc(href, filename) {
      if (href && filename) {
        let a = document.createElement('a');
        a.download = filename; //指定下载的文件名
        a.href = href; //  URL对象
        a.click(); // 模拟点击
        URL.revokeObjectURL(a.href); // 释放URL 对象
      }
    }
  };

  // 根据所需类型进行转码并返回下载地址
  const setEncoded = (type, data) => {
    const filename = 'diagram';
    const encodedData = encodeURIComponent(data);
    return {
      filename: `${filename}.${type}`,
      href: `data:application/${
        type === 'svg' ? 'text/xml' : 'bpmn20-xml'
      };charset=UTF-8,${encodedData}`,
      data: data,
    };
  };

  // 加载本地文件
  const importLocalFile = () => {
    const file = refFile.value.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      let xmlStr = this.result;
      createNewDiagram(xmlStr);
    };
  };
  /* ------------------------------------------------ refs methods ------------------------------------------------------ */
  const downloadProcessAsXml = () => {
    downloadProcess('xml');
  };
  const downloadProcessAsBpmn = () => {
    downloadProcess('bpmn');
  };
  const downloadProcessAsSvg = () => {
    downloadProcess('svg');
  };
  const processSimulation = () => {
    simulationStatus.value = !simulationStatus.value;
    props.simulation && bpmnModeler.get('toggleMode', 'strict').toggleMode();
  };
  const processRedo = () => {
    bpmnModeler.get('commandStack').redo();
  };
  const processUndo = () => {
    bpmnModeler.get('commandStack').undo();
  };
  const processZoomIn = (zoomStep = 0.1) => {
    let newZoom = Math.floor(defaultZoom.value * 100 + zoomStep * 100) / 100;
    if (newZoom > 4) {
      throw new Error('[Process Designer Warn ]: The zoom ratio cannot be greater than 4');
    }
    defaultZoom.value = newZoom;
    bpmnModeler.get('canvas').zoom(defaultZoom.value);
  };
  const processZoomOut = (zoomStep = 0.1) => {
    let newZoom = Math.floor(defaultZoom.value * 100 - zoomStep * 100) / 100;
    if (newZoom < 0.2) {
      throw new Error('[Process Designer Warn ]: The zoom ratio cannot be less than 0.2');
    }
    defaultZoom.value = newZoom;
    bpmnModeler.get('canvas').zoom(defaultZoom.value);
  };
  const processReZoom = () => {
    defaultZoom.value = 1;
    bpmnModeler.get('canvas').zoom('fit-viewport', 'auto');
  };
  const processRestart = () => {
    recoverable.value = false;
    revocable.value = false;
    createNewDiagram(null);
  };
  const elementsAlign = (align) => {
    const Align = bpmnModeler.get('alignElements');
    const Selection = bpmnModeler.get('selection');
    const SelectedElements = Selection.get();
    if (!SelectedElements || SelectedElements.length <= 1) {
      createMessage.info('请按住 Shift 键选择多个元素对齐');
      // alert('请按住 Ctrl 键选择多个元素对齐
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '警告',
      content: '自动对齐可能造成图形变形，是否继续？',
      onOk: () => {
        Align.trigger(SelectedElements, align);
      },
    });
  };
  /*-----------------------------    方法结束     ---------------------------------*/
  const previewProcessXML = () => {
    bpmnModeler.saveXML({ format: true }).then(({ xml }) => {
      previewResult.value = xml;
      previewType.value = 'xml';
      previewModelVisible.value = true;
    });
  };
  const previewProcessJson = () => {
    bpmnModeler.saveXML({ format: true }).then(({ xml }) => {
      const rootNodes = new XmlNode(XmlNodeType.Root, parseXmlString(xml));
      previewResult.value = rootNodes.parent?.toJSON() as unknown as string;
      previewType.value = 'json';
      previewModelVisible.value = true;
    });
  };
const processSave = async () => {
    
    
  const { err, xml } = await bpmnModeler.saveXML();
    // 读取异常时抛出异常
    if (err) {
      // this.$modal.msgError('保存模型失败，请重试！')
      alert('保存模型失败，请重试！');
      return;
    }
    // 触发 save 事件
    emit('save', xml);
  };
  onBeforeMount(() => {
  });
onMounted(() => {
    initBpmnModeler();
    createNewDiagram(props.value);
  });
  onBeforeUnmount(() => {
    if (bpmnModeler) bpmnModeler.destroy();
    emit('destroy', bpmnModeler);
    bpmnModeler = null;
  });
</script>
<style lang="less">
  .full-modal {
    .ant-modal {
      max-width: 100%;
    }

    .ant-modal-body {
      height: 60vh;
      overflow: auto;
    }
  }
</style>
