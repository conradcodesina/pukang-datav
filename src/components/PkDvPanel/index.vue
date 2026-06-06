<!--
/**
 * 组件介绍：大屏可视化通用面板组件
 * 作者：蒲康
 */
-->
<template>
  <section
    class="pk-dv-panel"
    :class="{
      'pk-dv-panel--bordered': bordered,
      'pk-dv-panel--shadow': shadow,
      'pk-dv-panel--compact': compact,
    }"
    :style="panelStyle"
  >
    <header v-if="title || subtitle || $slots.title || $slots.extra" class="pk-dv-panel__header">
      <div class="pk-dv-panel__title-wrap">
        <slot name="title">
          <h3 class="pk-dv-panel__title">{{ title }}</h3>
        </slot>
        <p v-if="subtitle" class="pk-dv-panel__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.extra" class="pk-dv-panel__extra">
        <slot name="extra"></slot>
      </div>
    </header>
    <div class="pk-dv-panel__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvPanel',
})

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  height: {
    type: [Number, String],
    default: '',
  },
  padding: {
    type: String,
    default: '16px',
  },
  background: {
    type: String,
    default: '',
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const normalizeSize = (value) => {
  if (value === '' || value === undefined || value === null) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const panelStyle = computed(() => ({
  height: normalizeSize(props.height),
  background: props.background || undefined,
}))

const bodyStyle = computed(() => ({
  padding: props.compact ? '10px' : props.padding,
}))
</script>

<style scoped>
.pk-dv-panel {
  position: relative;
  min-width: 0;
  color: var(--pk-datav-text);
  background: var(--pk-datav-panel);
  border-radius: 8px;
  overflow: hidden;
}

.pk-dv-panel--bordered {
  border: 1px solid var(--pk-datav-border);
}

.pk-dv-panel--shadow {
  box-shadow: var(--pk-datav-shadow);
}

.pk-dv-panel::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background:
    linear-gradient(135deg, rgba(24, 215, 255, 0.16), transparent 38%),
    linear-gradient(315deg, rgba(72, 240, 182, 0.09), transparent 42%);
}

.pk-dv-panel__header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px 0;
}

.pk-dv-panel__title-wrap {
  min-width: 0;
}

.pk-dv-panel__title {
  margin: 0;
  color: var(--pk-datav-text);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
}

.pk-dv-panel__title::before {
  display: inline-block;
  width: 4px;
  height: 14px;
  margin-right: 8px;
  vertical-align: -2px;
  content: '';
  background: var(--pk-datav-primary);
  border-radius: 3px;
}

.pk-dv-panel__subtitle {
  margin: 4px 0 0;
  color: var(--pk-datav-muted);
  font-size: 0.75rem;
}

.pk-dv-panel__extra {
  color: var(--pk-datav-muted);
  font-size: 0.75rem;
}

.pk-dv-panel__body {
  position: relative;
  z-index: 1;
}

.pk-dv-panel--compact .pk-dv-panel__header {
  padding: 10px 10px 0;
}
</style>
