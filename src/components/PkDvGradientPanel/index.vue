<!--
/**
 * 组件介绍：大屏可视化渐变背景面板组件
 * 作者：蒲康
 */
-->
<template>
  <component
    :is="tag"
    class="pk-dv-gradient-panel"
    :class="{
      'pk-dv-gradient-panel--bordered': bordered,
      'pk-dv-gradient-panel--glow': glow,
    }"
    :style="panelStyle"
  >
    <div v-if="$slots.default" class="pk-dv-gradient-panel__content" :style="contentStyle">
      <slot></slot>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvGradientPanel',
})

const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  direction: {
    type: String,
    default: 'left-to-right',
    validator: (value) => ['left-to-right', 'right-to-left', 'both'].includes(value),
  },
  color: {
    type: String,
    default: '#1f3e7a',
  },
  height: {
    type: [Number, String],
    default: 42,
  },
  width: {
    type: [Number, String],
    default: '100%',
  },
  padding: {
    type: String,
    default: '0',
  },
  radius: {
    type: [Number, String],
    default: 0,
  },
  middleStop: {
    type: Number,
    default: 21,
  },
  solidStop: {
    type: Number,
    default: 85,
  },
  middleOpacity: {
    type: Number,
    default: 0.2,
  },
  solidOpacity: {
    type: Number,
    default: 1,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  borderColor: {
    type: String,
    default: 'rgba(24, 215, 255, 0.34)',
  },
  glow: {
    type: Boolean,
    default: false,
  },
})

const normalizeSize = (value) => {
  if (value === '' || value === undefined || value === null) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const clamp = (value, min, max) => Math.min(Math.max(Number(value) || 0, min), max)

const hexToRgba = (hex, opacity) => {
  const value = String(hex).trim()

  if (!value.startsWith('#')) return value

  const raw = value.slice(1)
  const normalized = raw.length === 3
    ? raw.split('').map((char) => char + char).join('')
    : raw.slice(0, 6)

  if (normalized.length !== 6) return value

  const red = parseInt(normalized.slice(0, 2), 16)
  const green = parseInt(normalized.slice(2, 4), 16)
  const blue = parseInt(normalized.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${clamp(opacity, 0, 1)})`
}

const gradientBackground = computed(() => {
  if (props.direction === 'both') {
    const transparentColor = hexToRgba(props.color, 0)
    const middleColor = hexToRgba(props.color, props.middleOpacity)
    const solidColor = hexToRgba(props.color, props.solidOpacity)

    return `linear-gradient(90deg, ${transparentColor}, ${middleColor} ${clamp(props.middleStop, 0, 50)}%, ${solidColor} 50%, ${middleColor} ${100 - clamp(props.middleStop, 0, 50)}%, ${transparentColor})`
  }

  const angle = props.direction === 'left-to-right' ? '270deg' : '90deg'
  const transparentColor = hexToRgba(props.color, 0)
  const middleColor = hexToRgba(props.color, props.middleOpacity)
  const solidColor = hexToRgba(props.color, props.solidOpacity)

  return `linear-gradient(${angle}, ${transparentColor}, ${middleColor} ${clamp(props.middleStop, 0, 100)}%, ${solidColor} ${clamp(props.solidStop, 0, 100)}%)`
})

const panelStyle = computed(() => ({
  width: normalizeSize(props.width),
  height: normalizeSize(props.height),
  borderRadius: normalizeSize(props.radius),
  borderColor: props.bordered ? props.borderColor : undefined,
  background: gradientBackground.value,
}))

const contentStyle = computed(() => ({
  padding: props.padding,
}))
</script>

<style scoped>
.pk-dv-gradient-panel {
  position: relative;
  min-width: 0;
  overflow: hidden;
}

.pk-dv-gradient-panel--bordered {
  border: 1px solid;
}

.pk-dv-gradient-panel--glow {
  box-shadow:
    inset 0 0 18px rgba(24, 215, 255, 0.16),
    0 0 16px rgba(24, 215, 255, 0.16);
}

.pk-dv-gradient-panel__content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  color: var(--pk-datav-text);
}
</style>
