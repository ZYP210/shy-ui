<template>
  <div class="p-4 lazy-base-demo">
    <div class="lazy-base-demo-wrap">
      <h1>向下滚动</h1>

      <LazyContainer @init="init" :timeout="10">
        <template #skeleton>
          <Skeleton :rows="10" />
        </template>
      </LazyContainer>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Skeleton } from 'ant-design-vue'

import { LazyContainer } from '3h1-ui'

export default defineComponent({
  components: { LazyContainer, Skeleton },

  setup() {
    const init = () => {
      console.log('1', 1)
    }

    return { init }
  }
})
</script>
<style lang="less" scoped>
.lazy-base-demo {
  &-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    width: 50%;
    height: 2000px;
    text-align: center;
    background: #fff;
    flex-direction: column;
  }

  h1 {
    margin: 20px 0;
    height: 1300px;
  }
}
</style>
