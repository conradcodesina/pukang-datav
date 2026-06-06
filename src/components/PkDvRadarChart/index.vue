<!--
/**
 * 组件介绍：大屏可视化雷达图组件
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
  name: 'PkDvRadarChart',
})

const props = defineProps({
  indicators: {
    type: Array,
    default: () => [],
  },
  values: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    default: '综合评分',
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
  tooltip: { backgroundColor: 'rgba(7, 24, 45, 0.92)', borderColor: 'rgba(24, 215, 255, 0.28)', textStyle: { color: '#eaf7ff' } },
  radar: {
    radius: '66%',
    indicator: props.indicators,
    axisName: { color: 'rgba(234, 247, 255, 0.72)' },
    splitLine: { lineStyle: { color: 'rgba(24, 215, 255, 0.18)' } },
    splitArea: { areaStyle: { color: ['rgba(24, 215, 255, 0.04)', 'rgba(24, 215, 255, 0.08)'] } },
    axisLine: { lineStyle: { color: 'rgba(24, 215, 255, 0.16)' } },
  },
  series: [
    {
      type: 'radar',
      data: [{ value: props.values, name: props.name }],
      symbolSize: 6,
      lineStyle: { color: '#18d7ff', width: 2 },
      areaStyle: { color: 'rgba(24, 215, 255, 0.22)' },
      itemStyle: { color: '#18d7ff' },
    },
  ],
}, props.option))
</script>
