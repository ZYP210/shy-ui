<template>
  <div class="controlBox" :style="controlBoxStyle">
    <div class="controlBox-btn" :style="btnStyle" @click="showMenu">
      {{ !flag ? '点 我' : 'X' }}
    </div>
    <div class="controlBox-title" v-show="flag">菜单导航</div>
    <div class="controlBox-inner" v-show="flag">
      <div class="controlBox-inner-item" v-for="item in URL" :key="item">
        <router-link :to="`/${item}`">{{ item }}</router-link>
      </div>
    </div>
  </div>

  <router-view></router-view>
</template>
<script lang="ts" setup>
const URL = ['Table', 'TablePlus', 'Form', 'ModalView']
const controlBoxStyle = ref({
  top: '30px',
  width: '58px',
  height: '30px',
  borderRadius: '10%',
  padding: '0'
})
const btnStyle = ref({
  textAlign: 'center'
})
const flag = ref(false)
const showMenu = () => {
  controlBoxStyle.value.top = flag.value ? '30px' : '50%'
  controlBoxStyle.value.width = flag.value ? '58px' : '1000px'
  controlBoxStyle.value.height = flag.value ? '30px' : '600px'
  controlBoxStyle.value.borderRadius = flag.value ? '10%' : '15px'
  controlBoxStyle.value.padding = flag.value ? '0' : '15px'
  btnStyle.value.textAlign = flag.value ? 'center' : 'right'
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
  transition: all 0.5s ease;

  &-btn {
    color: red;
    position: absolute;
    top: 0;
    width: 97%;
    line-height: 30px;
    z-index: 99999;
    cursor: pointer;
  }

  &-title {
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 20px;
  }

  &-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    &-item {
      margin: 0 10px;
    }
  }
}
</style>
