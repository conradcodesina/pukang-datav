<!--
/**
 * 组件介绍：大屏可视化折线图组件
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
  name: 'PkDvLineChart',
})

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  xField: {
    type: String,
    default: 'name',
  },
  yField: {
    type: String,
    default: 'value',
  },
  height: {
    type: [Number, String],
    default: 320,
  },
  smooth: {
    type: Boolean,
    default: true,
  },
  area: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: '#18d7ff',
  },
  option: {
    type: Object,
    default: () => ({}),
  },
})

const chartOption = computed(() => mergeOption({
  color: [props.color],
  grid: { top: 28, right: 18, bottom: 28, left: 42 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(7, 24, 45, 0.92)', borderColor: 'rgba(24, 215, 255, 0.28)', textStyle: { color: '#eaf7ff' } },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.data.map((item) => item[props.xField]),
    axisLine: { lineStyle: { color: 'rgba(234, 247, 255, 0.26)' } },
    axisLabel: { color: 'rgba(234, 247, 255, 0.68)' },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(234, 247, 255, 0.08)' } },
    axisLabel: { color: 'rgba(234, 247, 255, 0.68)' },
  },
  series: [
    {
      type: 'line',
      smooth: props.smooth,
      symbol: 'circle',
      symbolSize: 7,
      data: props.data.map((item) => item[props.yField]),
      lineStyle: { width: 3 },
      areaStyle: props.area
        ? {
            opacity: 0.22,
          }
        : undefined,
    },
  ],
}, props.option))
</script>
