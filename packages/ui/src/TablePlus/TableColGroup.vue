<template>
  <VxeColgroup :title="column.groupName" v-bind="column">
    <template v-for="c in column.children" :key="c.field">
      <TableColGroup
        v-if="c?.groupName"
        :column="c"
        @handleSortChange="handleSortChange"
      />
      <vxe-column v-else v-bind="c" :edit-render="c?.editRender || undefined">
        <template #default="config">
          <slot :name="c.field" v-bind="config">
            <template v-if="config.row._isEdit && column?.isEdit">
              <template v-if="c?.editComponentProps?.component === 'Switch'">
                <CellComponent
                  :checkedValue="1"
                  :unCheckedValue="0"
                  v-bind="c?.editComponentProps || {}"
                  v-model:checked="config.row[c.field]"
                />
              </template>

              <template v-else>
                <CellComponent
                  v-bind="c?.editComponentProps || {}"
                  v-model:value="config.row[c.field]"
                />
              </template>
            </template>

            <template v-else>
              <span
                v-if="
                  (c?.isEdit &&
                    c?.editComponentProps?.component === 'Select') ||
                  c?.editComponentProps?.component === 'ApiSelect'
                "
              >
                <CellComponent
                  v-bind="c?.editComponentProps || {}"
                  v-model:value="config.row[c.field]"
                  :bordered="false"
                  :showArrow="false"
                  :open="false"
                  :popoverVisible="false"
                />
              </span>

              <span
                v-else-if="
                  c?.isEdit && c?.editComponentProps?.component === 'Switch'
                "
              >
                <span>{{ getSwitchShowText(c, config.row) }}</span>
              </span>
              <span v-else>
                {{ config.row[c.field] }}
              </span>
            </template>
          </slot>
        </template>

        <template #header>
          <slot :name="`${c.field}Header`" v-bind="{ c }">
            <div style="display: flex; justify-content: space-between">
              <div>{{ c.title }}</div>
              <IconSort
                v-if="column?.sortable"
                @change="(type) => handleSortChange(column.field, type)"
              />
            </div>
          </slot>
        </template>
      </vxe-column>
    </template>
  </VxeColgroup>
</template>

<script lang="ts" setup>
import { VxeColumn, VxeColgroup } from 'vxe-table'
import { CellComponent } from './components/editable/CellComponent'
import IconSort from './components/Icon/Sort.vue'

type Props = {
  column?: any
}

defineProps<Props>()

const emits = defineEmits(['handleSortChange'])

const getSwitchShowText = (column: any, row: any) => {
  const {
    unCheckedChildren = '否',
    unCheckedValue = 0,
    checkedChildren = '是',
    checkedValue = 1
  } = column?.editComponentProps || {}

  if (row[column.field] == checkedValue) {
    return checkedChildren
  } else if (row[column.field] == unCheckedValue) {
    return unCheckedChildren
  } else {
    return ''
  }
}

const handleSortChange = (field, type) => {
  emits('handleSortChange', { field, type })
}
</script>

<style lang="less" scoped></style>
