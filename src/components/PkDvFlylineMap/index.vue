<!--
/**
 * 组件介绍：大屏可视化飞线地图组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-flyline-map">
    <pk-dv-map-canvas :height="height" :background="background">
      <svg class="pk-dv-flyline-map__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="pk-dv-flyline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(24, 215, 255, 0)" />
            <stop offset="45%" stop-color="rgba(24, 215, 255, 0.48)" />
            <stop offset="100%" stop-color="rgba(72, 240, 182, 0.95)" />
          </linearGradient>
        </defs>
        <path
          v-for="(line, index) in lines"
          :key="lineKey(line, index)"
          class="pk-dv-flyline-map__line"
          :style="{ animationDelay: `${index * 0.28}s`, animationDuration: `${duration}s` }"
          :d="getPath(line)"
        />
      </svg>
      <button
        v-for="(point, index) in allPoints"
        :key="`${point.name || index}-${index}`"
        class="pk-dv-flyline-map__point"
        :style="{ left: `${point.x}%`, top: `${point.y}%` }"
        type="button"
      >
        <span></span>
        {{ point.name }}
      </button>
      <slot></slot>
    </pk-dv-map-canvas>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PkDvMapCanvas from '../PkDvMapCanvas/index.vue'

defineOptions({
  name: 'PkDvFlylineMap',
})

const props = defineProps({
  lines: {
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
  duration: {
    type: Number,
    default: 3.2,
  },
})

const getPath = (line) => {
  const source = line.source || line.from
  const target = line.target || line.to
  const controlX = (source.x + target.x) / 2
  const controlY = Math.min(source.y, target.y) - Math.abs(target.x - source.x) * 0.18 - 8

  return `M ${source.x} ${source.y} Q ${controlX} ${controlY} ${target.x} ${target.y}`
}

const lineKey = (line, index) => line.name ?? `${line.source?.name}-${line.target?.name}-${index}`
const allPoints = computed(() => {
  const points = []
  props.lines.forEach((line) => {
    if (line.source || line.from) points.push(line.source || line.from)
    if (line.target || line.to) points.push(line.target || line.to)
  })
  return points
})
</script>

<style scoped>
.pk-dv-flyline-map {
  min-width: 0;
}

.pk-dv-flyline-map__svg {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.pk-dv-flyline-map__line {
  fill: none;
  stroke: url('#pk-dv-flyline-gradient');
  stroke-width: 0.36;
  stroke-linecap: round;
  stroke-dasharray: 18 80;
  animation: pk-dv-flyline-map-flow linear infinite;
  filter: drop-shadow(0 0 3px rgba(24, 215, 255, 0.6));
}

.pk-dv-flyline-map__point {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 7px;
  color: var(--pk-datav-text);
  font-size: 0.75rem;
  background: rgba(7, 24, 45, 0.78);
  border: 1px solid rgba(24, 215, 255, 0.18);
  border-radius: 999px;
  transform: translate(-50%, -50%);
}

.pk-dv-flyline-map__point span {
  width: 7px;
  height: 7px;
  background: var(--pk-datav-primary);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--pk-datav-primary);
}

@keyframes pk-dv-flyline-map-flow {
  to {
    stroke-dashoffset: -98;
  }
}
</style>
