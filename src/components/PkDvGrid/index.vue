<!--
/**
 * 组件介绍：大屏可视化栅格布局组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-grid" :style="gridStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvGrid',
})

const props = defineProps({
  columns: {
    type: [Number, String],
    default: 12,
  },
  rows: {
    type: [Number, String],
    default: '',
  },
  gap: {
    type: String,
    default: '16px',
  },
  minColumnWidth: {
    type: String,
    default: '',
  },
  dense: {
    type: Boolean,
    default: true,
  },
})

const gridStyle = computed(() => {
  const columns = Number(props.columns) || 12
  const rows = Number(props.rows)

  return {
    gap: props.gap,
    gridAutoFlow: props.dense ? 'row dense' : 'row',
    gridTemplateColumns: props.minColumnWidth
      ? `repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr))`
      : `repeat(${columns}, minmax(0, 1fr))`,
    gridTemplateRows: Number.isFinite(rows) && rows > 0 ? `repeat(${rows}, minmax(0, 1fr))` : undefined,
  }
})
</script>

<style scoped>
.pk-dv-grid {
  display: grid;
  width: 100%;
  min-width: 0;
}
</style>
