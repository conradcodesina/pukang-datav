<!--
/**
 * 组件介绍：大屏可视化线性进度条组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-progress" :class="[`pk-dv-progress--${status}`, { 'pk-dv-progress--animated': animated }]">
    <div v-if="label || showValue" class="pk-dv-progress__header">
      <span>{{ label }}</span>
      <span v-if="showValue">{{ normalizedPercent }}%</span>
    </div>
    <div class="pk-dv-progress__track" :style="{ height: normalizedHeight }">
      <span class="pk-dv-progress__bar" :style="{ width: `${normalizedPercent}%` }"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvProgress',
})

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: '',
  },
  height: {
    type: [Number, String],
    default: 8,
  },
  status: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value),
  },
  showValue: {
    type: Boolean,
    default: true,
  },
  animated: {
    type: Boolean,
    default: true,
  },
})

const normalizedPercent = computed(() => Math.max(0, Math.min(Math.round(props.value), 100)))
const normalizedHeight = computed(() => (typeof props.height === 'number' ? `${props.height}px` : props.height))
</script>

<style scoped>
.pk-dv-progress {
  --pk-dv-progress-color: var(--pk-datav-primary);
  min-width: 0;
  color: var(--pk-datav-muted);
}

.pk-dv-progress--success {
  --pk-dv-progress-color: var(--pk-datav-accent);
}

.pk-dv-progress--warning {
  --pk-dv-progress-color: var(--pk-datav-warning);
}

.pk-dv-progress--danger {
  --pk-dv-progress-color: var(--pk-datav-danger);
}

.pk-dv-progress__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 0.8125rem;
}

.pk-dv-progress__track {
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.pk-dv-progress__bar {
  position: relative;
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--pk-dv-progress-color), rgba(255, 255, 255, 0.72));
  border-radius: inherit;
  box-shadow: 0 0 14px color-mix(in srgb, var(--pk-dv-progress-color), transparent 50%);
  transition: width 0.35s ease;
  overflow: hidden;
}

.pk-dv-progress__bar::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
  transform: translateX(-100%);
}

.pk-dv-progress--animated .pk-dv-progress__bar::after {
  animation: pk-dv-progress-flow 1.8s linear infinite;
}

@keyframes pk-dv-progress-flow {
  to {
    transform: translateX(100%);
  }
}
</style>
