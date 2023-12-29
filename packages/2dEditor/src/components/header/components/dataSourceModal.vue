<template>
  <Modal
    width="800px"
    v-model:open="modalVisible"
    title="选择数据源设备"
    :cancel-button-props="{ style: { display: 'none' } }"
    @cancel="handleCancel"
    @ok="handleSubmit"
  >
    <div class="p-8px">
      <div
        class="h-80px overscroll-auto border-1px border-solid border-[#eee] p-3 box-border shadow"
      >
        <a-tag
          v-for="(item, index) in selectList"
          closable
          @close.prevent="closeEvent(item, index)"
          color="green"
        >
          {{ item.deviceName }}
        </a-tag>
      </div>

      <div class="flex h-[290px] gap-5 mt-5">
        <div
          class="flex flex-wrap gap-1 border-1px border-solid border-[#eee] flex-1 overflow-auto shadow"
        >
          <a-button
            class="m-10px"
            v-for="item in productList"
            @click="proSelect(item)"
          >
            {{ item.productName }}
          </a-button>
        </div>
        <div
          class="border-1px border-solid border-[#eee] flex-1 overflow-auto shadow p-1"
        >
          <Row>
            <Col :span="12" v-for="item in deviceList">
              <a-checkbox
                class="!m-10px"
                v-model:checked="item.checked"
                @change="(e) => checkedChange(e, item)"
              >
                {{ item.deviceName }}
              </a-checkbox>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useContext } from '/@/hooks/useContext'
import {
  Modal,
  Row,
  Col,
  Tag as ATag,
  Button as AButton,
  Checkbox as ACheckbox
} from 'ant-design-vue'
type Props = {
  open: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false
})

const { api, deviceDataSource } = useContext()

const { selectList, productList } = toRefs(deviceDataSource)

const emit = defineEmits(['update:open'])

const modalVisible = ref(false)

watchEffect(() => {
  modalVisible.value = props.open
})

watch(
  modalVisible,
  (v) => {
    emit('update:open', v)
  },
  {
    immediate: false
  }
)

const handleCancel = () => {
  modalVisible.value = false
}

const handleSubmit = async () => {
  api.value.bindingDevice(
    '',
    selectIds.value.length ? selectIds.value.join() : ''
  )
  handleCancel()
}

const deviceList = ref<any[]>([])

const getDeviceList = (productId: string) => {
  api.value.getDeviceList(productId).then((res: any) => {
    deviceList.value = res.map((item: any) => {
      if (selectList.value.some((child) => child.id === item.id)) {
        item.checked = true
      }
      return item
    })
  })
}

const selectIds = computed(() => {
  return selectList.value.map((item) => item.id)
})

const closeEvent = (item, index) => {
  // 选中列表
  selectList.value.splice(index, 1)
  // 设备勾选状态
  deviceList.value.forEach((device) => {
    if (device.id === item.id) {
      item.checked = false
    }
  })
}

const proSelect = (item) => {
  getDeviceList(item.id)
}

const checkedChange = (e, item) => {
  if (e.target.checked) {
    selectList.value.push(item)
  } else {
    const itemIndex = selectList.value.findIndex(
      (child) => child.id === item.id
    )
    selectList.value.splice(itemIndex, 1)
  }
}
</script>

<style scoped lang="less"></style>
../../../hooks/useContext
