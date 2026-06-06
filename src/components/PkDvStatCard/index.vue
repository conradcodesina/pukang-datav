<!--
/**
 * 组件介绍：大屏可视化指标卡组件
 * 作者：蒲康
 */
-->
<template>
  <section class="pk-dv-stat-card" :class="`pk-dv-stat-card--${status}`">
    <div class="pk-dv-stat-card__header">
      <span class="pk-dv-stat-card__title">{{ title }}</span>
      <slot name="extra"></slot>
    </div>
    <div class="pk-dv-stat-card__value-row">
      <span v-if="prefix" class="pk-dv-stat-card__prefix">{{ prefix }}</span>
      <span class="pk-dv-stat-card__value">{{ displayValue }}</span>
      <span v-if="unit" class="pk-dv-stat-card__unit">{{ unit }}</span>
    </div>
    <div v-if="subtitle || trendText" class="pk-dv-stat-card__footer">
      <span v-if="subtitle">{{ subtitle }}</span>
      <span v-if="trendText" class="pk-dv-stat-card__trend" :class="trendClass">
        <span>{{ trendIcon }}</span>
        {{ trendText }}
      </span>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvStatCard',
})

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  value: {
    type: [Number, String],
    default: 0,
  },
  prefix: {
    type: String,
    default: '',
  },
  unit: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  trend: {
    type: [Number, String],
    default: '',
  },
  trendDirection: {
    type: String,
    default: 'up',
    validator: (value) => ['up', 'down', 'flat'].includes(value),
  },
  status: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value),
  },
  precision: {
    type: Number,
    default: -1,
  },
  separator: {
    type: Boolean,
    default: true,
  },
})

const formatNumber = (value) => {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue)) return value

  const fixedValue = props.precision >= 0 ? numberValue.toFixed(props.precision) : String(value)
  if (!props.separator) return fixedValue

  const [integer, decimal] = fixedValue.split('.')
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimal ? `${formatted}.${decimal}` : formatted
}

const displayValue = computed(() => formatNumber(props.value))

const trendText = computed(() => {
  if (props.trend === '' || props.trend === undefined || props.trend === null) return ''
  return typeof props.trend === 'number' ? `${Math.abs(props.trend)}%` : props.trend
})

const trendClass = computed(() => `pk-dv-stat-card__trend--${props.trendDirection}`)
const trendIcon = computed(() => ({ up: '↑', down: '↓', flat: '→' }[props.trendDirection]))
</script>

<style scoped>
.pk-dv-stat-card {
  position: relative;
  min-width: 0;
  padding: 16px;
  color: var(--pk-datav-text);
  background: var(--pk-datav-panel);
  border: 1px solid var(--pk-datav-border);
  border-radius: 8px;
  overflow: hidden;
}

.pk-dv-stat-card::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background: linear-gradient(135deg, rgba(24, 215, 255, 0.16), transparent 46%);
}

.pk-dv-stat-card--success::before {
  background: linear-gradient(135deg, rgba(72, 240, 182, 0.16), transparent 46%);
}

.pk-dv-stat-card--warning::before {
  background: linear-gradient(135deg, rgba(255, 209, 102, 0.16), transparent 46%);
}

.pk-dv-stat-card--danger::before {
  background: linear-gradient(135deg, rgba(255, 93, 115, 0.16), transparent 46%);
}

.pk-dv-stat-card__header,
.pk-dv-stat-card__value-row,
.pk-dv-stat-card__footer {
  position: relative;
  z-index: 1;
}

.pk-dv-stat-card__header,
.pk-dv-stat-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pk-dv-stat-card__title,
.pk-dv-stat-card__footer {
  color: var(--pk-datav-muted);
  font-size: 0.8125rem;
}

.pk-dv-stat-card__value-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 12px;
}

.pk-dv-stat-card__value {
  color: var(--pk-datav-primary);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.1;
}

.pk-dv-stat-card__prefix,
.pk-dv-stat-card__unit {
  color: var(--pk-datav-muted);
  font-size: 0.875rem;
}

.pk-dv-stat-card__footer {
  margin-top: 12px;
}

.pk-dv-stat-card__trend {
  font-weight: 700;
}

.pk-dv-stat-card__trend--up {
  color: var(--pk-datav-accent);
}

.pk-dv-stat-card__trend--down {
  color: var(--pk-datav-danger);
}

.pk-dv-stat-card__trend--flat {
  color: var(--pk-datav-warning);
}
</style>
