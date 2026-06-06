<!--
/**
 * 组件介绍：大屏可视化仪表盘组件
 * 作者：蒲康
 */
-->
<template>
  <pk-dv-chart :option="chartOption" :height="height" />
</template>

<script setup>
import { computed } from 'vue'
import PkDvChart from '../PkDvChart/index.vue'
import { mergeOption } from '../../utils/mergeOption.js'

defineOptions({
  name: 'PkDvGaugeChart',
})

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: '',
  },
  unit: {
    type: String,
    default: '%',
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  height: {
    type: [Number, String],
    default: 320,
  },
  option: {
    type: Object,
    default: () => ({}),
  },
})

const chartOption = computed(() => mergeOption({
  series: [
    {
      type: 'gauge',
      min: props.min,
      max: props.max,
      startAngle: 210,
      endAngle: -30,
      progress: { show: true, width: 12, itemStyle: { color: '#18d7ff' } },
      axisLine: { lineStyle: { width: 12, color: [[1, 'rgba(234, 247, 255, 0.12)']] } },
      axisTick: { show: false },
      splitLine: { length: 10, lineStyle: { color: 'rgba(234, 247, 255, 0.32)' } },
      axisLabel: { color: 'rgba(234, 247, 255, 0.58)', distance: 18 },
      pointer: { width: 4, itemStyle: { color: '#18d7ff' } },
      anchor: { show: true, size: 10, itemStyle: { color: '#18d7ff' } },
      detail: {
        valueAnimation: true,
        formatter: `{value}${props.unit}`,
        color: '#18d7ff',
        fontSize: 28,
        offsetCenter: [0, '58%'],
      },
      title: {
        color: 'rgba(234, 247, 255, 0.68)',
        fontSize: 13,
        offsetCenter: [0, '82%'],
      },
      data: [{ value: props.value, name: props.name }],
    },
  ],
}, props.option))
</script>
