import MyProcessDesigner from './designer';
import MyProcessPenal from './penal';
import MyProcessViewer from './designer/index2';

import CustomContentPadProvider from './designer/plugins/content-pad';
import CustomPaletteProvider from './designer/plugins/palette';

import './theme/index.less';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

export {
  MyProcessDesigner,
  MyProcessPenal,
  MyProcessViewer,
  CustomContentPadProvider,
  CustomPaletteProvider,
};
