<template>
  <Icon icon="ri:24-hours-fill" :size="24"></Icon>

  <div>
    <SvgIcon size="14" name="51" />
    <SvgIcon size="14" name="moon" />
  </div>

  <div class="w-300px">
    <IconPicker mode="svg" :pageSize="30" :copy="true" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Icon, SvgIcon, IconPicker } from '3h1-ui'
export default defineComponent({
  components: { Icon, SvgIcon, IconPicker }
})
</script>
