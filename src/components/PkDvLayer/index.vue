<!--
/**
 * 组件介绍：大屏可视化定位图层组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-layer" :style="layerStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvLayer',
})

const props = defineProps({
  x: {
    type: [Number, String],
    default: 0,
  },
  y: {
    type: [Number, String],
    default: 0,
  },
  width: {
    type: [Number, String],
    default: 'auto',
  },
  height: {
    type: [Number, String],
    default: 'auto',
  },
  zIndex: {
    type: [Number, String],
    default: 'auto',
  },
})

const normalizeSize = (value) => {
  if (value === 'auto') return 'auto'
  return typeof value === 'number' ? `${value}px` : value
}

const layerStyle = computed(() => ({
  left: normalizeSize(props.x),
  top: normalizeSize(props.y),
  width: normalizeSize(props.width),
  height: normalizeSize(props.height),
  zIndex: props.zIndex,
}))
</script>

<style scoped>
.pk-dv-layer {
  position: absolute;
  min-width: 0;
}
</style>
