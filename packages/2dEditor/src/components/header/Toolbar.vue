<template>
  <div class="flex-auto flex gap-10 items-center">
    <div
      v-for="tool of toolbarData"
      :key="tool.key"
      class="cursor-pointer"
      @click="toolbarFunction[tool.action || '']"
    >
      <a-dropdown>
        <span class="mr-1">{{ tool.name }}</span>
        <component :is="tool.icon" />
        <template #overlay>
          <div v-if="tool.children">
            <a-menu>
              <a-menu-item
                v-for="child of tool.children"
                :key="child.key"
                @click="toolbarFunction[child.action || '']"
              >
                <component :is="child.icon" />
                <span>{{ child.name }}</span>
              </a-menu-item>
            </a-menu>
          </div>
          <div v-else-if="tool.render">
            <a-menu>
              <component :is="tool.render()" />
            </a-menu>
          </div>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toolbarData, toolbarFunction } from './Toolbar.data';
import {
  Dropdown as ADropdown,
  Menu as AMenu,
  MenuItem as AMenuItem,
} from 'ant-design-vue';
</script>
<style scoped lang="less"></style>
