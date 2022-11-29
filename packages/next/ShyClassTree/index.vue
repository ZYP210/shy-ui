<template>
  <section class="shy-class-tree">
    <a-input-search
      v-model:value="search"
      placeholder="请输入查找内容"
      style="width: 100%;"
      @search="onSearchHndler"
    />
    <a-divider />
    <div class="shy-class-tree-main">
      <a-directory-tree
        :showLine="treeOption.showLine"
        v-model:selectedKeys="treeOption.selectedKeys"
        :fieldNames="treeOption.fieldNames"
        :tree-data="props.data"
        @select="treeSelectHanlder"
      >
      </a-directory-tree>
    </div>
  </section>
</template>
<script setup lang="ts">
import { defineEmits, reactive, ref, watch } from 'vue'
const props = defineProps({
  data: {
    required: true,
    type: Array<object>
  },
  treeOption: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits(['onSearch', 'treeSelect'])

const search = ref('')
const onSearchHndler = () => {
  emit('onSearch', search.value)
}

const treeSelectHanlder = (selectedKeys: Array<string>, e: any) => {
  emit('treeSelect', { selectedKeys, e })
}

let treeOption = reactive({
  showLine: false,
  selectedKeys: [],
  expandedKeys: [],
  fieldNames: {
    children: 'children',
    title: 'title',
    key: 'key'
  }
})

watch(
  () => props.treeOption,
  (newVal) => {
    Object.assign(treeOption, newVal)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="less" scoped>
.shy-class-tree {
  width: 100%;
  height: 100%;

  &-main {
    width: 100%;
  }
}
</style>
