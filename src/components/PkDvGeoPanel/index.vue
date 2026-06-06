<!--
/**
 * 组件介绍：大屏可视化地图信息浮层组件
 * 作者：蒲康
 */
-->
<template>
  <section class="pk-dv-geo-panel" :style="panelStyle">
    <header v-if="title || $slots.title" class="pk-dv-geo-panel__header">
      <slot name="title">{{ title }}</slot>
    </header>
    <div class="pk-dv-geo-panel__body">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvGeoPanel',
})

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  x: {
    type: [Number, String],
    default: 50,
  },
  y: {
    type: [Number, String],
    default: 50,
  },
  width: {
    type: [Number, String],
    default: 220,
  },
})

const normalizePosition = (value) => (typeof value === 'number' ? `${value}%` : value)
const normalizeSize = (value) => (typeof value === 'number' ? `${value}px` : value)
const panelStyle = computed(() => ({
  left: normalizePosition(props.x),
  top: normalizePosition(props.y),
  width: normalizeSize(props.width),
}))
</script>

<style scoped>
.pk-dv-geo-panel {
  position: absolute;
  z-index: 4;
  color: var(--pk-datav-text);
  background: rgba(7, 24, 45, 0.86);
  border: 1px solid rgba(24, 215, 255, 0.26);
  border-radius: 8px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  transform: translate(-50%, -100%);
  overflow: hidden;
}

.pk-dv-geo-panel::after {
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 10px;
  height: 10px;
  content: '';
  background: rgba(7, 24, 45, 0.86);
  border-right: 1px solid rgba(24, 215, 255, 0.26);
  border-bottom: 1px solid rgba(24, 215, 255, 0.26);
  transform: translateX(-50%) rotate(45deg);
}

.pk-dv-geo-panel__header {
  padding: 10px 12px 0;
  color: var(--pk-datav-primary);
  font-size: 0.875rem;
  font-weight: 700;
}

.pk-dv-geo-panel__body {
  padding: 10px 12px 12px;
  color: var(--pk-datav-muted);
  font-size: 0.75rem;
  line-height: 1.7;
}
</style>
