<!--
/**
 * 组件介绍：大屏可视化地图画布组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-map-canvas" :style="canvasStyle">
    <div class="pk-dv-map-canvas__grid"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvMapCanvas',
})

const props = defineProps({
  height: {
    type: [Number, String],
    default: 420,
  },
  background: {
    type: String,
    default: '',
  },
})

const normalizeSize = (value) => (typeof value === 'number' ? `${value}px` : value)
const canvasStyle = computed(() => ({
  height: normalizeSize(props.height),
  background: props.background || undefined,
}))
</script>

<style scoped>
.pk-dv-map-canvas {
  position: relative;
  min-width: 0;
  overflow: hidden;
  color: var(--pk-datav-text);
  background:
    radial-gradient(circle at 50% 42%, rgba(24, 215, 255, 0.18), transparent 34%),
    linear-gradient(rgba(24, 215, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 215, 255, 0.08) 1px, transparent 1px),
    #061527;
  background-size: auto, 34px 34px, 34px 34px, auto;
  border: 1px solid rgba(24, 215, 255, 0.22);
  border-radius: 8px;
}

.pk-dv-map-canvas::before {
  position: absolute;
  inset: 12%;
  content: '';
  border: 1px solid rgba(24, 215, 255, 0.16);
  border-radius: 50%;
  transform: perspective(520px) rotateX(58deg);
}

.pk-dv-map-canvas__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(120deg, transparent 0 42%, rgba(255, 255, 255, 0.08) 50%, transparent 58% 100%);
  transform: translateX(-120%);
  animation: pk-dv-map-canvas-scan 5s ease-in-out infinite;
}

@keyframes pk-dv-map-canvas-scan {
  0%,
  45% {
    transform: translateX(-120%);
  }

  85%,
  100% {
    transform: translateX(120%);
  }
}
</style>
