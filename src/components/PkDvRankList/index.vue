<!--
/**
 * 组件介绍：大屏可视化排行列表组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-rank-list">
    <div v-for="(item, index) in visibleItems" :key="itemKey(item, index)" class="pk-dv-rank-list__item">
      <span class="pk-dv-rank-list__index">{{ index + 1 }}</span>
      <div class="pk-dv-rank-list__content">
        <div class="pk-dv-rank-list__row">
          <span class="pk-dv-rank-list__name">{{ item.name }}</span>
          <span class="pk-dv-rank-list__value">{{ item.value }}</span>
        </div>
        <div class="pk-dv-rank-list__track">
          <span class="pk-dv-rank-list__bar" :style="{ width: `${getPercent(item)}%` }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvRankList',
})

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  max: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 8,
  },
  rowKey: {
    type: String,
    default: 'name',
  },
})

const visibleItems = computed(() => props.items.slice(0, props.limit))
const maxValue = computed(() => props.max || Math.max(...props.items.map((item) => Number(item.value) || 0), 1))

const getPercent = (item) => {
  if (item.percent !== undefined) return Math.max(0, Math.min(Number(item.percent), 100))
  return Math.max(0, Math.min(((Number(item.value) || 0) / maxValue.value) * 100, 100))
}

const itemKey = (item, index) => item[props.rowKey] ?? index
</script>

<style scoped>
.pk-dv-rank-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--pk-datav-text);
}

.pk-dv-rank-list__item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.pk-dv-rank-list__index {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  color: #001522;
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--pk-datav-primary);
  border-radius: 50%;
}

.pk-dv-rank-list__content {
  flex: 1;
  min-width: 0;
}

.pk-dv-rank-list__row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.8125rem;
}

.pk-dv-rank-list__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pk-dv-rank-list__value {
  color: var(--pk-datav-primary);
  font-variant-numeric: tabular-nums;
}

.pk-dv-rank-list__track {
  height: 6px;
  margin-top: 7px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.pk-dv-rank-list__bar {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--pk-datav-primary), var(--pk-datav-accent));
  border-radius: inherit;
}
</style>
