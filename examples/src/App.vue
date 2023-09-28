<template>
  <div class="controlBox" :style="controlBoxStyle">
    <div class="controlBox-btn" @click="showMenu">
      {{ !flag ? 'MENU' : '⨉' }}
    </div>
    <div class="controlBox-title" :style="{ opacity: flag ? 1 : 0 }">
      菜单导航
    </div>
    <div class="controlBox-inner" :style="{ opacity: flag ? 1 : 0 }">
      <div class="controlBox-inner-item" v-for="item in URL" :key="item">
        <router-link :to="`/${item}`">{{ item }}</router-link>
      </div>
    </div>
  </div>

  <router-view></router-view>
</template>
<script lang="ts" setup>
const URL = [
  'AiMap',
  'AdvancedSearch',
  'BasicHelp',
  'BasicTitle',
  'ButtonView',
  'ClickOutSide',
  'CodeEditor',
  'CollapseContainer',
  'CountDown',
  'CountDownInput',
  'CountTo',
  'Cropper',
  'Description',
  'Drawer',
  'FlowChart',
  'Form',
  'Gantt',
  'IconView',
  'LazyContainer',
  'Loading',
  'ModalView',
  'Page',
  'Process',
  'Qrcode',
  'ScrollBar',
  'ScrollContainer',
  'SearchTest',
  'StrengthMeter',
  'Table',
  'TableAction',
  'TableAnt',
  'TableChildren',
  'TablePlus',
  'TablePlusEdit',
  'Tinymce',
  'Transition',
  'Tree',
  'UserSelectTest'
]
const controlBoxStyle = ref({
  top: '30px',
  width: '58px',
  height: '30px',
  borderRadius: '10%',
  padding: '0'
})
const flag = ref(false)
const showMenu = () => {
  controlBoxStyle.value.top = flag.value ? '30px' : '50%'
  controlBoxStyle.value.width = flag.value ? '58px' : '1000px'
  controlBoxStyle.value.height = flag.value ? '30px' : '600px'
  controlBoxStyle.value.borderRadius = flag.value ? '10%' : '15px'
  controlBoxStyle.value.padding = flag.value ? '0' : '15px'
  flag.value = !flag.value
}
</script>

<style lang="less">
html,
body {
  height: 100%;
}

.controlBox {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(230, 230, 230, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid #eee;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  transition: all 0.8s cubic-bezier(0.25, 0.5, 0.1, 1);
  overflow: hidden;

  &-btn {
    color: red;
    position: absolute;
    top: 0;
    width: 98%;
    text-align: right;
    line-height: 30px;
    padding-right: 7px;
    z-index: 99999;
    cursor: pointer;
    transition: all 1s cubic-bezier(0.25, 0.5, 0.1, 1);
  }

  &-title {
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 20px;
    transition: all 1s cubic-bezier(0.25, 0.5, 0.1, 1);
  }

  &-inner {
    width: 970px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    transition: all 2s cubic-bezier(0.25, 0.5, 0.1, 1);

    &-item {
      text-align: center;
      width: 150px;
      margin-bottom: 20px;
    }
  }
}
</style>
