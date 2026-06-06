<!--
/**
 * 组件介绍：大屏可视化环形进度组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-ring-progress" :class="{ 'pk-dv-ring-progress--animated': animated }" :style="ringStyle">
    <svg class="pk-dv-ring-progress__svg" viewBox="0 0 120 120" aria-hidden="true">
      <circle class="pk-dv-ring-progress__track" cx="60" cy="60" r="52" />
      <circle class="pk-dv-ring-progress__bar" cx="60" cy="60" r="52" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" />
    </svg>
    <div class="pk-dv-ring-progress__content">
      <strong>{{ normalizedPercent }}%</strong>
      <span v-if="label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvRingProgress',
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
  size: {
    type: [Number, String],
    default: 120,
  },
  strokeWidth: {
    type: Number,
    default: 8,
  },
  status: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value),
  },
  animated: {
    type: Boolean,
    default: true,
  },
})

const normalizedPercent = computed(() => Math.max(0, Math.min(Math.round(props.value), 100)))
const circumference = 2 * Math.PI * 52
const dashOffset = computed(() => circumference * (1 - normalizedPercent.value / 100))
const normalizedSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
const colorMap = {
  primary: 'var(--pk-datav-primary)',
  success: 'var(--pk-datav-accent)',
  warning: 'var(--pk-datav-warning)',
  danger: 'var(--pk-datav-danger)',
}

const ringStyle = computed(() => ({
  width: normalizedSize.value,
  height: normalizedSize.value,
  '--pk-dv-ring-progress-color': colorMap[props.status],
  '--pk-dv-ring-progress-stroke': props.strokeWidth,
}))
</script>

<style scoped>
.pk-dv-ring-progress {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pk-datav-text);
}

.pk-dv-ring-progress__svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.pk-dv-ring-progress--animated .pk-dv-ring-progress__svg {
  animation: pk-dv-ring-progress-breathe 2.6s ease-in-out infinite;
}

.pk-dv-ring-progress__track,
.pk-dv-ring-progress__bar {
  fill: none;
  stroke-width: var(--pk-dv-ring-progress-stroke);
}

.pk-dv-ring-progress__track {
  stroke: rgba(255, 255, 255, 0.1);
}

.pk-dv-ring-progress__bar {
  stroke: var(--pk-dv-ring-progress-color);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.45s ease;
}

.pk-dv-ring-progress--animated .pk-dv-ring-progress__bar {
  animation: pk-dv-ring-progress-dash 2.4s ease-in-out infinite;
}

.pk-dv-ring-progress__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.pk-dv-ring-progress__content strong {
  color: var(--pk-dv-ring-progress-color);
  font-size: 1.5rem;
  line-height: 1;
  text-shadow: 0 0 12px var(--pk-dv-ring-progress-color);
}

.pk-dv-ring-progress__content span {
  color: var(--pk-datav-muted);
  font-size: 0.75rem;
}

@keyframes pk-dv-ring-progress-breathe {
  0%,
  100% {
    opacity: 0.88;
  }

  50% {
    opacity: 1;
  }
}

@keyframes pk-dv-ring-progress-dash {
  0%,
  100% {
    stroke-width: var(--pk-dv-ring-progress-stroke);
  }

  50% {
    stroke-width: calc(var(--pk-dv-ring-progress-stroke) + 1.5);
  }
}
</style>
