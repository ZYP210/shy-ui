<template>
  <div class="shy-basic-table-advanced-search">
    <Row>
      <template v-for="schema in schemasAdvancedSearch" :key="schema.field">
        <Col :span="12">
          <Row align="middle" style="margin-bottom: 10px">
            <Col flex="0">
              <div style="width: 40px; text-align: left">
                {{ schema.label }}
              </div>
            </Col>
            <Col flex="1" style="margin-right: 10px">
              <Select style="width: 100%" :options="kvStringOperator"></Select>
            </Col>
            <Col flex="1" style="margin-right: 10px">
              <Input />
            </Col>

            <Col style="width: 120px">
              <Radio>忽略大小写</Radio>
            </Col>
          </Row>
        </Col>
      </template>
    </Row>

    <div class="shy-basic-table-advanced-search-footer">
      <Space>
        <BasicButton type="primary">确定</BasicButton>
        <BasicButton>取消</BasicButton>
        <BasicButton>重置</BasicButton>
      </Space>
    </div>
  </div>
</template>

<script lang="ts">
import { Select, Input, Row, Col, Space, Radio } from 'ant-design-vue'
import { useAdvancedSearchKv } from '../hooks/useAdvancedSearch'
import { BasicButton } from '../../../Button'
export default {
  props: {
    schemasAdvancedSearch: {
      default: () => [],
      type: Array
    }
  },
  components: {
    Select,
    Input,
    Row,
    Col,
    BasicButton,
    Space,
    Radio
  },
  setup(props, e) {
    console.log('e', e)
    const { getKvOperator } = useAdvancedSearchKv()
    const { kvStringOperator } = getKvOperator()

    return {
      kvStringOperator
    }
  }
}
</script>
