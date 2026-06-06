<!--
/**
 * 组件介绍：大屏可视化画布适配组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-screen" :style="screenStyle">
    <div ref="viewportRef" class="pk-dv-screen__viewport">
      <div class="pk-dv-screen__canvas" :style="canvasStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'PkDvScreen',
})

const props = defineProps({
  width: {
    type: [Number, String],
    default: 1920,
  },
  height: {
    type: [Number, String],
    default: 1080,
  },
  background: {
    type: String,
    default: '#061527',
  },
  fit: {
    type: String,
    default: 'contain',
    validator: (value) => ['contain', 'cover', 'fill', 'none'].includes(value),
  },
  center: {
    type: Boolean,
    default: true,
  },
  overflow: {
    type: String,
    default: 'hidden',
  },
})

const viewportRef = ref(null)
const scale = ref({ x: 1, y: 1 })

const numericWidth = computed(() => Number(props.width) || 1920)
const numericHeight = computed(() => Number(props.height) || 1080)

const screenStyle = computed(() => ({
  background: props.background,
  overflow: props.overflow,
}))

const canvasStyle = computed(() => ({
  width: `${numericWidth.value}px`,
  height: `${numericHeight.value}px`,
  transform: `scale(${scale.value.x}, ${scale.value.y})`,
  transformOrigin: props.center ? 'center center' : 'left top',
}))

const updateScale = () => {
  const viewport = viewportRef.value
  if (!viewport || props.fit === 'none') {
    scale.value = { x: 1, y: 1 }
    return
  }

  const rect = viewport.getBoundingClientRect()
  const scaleX = rect.width / numericWidth.value
  const scaleY = rect.height / numericHeight.value

  if (props.fit === 'fill') {
    scale.value = { x: scaleX, y: scaleY }
    return
  }

  const nextScale = props.fit === 'cover' ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY)
  scale.value = { x: nextScale, y: nextScale }
}

onMounted(() => {
  nextTick(updateScale)
  window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<style scoped>
.pk-dv-screen {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  color: var(--pk-datav-text);
}

.pk-dv-screen__viewport {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pk-dv-screen__canvas {
  position: relative;
  flex: none;
  overflow: hidden;
}
</style>
