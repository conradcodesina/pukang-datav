<!--
/**
 * 组件介绍：大屏可视化柱状图组件
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
  name: 'PkDvBarChart',
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
  horizontal: {
    type: Boolean,
    default: false,
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

const names = computed(() => props.data.map((item) => item[props.xField]))
const values = computed(() => props.data.map((item) => item[props.yField]))
const categoryAxis = computed(() => ({
  type: 'category',
  data: names.value,
  axisLine: { lineStyle: { color: 'rgba(234, 247, 255, 0.26)' } },
  axisLabel: { color: 'rgba(234, 247, 255, 0.68)' },
  axisTick: { show: false },
}))
const valueAxis = {
  type: 'value',
  splitLine: { lineStyle: { color: 'rgba(234, 247, 255, 0.08)' } },
  axisLabel: { color: 'rgba(234, 247, 255, 0.68)' },
}

const chartOption = computed(() => mergeOption({
  color: [props.color],
  grid: { top: 24, right: 18, bottom: props.horizontal ? 18 : 30, left: props.horizontal ? 72 : 42 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(7, 24, 45, 0.92)', borderColor: 'rgba(24, 215, 255, 0.28)', textStyle: { color: '#eaf7ff' } },
  xAxis: props.horizontal ? valueAxis : categoryAxis.value,
  yAxis: props.horizontal ? categoryAxis.value : valueAxis,
  series: [
    {
      type: 'bar',
      data: values.value,
      barWidth: props.horizontal ? 12 : 18,
      itemStyle: {
        borderRadius: props.horizontal ? [0, 8, 8, 0] : [8, 8, 0, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: props.horizontal ? 1 : 0,
          y2: props.horizontal ? 0 : 1,
          colorStops: [
            { offset: 0, color: props.color },
            { offset: 1, color: 'rgba(72, 240, 182, 0.45)' },
          ],
        },
      },
    },
  ],
}, props.option))
</script>
