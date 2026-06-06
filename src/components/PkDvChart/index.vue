<!--
/**
 * 组件介绍：大屏可视化通用图表容器组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-chart" :style="chartStyle">
    <div ref="chartRef" class="pk-dv-chart__canvas"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'PkDvChart',
})

const props = defineProps({
  option: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: [Number, String],
    default: 320,
  },
  width: {
    type: [Number, String],
    default: '100%',
  },
  theme: {
    type: [String, Object],
    default: '',
  },
  renderer: {
    type: String,
    default: 'canvas',
    validator: (value) => ['canvas', 'svg'].includes(value),
  },
  notMerge: {
    type: Boolean,
    default: false,
  },
  lazyUpdate: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
})

const chartRef = ref()
let chartInstance
let resizeObserver

const normalizeSize = (value) => (typeof value === 'number' ? `${value}px` : value)
const chartStyle = computed(() => ({
  width: normalizeSize(props.width),
  height: normalizeSize(props.height),
}))

const setOption = () => {
  if (!chartInstance) return

  chartInstance.setOption(props.option, props.notMerge, props.lazyUpdate)
  if (props.loading) {
    chartInstance.showLoading('default', {
      color: '#18d7ff',
      textColor: '#eaf7ff',
      maskColor: 'rgba(7, 24, 45, 0.36)',
    })
  } else {
    chartInstance.hideLoading()
  }
}

const resize = () => {
  chartInstance?.resize()
}

const initChart = async () => {
  await nextTick()
  if (!chartRef.value || chartInstance) return

  chartInstance = echarts.init(chartRef.value, props.theme || undefined, {
    renderer: props.renderer,
  })
  setOption()

  if (props.autoResize && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(chartRef.value)
  }
}

watch(
  () => props.option,
  () => setOption(),
  { deep: true }
)

watch(
  () => props.loading,
  () => setOption()
)

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chartInstance?.dispose()
  chartInstance = undefined
})

defineExpose({
  getChart: () => chartInstance,
  resize,
  setOption,
})
</script>

<style scoped>
.pk-dv-chart {
  position: relative;
  min-width: 0;
}

.pk-dv-chart__canvas {
  width: 100%;
  height: 100%;
}
</style>
