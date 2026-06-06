<!--
/**
 * 组件介绍：大屏可视化滚动表格组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-scroll-table">
    <div class="pk-dv-scroll-table__header" :style="gridStyle">
      <span v-for="column in columns" :key="column.key">{{ column.title }}</span>
    </div>
    <div class="pk-dv-scroll-table__body" :style="{ height: normalizedHeight }">
      <div class="pk-dv-scroll-table__track" :class="{ 'pk-dv-scroll-table__track--animate': shouldScroll }" :style="trackStyle">
        <div
          v-for="(row, index) in renderRows"
          :key="`${rowKeyValue(row, index)}-${index}`"
          class="pk-dv-scroll-table__row"
          :class="{ 'pk-dv-scroll-table__row--warning': row.warning }"
          :style="gridStyle"
        >
          <span v-for="column in columns" :key="column.key">{{ row[column.key] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvScrollTable',
})

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  height: {
    type: [Number, String],
    default: 220,
  },
  rowHeight: {
    type: Number,
    default: 38,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 12,
  },
})

const normalizedHeight = computed(() => (typeof props.height === 'number' ? `${props.height}px` : props.height))
const shouldScroll = computed(() => props.autoScroll && props.rows.length * props.rowHeight > Number.parseFloat(normalizedHeight.value))
const renderRows = computed(() => (shouldScroll.value ? props.rows.concat(props.rows) : props.rows))

const gridStyle = computed(() => ({
  gridTemplateColumns: props.columns.map((column) => column.width || '1fr').join(' '),
}))

const trackStyle = computed(() => ({
  '--pk-dv-scroll-table-duration': `${props.duration}s`,
  '--pk-dv-scroll-table-row-height': `${props.rowHeight}px`,
}))

const rowKeyValue = (row, index) => row[props.rowKey] ?? index
</script>

<style scoped>
.pk-dv-scroll-table {
  color: var(--pk-datav-text);
  overflow: hidden;
}

.pk-dv-scroll-table__header,
.pk-dv-scroll-table__row {
  display: grid;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 0 12px;
}

.pk-dv-scroll-table__header {
  height: 38px;
  color: var(--pk-datav-primary);
  font-size: 0.8125rem;
  font-weight: 700;
  background: rgba(24, 215, 255, 0.1);
  border: 1px solid rgba(24, 215, 255, 0.18);
}

.pk-dv-scroll-table__body {
  overflow: hidden;
  border: 1px solid rgba(24, 215, 255, 0.12);
  border-top: 0;
}

.pk-dv-scroll-table__track--animate {
  animation: pk-dv-scroll-table-scroll var(--pk-dv-scroll-table-duration) linear infinite;
}

.pk-dv-scroll-table:hover .pk-dv-scroll-table__track--animate {
  animation-play-state: paused;
}

.pk-dv-scroll-table__row {
  height: var(--pk-dv-scroll-table-row-height);
  color: var(--pk-datav-muted);
  font-size: 0.8125rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.pk-dv-scroll-table__row:nth-child(odd) {
  background: rgba(255, 255, 255, 0.025);
}

.pk-dv-scroll-table__row--warning {
  color: var(--pk-datav-warning);
  background: rgba(255, 209, 102, 0.08);
}

.pk-dv-scroll-table__header span,
.pk-dv-scroll-table__row span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes pk-dv-scroll-table-scroll {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-50%);
  }
}
</style>
