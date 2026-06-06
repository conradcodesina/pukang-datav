<!--
/**
 * 组件介绍：大屏可视化栅格单元格组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-cell" :style="cellStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvCell',
})

const props = defineProps({
  colSpan: {
    type: [Number, String],
    default: 1,
  },
  rowSpan: {
    type: [Number, String],
    default: 1,
  },
  minHeight: {
    type: [Number, String],
    default: '',
  },
})

const normalizeSize = (value) => {
  if (value === '' || value === undefined || value === null) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const cellStyle = computed(() => ({
  gridColumn: `span ${Number(props.colSpan) || 1}`,
  gridRow: `span ${Number(props.rowSpan) || 1}`,
  minHeight: normalizeSize(props.minHeight),
}))
</script>

<style scoped>
.pk-dv-cell {
  min-width: 0;
}
</style>
