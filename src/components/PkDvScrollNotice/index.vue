<!--
/**
 * 组件介绍：大屏可视化滚动通知组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-scroll-notice" :class="{ 'pk-dv-scroll-notice--shine': shine }">
    <span v-if="label" class="pk-dv-scroll-notice__label">{{ label }}</span>
    <div class="pk-dv-scroll-notice__viewport">
      <div class="pk-dv-scroll-notice__track" :style="{ animationDuration: `${duration}s` }">
        <span v-for="(item, index) in renderItems" :key="`${index}-${getText(item)}`" class="pk-dv-scroll-notice__item">
          {{ getText(item) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvScrollNotice',
})

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: 'NOTICE',
  },
  duration: {
    type: Number,
    default: 18,
  },
  field: {
    type: String,
    default: 'text',
  },
  shine: {
    type: Boolean,
    default: true,
  },
})

const renderItems = computed(() => (props.items.length ? props.items.concat(props.items) : []))
const getText = (item) => (typeof item === 'string' ? item : item?.[props.field] ?? '')
</script>

<style scoped>
.pk-dv-scroll-notice {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  color: var(--pk-datav-text);
  background: rgba(24, 215, 255, 0.08);
  border: 1px solid rgba(24, 215, 255, 0.2);
  border-radius: 999px;
  overflow: hidden;
}

.pk-dv-scroll-notice--shine::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background: linear-gradient(110deg, transparent 0 28%, rgba(255, 255, 255, 0.12) 44%, transparent 58% 100%);
  transform: translateX(-120%);
  animation: pk-dv-scroll-notice-shine 5s ease-in-out infinite;
}

.pk-dv-scroll-notice__label {
  flex: none;
  color: var(--pk-datav-warning);
  font-size: 0.75rem;
  font-weight: 700;
}

.pk-dv-scroll-notice__viewport {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.pk-dv-scroll-notice__track {
  display: inline-flex;
  align-items: center;
  gap: 36px;
  min-width: 100%;
  white-space: nowrap;
  animation-name: pk-dv-scroll-notice-marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.pk-dv-scroll-notice:hover .pk-dv-scroll-notice__track {
  animation-play-state: paused;
}

.pk-dv-scroll-notice__item {
  color: var(--pk-datav-muted);
  font-size: 0.8125rem;
}

@keyframes pk-dv-scroll-notice-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@keyframes pk-dv-scroll-notice-shine {
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
