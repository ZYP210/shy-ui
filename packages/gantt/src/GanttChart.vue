<template>
  <div class="gantt-chart">
    <div
      class="gantt-chart-container"
      ref="ganttMapContainerRef"
      @scroll.native="handleScrollEvent($event, 'x')"
    >
      <div
        class="gantt-chart-header"
        ref="ganttChartHeaderRef"
        :style="headerStyle"
      >
        <div class="header-block" v-for="(block, index) in blocks" :key="index">
          {{ block.time }}
        </div>
      </div>
      <div
        class="gantt-chart-body"
        @scroll.native="handleScrollEvent($event, 'y')"
        ref="ganttChartBodyRef"
        :style="headerStyle"
      >
        <div class="svg-container">
          <current-line
            :minTime="minTime"
            :secondWidth="secondWidth"
          ></current-line>

          <template v-for="(svg, index) in svgList" :key="index">
            <div class="gantt-chart-item">
              <a-popover title="任务名" placement="right">
                <div
                  ref="rectRef"
                  class="gantt-chart-item-bar"
                  :style="{
                    width: `${svg.width}px`,
                    left: `${svg.position}px`
                  }"
                ></div>
              </a-popover>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { reactive, ref, computed, watchEffect, nextTick } from 'vue'

// 点击变色
const handleClick = (index) => {
  if (highLight[index]) {
    highLight[index] = false
  } else {
    highLight[index] = true
  }
}
const highLight: any = reactive({})
const rectRef = ref()
watchEffect(() => {
  Object.keys(highLight).forEach((key) => {
    const color = highLight[key] ? '#0f505e' : 'transparent'
    rectRef.value[key].style.backgroundColor = color
  })
})

const props = withDefaults(defineProps<{ data: any }>(), {})

const formatTime = (unix: number) => {
  const day = dayjs.unix(unix)
  return day.format('YYYY-MM-DD HH:mm:ss')
}

const addHour = (unix: number, hour: number) => {
  const day = dayjs.unix(unix)
  return day.add(hour, 'hour').unix()
}

// 设置时间间隔/h
const timeInterval = ref(24)
// 设置每块宽度
const blockWidth = ref(200)

// 时间
const allTime = computed(() => {
  return props.data.map((item) => {
    return {
      startTime: dayjs(item.startTime).unix(),
      endTime: dayjs(item.endTime).unix()
    }
  })
})
// 最小时间
const minTime = computed(() => {
  return allTime.value.reduce((acc, cur) => {
    return cur.startTime < acc ? cur.startTime : acc
  }, allTime.value[0].startTime)
})
// 最大时间
const maxTime = computed(() => {
  return allTime.value.reduce((acc, cur) => {
    return cur.endTime > acc ? cur.endTime : acc
  }, allTime.value[0].endTime)
})

// 每秒宽度
const secondWidth = computed(() => {
  return blockWidth.value / (timeInterval.value * 60 * 60)
})

const blockLength = computed(() => {
  return (
    Math.floor(
      (maxTime.value - minTime.value) / (timeInterval.value * 60 * 60)
    ) + 2
  )
})

// 总宽度
const totalWidth = computed(() => {
  return blockWidth.value * blockLength.value
})
// 总高度
const totalHeight = computed(() => {
  return 40 * svgList.value.length
})

// 滚动事件
const scrollbarXRef = ref()
const scrollbarYRef = ref()
const ganttMapContainerRef = ref()
const ganttChartBodyRef = ref()
const ganttDataRankRef = ref()
const ganttChartHeaderRef = ref()

const headerStyle = reactive({
  transform: 'translateY(0)',
  width: `${totalWidth.value}px`
})

const handleScrollEvent = (event, type: 'x' | 'y') => {
  emit('scroll-y', ganttChartBodyRef.value.scrollTop)
}
const setScrollY = (y) => {
  ganttChartBodyRef.value.scrollTop = y
}
defineExpose({ setScrollY })
const emit = defineEmits(['scroll-y'])

//
const blocks = computed(() => {
  const blocks = []
  for (let i = 0; i < blockLength.value; i++) {
    const unix = addHour(minTime.value, i * timeInterval.value)
    const obj = {
      unix,
      time: formatTime(unix)
    }
    blocks.push(obj)
  }
  return blocks
})

const svgList = computed(() => {
  return allTime.value.map((item) => {
    const obj = {
      width: (item.endTime - item.startTime) * secondWidth.value,
      position:
        0.5 * blockWidth.value +
        (item.startTime - minTime.value) * secondWidth.value
    }
    return obj
  })
})

const scroll = (event: any, type: 'x' | 'y' | 'xbar' | 'ybar') => {
  if (type === 'x') return syncX(event.target.scrollLeft, [scrollbarXRef.value])
  if (type === 'y')
    return syncY(event.target.scrollTop, [
      scrollbarYRef.value,
      ganttDataRankRef.value
    ])
  if (type === 'xbar')
    return syncX(event.target.scrollLeft, [ganttMapContainerRef.value])
  if (type === 'ybar')
    return syncY(event.target.scrollTop, [
      ganttChartBodyRef.value,
      ganttDataRankRef.value
    ])
}
const syncX = (left: number, domList: HTMLElement[]) => {
  nextTick(() => {
    domList.forEach((dom) => {
      dom.scrollLeft = left
    })
  })
}
const syncY = (top: number, domList: HTMLElement[]) => {
  nextTick(() => {
    domList.forEach((dom) => {
      dom.scrollTop = top
    })
  })
}
</script>

<style scoped lang="less">
.gantt-chart {
  flex: auto;
  overflow: hidden;

  .gantt-chart-container {
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    height: 100%;

    background: no-repeat left top/100%;
    background-image: linear-gradient(
        180deg,
        #e8eaec,
        #e8eaec 1px,
        transparent 1px,
        transparent
      ),
      linear-gradient(0deg, #e8eaec, #e8eaec 1px, transparent 1px, transparent),
      linear-gradient(
        270deg,
        #e8eaec,
        #e8eaec 1px,
        transparent 1px,
        transparent
      );
  }

  &-header {
    width: 100%;
    height: 40px;
    display: flex;
    flex: none;
    box-sizing: border-box;
    overflow-x: auto;
    background: repeat left top/200px 40px;
    background-image: linear-gradient(
        180deg,
        transparent,
        transparent 39px,
        #e8eaec 39px,
        #e8eaec 40px
      ),
      linear-gradient(
        90deg,
        transparent,
        transparent 199px,
        #e8eaec,
        199px,
        #e8eaec 200px
      );

    .header-block {
      width: 200px;
      flex: 0 0 auto;
      font-size: 12px;
      padding-top: 10px;
      text-align: center;
      background: no-repeat left top/100% 8px;
      background-image: linear-gradient(
        90deg,
        transparent,
        transparent 100px,
        #000 100px,
        #000 101px,
        transparent 101px,
        transparent
      );
    }
  }
  &-body {
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    .svg-container {
      position: relative;
      background: repeat left top/200px 40px;
      background-image: linear-gradient(
          180deg,
          transparent,
          transparent 39px,
          #e8eaec 39px,
          #e8eaec 40px
        ),
        linear-gradient(
          90deg,
          transparent,
          transparent 199px,
          #e8eaec,
          199px,
          #e8eaec 200px
        );
      display: flex;
      flex-flow: column nowrap;
    }
  }
}

.gantt-chart-item {
  height: 40px;
  position: relative;
}
.gantt-chart-item-bar {
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
  height: 20px;
  position: absolute;
  box-sizing: border-box;
  background-color: #1890ff;
}
</style>
