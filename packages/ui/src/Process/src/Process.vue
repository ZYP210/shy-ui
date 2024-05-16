<template>
  <div class="process-wrapper">
    <div class="process-header text-[#1B1F24] text-14px">
      <BasicTitle>
        {{ props.title }}
      </BasicTitle>
    </div>
    <div class="process-body">
      <Timeline>
        <TimelineItem v-for="(item, index) in data" :key="index">
          <template #dot>
            <div
              class="process-dot"
              :class="{ ['process-dot-first']: +index === 0 }"
            ></div>
          </template>

          <template
            v-for="({ key, label, customRender }, _cIndex) in props.columns"
            :key="_cIndex"
          >
            <div v-if="item[key]" class="process-item">
              <span v-if="label"> {{ label }}：</span>
              <span v-if="customRender">
                <component
                  :is="h('span', null, customRender(item))"
                ></component>
              </span>
              <span v-else>
                {{ item[key] }}
              </span>
            </div>
          </template>
        </TimelineItem>
      </Timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { BasicTitle } from '../../Basic'
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
    type: Array as PropType<
      { key: string; label?: string; customRender?: (record: object) => any }[]
    >,
    default: () => [
      {
        key: 'processName'
      },
      {
        key: 'user',
        label: '申请人'
      },
      {
        key: 'suggestion',
        label: '建议'
      },
      {
        key: 'result',
        label: '结果'
      }
    ]
  }
})
</script>

<style scoped lang="less">
.process-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 2px;
  width: 288px;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid var(--gray-3);
  background: var(--gray-0);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04),
    0px 1px 1px 0px rgba(0, 0, 0, 0.02);
  z-index: 100;

  .process-header {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    color: #1b1f24;
    text-align: left;
    font-style: normal;
  }

  .process-body {
    padding-top: 4px;
    padding-left: 10px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      position: absolute;
      height: 10px;
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 10px 10px var(--gray-2);
      border: solid 2px transparent;
      background-color: transparent;
      border-radius: 10px;

      &:active,
      &:hover {
        box-shadow: inset 0 0 10px 10px var(--gray-3);
        background-color: transparent;
      }
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      border: solid 2px transparent;
      background: transparent;
    }

    .process-item {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #1b1f24;
      line-height: 16px;
      text-align: left;
      font-style: normal;
      padding: 2px 0;

      &:nth-child(1) {
        padding: 3px 0;
        font-size: 14px;
      }

      &:nth-last-child(1) {
        font-family: unset;
        color: var(--gray-4);
      }
    }

    .process-dot {
      width: 12px;
      height: 12px;
      border-radius: 12px;
      border: 1px solid var(--gray-3);

      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: var(--gray-3);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .process-dot-first {
      border: 1px solid var(--primary-5);

      &::before {
        background: var(--primary-5);
      }
    }
  }
}
</style>
