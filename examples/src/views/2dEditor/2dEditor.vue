<template>
  <div class="h-full overflow-hidden">
    <Shy2dEditor @register="register" />
  </div>
</template>

<script setup lang="ts">
import { useShy2dEditor, Shy2dEditor } from '@shy-plugins/2d-edit'
import * as Api from './api'

const json = {
  x: 0,
  y: 0,
  scale: 1,
  pens: [
    {
      text: '测试',
      width: 160,
      height: 30,
      name: 'text',
      id: 'cf21b8b',
      children: [],
      x: 510,
      y: 40,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        { id: '0', penId: 'cf21b8b', x: 0.5, y: 0 },
        { id: '1', penId: 'cf21b8b', x: 1, y: 0.5 },
        { id: '2', penId: 'cf21b8b', x: 0.5, y: 1 },
        { id: '3', penId: 'cf21b8b', x: 0, y: 0.5 }
      ],
      rotate: 0,
      dataSource: {
        deviceSn: '0000002',
        flag: 'packetloss',
        dataResource: [
          {
            fromType: 2,
            resourceSn: '20037600016:0000002',
            flag: 'packetloss',
            unit: '',
            showName: 'packetLoss'
          }
        ]
      },
      connectedLines: [
        { lineId: '9fbaf10', lineAnchor: '6e707cf', anchor: '2' }
      ]
    },
    {
      name: 'echarts',
      width: 400,
      height: 300,
      externElement: true,
      form: [
        {
          key: 'dataY',
          name: '数据',
          type: 'text',
          readonly: true,
          placeholder: '仅绑定变量',
          multiple: true,
          isTime: false,
          isYCategory: false
        },
        {
          key: 'echarts',
          name: 'echarts',
          type: 'code',
          language: 'json',
          isNotString: true
        },
        {
          key: 'echarts',
          key2: 'max',
          type: 'number',
          name: '最大数量',
          placeholder: 'x'
        }
      ],
      disableAnchor: true,
      echarts: {
        option: {
          grid: { top: 10, bottom: 50, left: 40, right: 5 },
          dataZoom: [{ height: 16, bottom: 10 }],
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: { fontSize: 12 }
          },
          yAxis: { type: 'value', axisLabel: { fontSize: 12 } },
          series: [
            { data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }
          ]
        },
        max: 100
      },
      id: 'e7c87e7',
      children: [],
      x: 136,
      y: 132.5,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        { id: '0', penId: 'e7c87e7', x: 0.5, y: 0 },
        { id: '1', penId: 'e7c87e7', x: 1, y: 0.5 },
        { id: '2', penId: 'e7c87e7', x: 0.5, y: 1 },
        { id: '3', penId: 'e7c87e7', x: 0, y: 0.5 }
      ],
      rotate: 0,
      dataSource: {}
    },
    {
      width: 279.9999999999999,
      height: 251,
      disableAnchor: true,
      externElement: true,
      name: 'echarts',
      form: [
        {
          key: 'dataY',
          name: '数据',
          type: 'text',
          readonly: true,
          placeholder: '仅绑定变量',
          multiple: true
        },
        {
          key: 'echarts',
          name: 'echarts',
          type: 'code',
          language: 'json',
          isNotString: true
        },
        {
          key: 'echarts',
          key2: 'max',
          type: 'number',
          name: '最大数量',
          placeholder: 'x'
        }
      ],
      echarts: {
        option: {
          tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
          legend: {},
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: { show: false, position: 'center' },
                emphasis: {
                  show: true,
                  textStyle: { fontSize: '30', fontWeight: 'bold' }
                }
              },
              labelLine: { normal: { show: false } },
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ]
            }
          ]
        },
        replaceMode: 1
      },
      id: '25b7cb0',
      children: [],
      x: 811,
      y: 157,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        { id: '0', penId: '25b7cb0', x: 0.5, y: 0 },
        { id: '1', penId: '25b7cb0', x: 1, y: 0.5 },
        { id: '2', penId: '25b7cb0', x: 0.5, y: 1 },
        { id: '3', penId: '25b7cb0', x: 0, y: 0.5 }
      ],
      rotate: 0,
      ex: 1032,
      ey: 474,
      center: { x: 892, y: 348.5 },
      dataSource: {
        dataResource: [
          {
            fromType: '1',
            sn: '0000002',
            flag: 'runstatus',
            showName: 'ss',
            resourceSn: '0000002'
          },
          {
            fromType: '1',
            sn: '0000002',
            flag: 'bsq_ylsc',
            showName: 'fff',
            resourceSn: '0000002'
          }
        ]
      }
    },
    {
      width: 300,
      height: 300,
      disableAnchor: true,
      externElement: true,
      name: 'echarts',
      form: [
        {
          key: 'dataY',
          name: '数据',
          type: 'text',
          readonly: true,
          placeholder: '仅绑定变量',
          multiple: true
        },
        {
          key: 'echarts',
          name: 'echarts',
          type: 'code',
          language: 'json',
          isNotString: true
        },
        {
          key: 'echarts',
          key2: 'max',
          type: 'number',
          name: '最大数量',
          placeholder: 'x'
        }
      ],
      echarts: {
        option: {
          tooltip: { formatter: '{a} <br/>{b} : {c}%' },
          series: [
            {
              name: '业务指标',
              type: 'gauge',
              detail: { formatter: '{value}%' },
              data: [{ value: 50, name: '完成率' }]
            }
          ]
        },
        replaceMode: 1
      },
      id: '4fed89a',
      children: [],
      x: 410,
      y: 108,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        { id: '0', penId: '4fed89a', x: 0.5, y: 0 },
        { id: '1', penId: '4fed89a', x: 1, y: 0.5 },
        { id: '2', penId: '4fed89a', x: 0.5, y: 1 },
        { id: '3', penId: '4fed89a', x: 0, y: 0.5 }
      ],
      rotate: 0,
      dataSource: {
        interval: '0',
        flag: [],
        range: ['2023-12-01 21:31:29', '2023-12-30 21:31:32'],
        startTime: '2023-12-01 21:31:29',
        endTime: '2023-12-30 21:31:32',
        dataResource: []
      }
    },
    {
      width: 300,
      height: 200,
      disableAnchor: true,
      externElement: true,
      name: 'echarts',
      form: [
        {
          key: 'dataY',
          name: '数据',
          type: 'text',
          readonly: true,
          placeholder: '仅绑定变量',
          multiple: true,
          isTime: false,
          isYCategory: false
        },
        {
          key: 'echarts',
          name: 'echarts',
          type: 'code',
          language: 'json',
          isNotString: true
        },
        {
          key: 'echarts',
          key2: 'max',
          type: 'number',
          name: '最大数量',
          placeholder: 'x'
        }
      ],
      echarts: {
        option: {
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: { alignWithLabel: true }
          },
          yAxis: [{ type: 'value' }],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        },
        max: 100
      },
      id: '1d06419f',
      children: [],
      x: 536,
      y: 354,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        { id: '0', penId: '1d06419f', x: 0.5, y: 0 },
        { id: '1', penId: '1d06419f', x: 1, y: 0.5 },
        { id: '2', penId: '1d06419f', x: 0.5, y: 1 },
        { id: '3', penId: '1d06419f', x: 0, y: 0.5 }
      ],
      rotate: 0,
      dataSource: {}
    },
    {
      id: '9fbaf10',
      name: 'line',
      lineName: 'curve',
      x: 590,
      y: 70,
      type: 1,
      lineWidth: 1,
      ex: 590,
      ey: 70,
      width: 0,
      height: 0,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          id: '6e707cf',
          x: 0,
          y: 0,
          penId: '9fbaf10',
          connectTo: 'cf21b8b',
          anchorId: '2',
          next: { penId: '9fbaf10', connectTo: 'cf21b8b', x: 0, y: 0 }
        }
      ],
      dataSource: {}
    }
  ],
  origin: { x: 0, y: 0 },
  center: { x: 0, y: 0 },
  paths: {},
  template: '14ddbf6e',
  grid: true,
  gridColor: '#fff',
  gridSize: 20,
  rule: true,
  version: '1.0.31',
  locked: 0
}

const options = {
  grid: true,
  gridColor: '#fff',
  gridSize: 20,
  background: '#ecf2fe',
  rule: true
}

const [register] = useShy2dEditor({
  isPreview: false,
  dataSource: json,
  options,
  api: Api
})
</script>
