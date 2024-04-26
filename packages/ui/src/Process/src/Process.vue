<template>
  <div class="process-wrapper m-15px">
    <div class="process-header text-[#1B1F24] text-14px">
      {{ props.title }}
    </div>
    <div class="process-body">
      <Timeline>
        <template v-for="(item, index) in data" :key="index">
          <TimelineItem>
            <template
              v-for="({ key, label, customRender }, cIndex) in props.columns"
              :key="cIndex"
            >
              <div
                class="process-item"
                :style="getStyle(cIndex)"
                v-if="item[key]"
              >
                <span v-if="label"> {{ label }}:</span>
                <span>{{ customRender ? customRender(item) : item[key] }}</span>
              </div>
            </template>
            <div class="process-time">
              {{ item.createTime }}
            </div>
          </TimelineItem>
        </template>
      </Timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timeline, TimelineItem } from 'ant-design-vue'

const props = defineProps({
  title: {
    type: String,
    default: '流程跳转信息'
  },
  data: {
    type: Object,
    default: () => {
      return [
        {
          processName: '流程启动',
          user: '管理员',
          content: 'content',
          createTime: '2023-03-03'
        },
        {
          processName: '新建缺陷',
          user: '管理员',
          content: 'content',
          createTime: '2023-03-03'
        },
        {
          processName: '缺陷检查',
          user: '工程师',
          content: 'content',
          createTime: '2023-03-03',
          suggestion: '通过',
          result: '通过'
        },
        {
          processName: '完成',
          user: '',
          content: 'content',
          createTime: '2023-03-03'
        }
      ]
    }
  },
  columns: {
    default: () => [
      { key: 'processName' },
      { key: 'user', label: '申请人' },
      { key: 'suggestion', label: '建议', customRender: (record) => '123' },
      { key: 'result', label: '结果' }
    ]
  }
})

const getStyle = (index) => {
  if (index === 0) {
    return {
      fontFamily: 'PingFangSC, PingFang SC',
      fontWeight: 500,
      fontSize: '14px',
      color: '#1B1F24',
      lineHeight: '20px',
      textAlign: 'left',
      fontStyle: 'normal'
    }
  } else {
    return {
      fontWeight: 400,
      fontSize: '12px',
      color: '#1B1F24',
      lineHeight: '16px',
      textAlign: 'left',
      fontStyle: 'normal'
    }
  }
}
</script>

<style scoped>
.process-wrapper {
  width: 288px;
  height: 100%;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d0d7de;
  padding-top: 8px;
  padding-left: 12px;
}

.process-header {
  line-height: 32px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 14px;
  color: #1b1f24;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}

.process-body {
  padding-top: 10px;
}

.process-time {
  font-size: 12px;
  color: #b6bdd2;
}
.process-item {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #1b1f24;
  line-height: 16px;
  text-align: left;
  font-style: normal;
  padding: 5px 0;
}
</style>
