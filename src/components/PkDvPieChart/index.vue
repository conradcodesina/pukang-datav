<!--
/**
 * 组件介绍：大屏可视化饼图组件
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
  name: 'PkDvPieChart',
})

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  height: {
    type: [Number, String],
    default: 320,
  },
  radius: {
    type: Array,
    default: () => ['48%', '70%'],
  },
  roseType: {
    type: [Boolean, String],
    default: false,
  },
  option: {
    type: Object,
    default: () => ({}),
  },
})

const chartOption = computed(() => mergeOption({
  color: ['#18d7ff', '#48f0b6', '#ffd166', '#ff5d73', '#8f7cff', '#5aa7ff'],
  tooltip: { trigger: 'item', backgroundColor: 'rgba(7, 24, 45, 0.92)', borderColor: 'rgba(24, 215, 255, 0.28)', textStyle: { color: '#eaf7ff' } },
  legend: {
    bottom: 0,
    textStyle: { color: 'rgba(234, 247, 255, 0.68)' },
    itemWidth: 10,
    itemHeight: 10,
  },
  series: [
    {
      type: 'pie',
      radius: props.radius,
      center: ['50%', '44%'],
      roseType: props.roseType,
      data: props.data,
      label: { color: 'rgba(234, 247, 255, 0.78)' },
      labelLine: { lineStyle: { color: 'rgba(234, 247, 255, 0.3)' } },
      itemStyle: { borderColor: '#07182d', borderWidth: 2 },
    },
  ],
}, props.option))
</script>
