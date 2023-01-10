<template>
  <Icon icon="ri:24-hours-fill" :size="24"></Icon>

  <div>
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>

  <IconPicker :pageSize="30" :copy="true" />
</template>

<script>
import { defineComponent } from 'vue'
import { Icon, SvgIcon, IconPicker } from '3h1-ui'
export default defineComponent({
  components: { Icon, SvgIcon, IconPicker }
})
</script>
