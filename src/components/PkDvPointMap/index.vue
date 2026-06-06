<!--
/**
 * 组件介绍：大屏可视化点位地图组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-point-map">
    <pk-dv-map-canvas :height="height" :background="background">
      <button
        v-for="(point, index) in points"
        :key="pointKey(point, index)"
        class="pk-dv-point-map__point"
        :class="[`pk-dv-point-map__point--${point.type || 'primary'}`, { 'pk-dv-point-map__point--pulse': pulse }]"
        :style="{ left: `${point.x}%`, top: `${point.y}%` }"
        type="button"
        @click="$emit('point-click', point)"
      >
        <span class="pk-dv-point-map__dot"></span>
        <span v-if="showLabel" class="pk-dv-point-map__label">{{ point.name }}</span>
      </button>
      <slot></slot>
    </pk-dv-map-canvas>
  </div>
</template>

<script setup>
import PkDvMapCanvas from '../PkDvMapCanvas/index.vue'

defineOptions({
  name: 'PkDvPointMap',
})

defineEmits(['point-click'])

defineProps({
  points: {
    type: Array,
    default: () => [],
  },
  height: {
    type: [Number, String],
    default: 420,
  },
  background: {
    type: String,
    default: '',
  },
  rowKey: {
    type: String,
    default: 'name',
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  pulse: {
    type: Boolean,
    default: true,
  },
})

const pointKey = (point, index) => point.name ?? point.id ?? index
</script>

<style scoped>
.pk-dv-point-map {
  min-width: 0;
}

.pk-dv-point-map__point {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0;
  color: var(--pk-datav-primary);
  background: transparent;
  border: 0;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

.pk-dv-point-map__point--success {
  color: var(--pk-datav-accent);
}

.pk-dv-point-map__point--warning {
  color: var(--pk-datav-warning);
}

.pk-dv-point-map__point--danger {
  color: var(--pk-datav-danger);
}

.pk-dv-point-map__dot {
  position: relative;
  width: 10px;
  height: 10px;
  flex: none;
  background: currentColor;
  border-radius: 50%;
  box-shadow: 0 0 14px currentColor;
}

.pk-dv-point-map__point--pulse .pk-dv-point-map__dot::after {
  position: absolute;
  inset: -9px;
  content: '';
  border: 1px solid currentColor;
  border-radius: 50%;
  animation: pk-dv-point-map-pulse 1.8s ease-out infinite;
}

.pk-dv-point-map__label {
  padding: 3px 8px;
  color: var(--pk-datav-text);
  font-size: 0.75rem;
  background: rgba(7, 24, 45, 0.82);
  border: 1px solid rgba(24, 215, 255, 0.18);
  border-radius: 999px;
  white-space: nowrap;
}

@keyframes pk-dv-point-map-pulse {
  from {
    opacity: 0.88;
    transform: scale(0.45);
  }

  to {
    opacity: 0;
    transform: scale(1.35);
  }
}
</style>
