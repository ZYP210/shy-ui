<template>
  <ConfigProvider
    :locale="zhCN"
    :theme="getAntTheme"
  >
    <div class="controlBox" :style="controlBoxStyle">
      <div class="controlBox-btn" @click="handleSwitch">
        {{ !flag ? 'MENU' : '⨉' }}
      </div>
      <div class="controlBox-title" :style="{ opacity: flag ? 1 : 0 }">
        菜单导航
      </div>
      <div class="controlBox-inner" :style="{ opacity: flag ? 1 : 0 }">
        <div
          class="controlBox-inner-item"
          v-for="(item, index) in URLData"
          :key="index"
        >
          <div class="controlBox-inner-item-title">{{ item.title }}</div>
          <div class="controlBox-inner-item-link">
            <router-link
              @click="handleSwitch"
              :to="`/${e}`"
              v-for="(e, i) in item.urlAry"
              :key="i"
            >
              {{ e }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
import { URLData } from '/@/database/menu.data'
import { ref, reactive } from 'vue'
import { useTheme } from '@shy-plugins/use'

const { setThemeType, getAntTheme, setPrimaryColor } = useTheme()

const controlBoxStyle = reactive({
  top: '30px',
  width: '58px',
  height: '30px',
  borderRadius: '5px',
  padding: '0'
})
const flag = ref<boolean>(false)
const handleSwitch = () => {
  controlBoxStyle.top = flag.value ? '30px' : '50%'
  controlBoxStyle.width = flag.value ? '58px' : '1000px'
  controlBoxStyle.height = flag.value ? '30px' : '600px'
  controlBoxStyle.borderRadius = flag.value ? '5px' : '15px'
  controlBoxStyle.padding = flag.value ? '0' : '15px'
  flag.value = !flag.value
}

onMounted(() => {
  // setThemeType('dark')
  // setTimeout(() => {
  //   setPrimaryColor('#66ccff')
  // }, 2000)
})
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
  border: 1px solid #cbcbcb;
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
    justify-content: space-evenly;
    transition: all 2s cubic-bezier(0.25, 0.5, 0.1, 1);

    &-item {
      text-align: center;
      margin-bottom: 20px;

      &-title {
        color: #838383;
        font-size: 12px;
        margin: 10px 0;
      }

      &-link {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        & > a {
          margin: 5px 15px;
        }
      }
    }
  }
}
</style>
