<template>
  <div class="drawer" :style="{ width: `${drawerWidth}px`, [align]: '0' }">
    <div class="w-full h-full overflow-hidden">
      <div :style="{ width: `${width}px` }" class="h-full">
        <slot></slot>
      </div>
    </div>
    <div :class="`drawer-button-${align}`" @click="handleClick" />
    <div class="i-ant-design:double-left-outlined" :class="[`drawer-button-icon-${align}`, rotateClass]" />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  open: boolean;
  width: number;
  align: "left" | "right";
};

const props = withDefaults(defineProps<Props>(), {
  open: true,
  width: 300,
  align: "left",
});

const emit = defineEmits(["update:open"]);

const rotateClass = computed(() => {
  const rotate = "rotate-180";
  switch (props.align) {
    case "left":
      return props.open ? "" : rotate;
    case "right":
      return props.open ? rotate : "";
  }
});

const handleClick = () => {
  emit("update:open", !props.open);
};

const drawerWidth = ref();
watch(
  () => props.open,
  (val) => {
    drawerWidth.value = val ? props.width : 10;
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lang="less">
.drawer {
  position: absolute;
  z-index: 100;
  top: 10px;
  bottom: 10px;
  height: calc(100% - 20px);
  transition: all ease 0.3s;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  &-button {
    .button {
      content: "";
      cursor: pointer;
      position: absolute;
      top: 40%;
      width: 15px;
      height: 45px;
      background-color: #fff;
      z-index: -1;
    }

    &-left {
      .button;
      right: -15px;
      box-shadow: 4px 0px 5px 0px rgba(0, 0, 0, 0.1);
      transform: perspective(6px) rotateX(0) rotateY(12deg) translateZ(0);
    }

    &-right {
      .button;
      left: -15px;
      box-shadow: -4px 0px 5px 0px rgba(0, 0, 0, 0.1);
      transform: perspective(6px) rotateX(180deg) rotateY(12deg) translateZ(0);
    }

    &-icon {
      .icon {
        cursor: pointer;
        position: absolute;
        top: calc(40% + 15px);
        color: #2c3e50;
        transition: all ease 0.3s;
        pointer-events: none;
      }
      &-left {
        .icon;
        right: -12px;
      }
      &-right {
        .icon;
        left: -12px;
      }
    }
  }
}
</style>

