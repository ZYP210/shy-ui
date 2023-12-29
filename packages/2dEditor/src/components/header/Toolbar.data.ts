import type { Component } from 'vue';
import { Slider, message } from 'ant-design-vue';

import { useEventBus } from '/@/hooks/useEventBus';
const eventbus = useEventBus();

export type ToolbarType = {
  key: string;
  name: string;
  icon?: Component | String;
  action?: string;
  children?: ToolbarType[];
  render?: () => Component;
};

function isShowChild(pen, store) {
  let selfPen = pen;
  while (selfPen && selfPen.parentId) {
    const oldPen = selfPen;
    selfPen = store.pens[selfPen.parentId];
    const showChildIndex = selfPen?.calculative?.showChild;
    if (showChildIndex != undefined) {
      const showChildId = selfPen.children[showChildIndex];
      if (showChildId !== oldPen.id) {
        return false;
      }
    }
  }
  return true;
}

const downloadSvg = () => {
  const rect = meta2d.getRect();
  rect.x -= 10;
  rect.y -= 10;
  const ctx = new C2S(rect.width + 20, rect.height + 20);
  ctx.textBaseline = 'middle';
  for (const pen of meta2d.store.data.pens) {
    if (pen.visible == false || !isShowChild(pen, meta2d.store)) {
      continue;
    }
    meta2d.renderPenRaw(ctx, pen, rect);
  }

  let mySerializedSVG = ctx.getSerializedSvg();
  if (meta2d.store.data.background) {
    mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
    mySerializedSVG = mySerializedSVG.replace(
      '{{bkRect}}',
      `<rect x="0" y="0" width="100%" height="100%" fill="${meta2d.store.data.background}"></rect>`,
    );
  } else {
    mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
    mySerializedSVG = mySerializedSVG.replace('{{bkRect}}', '');
  }

  mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

  const urlObject = URL || window;
  const export_blob = new Blob([mySerializedSVG]);
  const url = urlObject.createObjectURL(export_blob);

  const a = document.createElement('a');
  a.setAttribute('download', `${meta2d.store.data.name || 'shy.meta2d'}.svg`);
  a.setAttribute('href', url);
  const evt = document.createEvent('MouseEvents');
  evt.initEvent('click', true, true);
  a.dispatchEvent(evt);
};

export const toolbarData: ToolbarType[] = [
  {
    key: 'save',
    name: '保存',
    icon: '',
    action: 'saveFile',
  },
  {
    key: 'magnifier',
    name: '放大镜',
    icon: '',
    action: 'openMagnifier',
  },
  {
    key: 'map',
    name: '缩略图',
    icon: '',
    action: 'openMap',
  },
  {
    key: 'pen',
    name: '钢笔',
    icon: '',
    action: 'usePen',
  },
  {
    key: 'pencil',
    name: '铅笔',
    icon: '',
    action: 'usePencil',
  },
  {
    key: 'undo',
    name: '撤销',
    icon: 'l-angle-left',
    action: 'undo',
  },
  {
    key: 'redo',
    name: '重做',
    icon: 'l-angle-right',
    action: 'redo',
  },
  {
    key: 'grid',
    name: '网格',
    icon: '',
    action: 'grid',
  },
  {
    key: 'rule',
    name: '标尺',
    icon: '',
    action: 'rule',
  },
  {
    key: 'saveAs',
    name: '保存为',
    icon: '',
    children: [
      {
        key: 'saveAsSvg',
        name: 'svg',
        action: 'saveAsSvg',
        icon: '',
      },
      {
        key: 'saveAsPng',
        name: 'png',
        action: 'saveAsPng',
        icon: '',
      },
    ],
  },
  {
    key: 'scale',
    name: '缩放',
    icon: '',
    render: () => {
      return h(Slider, {
        style: {
          width: '200px',
        },
        value: scale.value,
        'onUpdate:value': (val: number) => {
          scale.value = val;
          scaleView(val);
        },
      });
    },
  },
];
const scale = ref(0);

eventbus.customOn('opened', () => {
  meta2d.on('scale', (data: any) => {
    scale.value = +(
      data.toFixed(1) *
      (meta2d.store.options.maxScale - meta2d.store.options.minScale)
    ).toFixed();
  });
});

const scaleView = (val: number) => {
  const { maxScale, minScale } = meta2d.store.options;
  meta2d.scale(((maxScale - minScale) / 100) * val);
  meta2d.centerView();
};

export const toolbarFunction: any = {
  saveFile() {
    const jsonData = meta2d.data();
    const json = JSON.stringify(jsonData);
    console.log(json);
    message.success('保存成功');
    // const file = new Blob([json], { type: "application/json" });
    // const link = URL.createObjectURL(file);
    // let a = document.createElement("a");
    // a.setAttribute("download", meta2d.fileName || "未命名");
    // a.setAttribute("href", link);
    // a.click();
  },
  openMagnifier() {
    if (meta2d.canvas.magnifierCanvas.magnifier) {
      // 判断放大镜状态
      meta2d.hideMagnifier(); // 关闭放大镜
    } else {
      meta2d.showMagnifier(); // 打开放大镜
    }
  },
  openMap() {
    if (meta2d.map?.isShow) {
      meta2d.hideMap();
    } else {
      meta2d.showMap();
    }
  },
  usePen() {
    if (meta2d.canvas.drawingLineName) {
      meta2d.drawLine();
      meta2d.finishPencil();
    } else {
      meta2d.drawLine('curve');
    }
  },
  usePencil() {
    if (meta2d.canvas.pencil) {
      meta2d.stopPencil();
      meta2d.finishPencil();
    } else {
      meta2d.drawingPencil();
    }
  },
  undo() {
    meta2d.undo();
  },
  redo() {
    meta2d.redo();
  },
  grid() {
    if (meta2d.store.data.grid) {
      meta2d.setGrid({
        grid: false,
      });
    } else {
      meta2d.setGrid({
        grid: true,
        gridColor: '#e2e2e2',
        gridSize: 10,
        gridRotate: 0,
      });
    }
    meta2d.render();
  },
  rule() {
    if (meta2d.store.data.rule) {
      meta2d.setRule({
        rule: false,
      });
    } else {
      meta2d.setRule({
        rule: true,
        ruleColor: '#414141',
      });
    }
    meta2d.render();
  },
  manual() {
    meta2d.toggleAnchorMode();
  },

  saveAsPng() {
    let name = meta2d.store.data.name;
    if (name) {
      name += '.png';
    }
    meta2d.downloadPng(name);
  },

  saveAsSvg() {
    downloadSvg();
  },
};
