<!--
/**
 * 组件介绍：大屏可视化发光标题组件
 * 作者：蒲康
 */
-->
<template>
  <div
    class="pk-dv-glow-title"
    :class="[
      `pk-dv-glow-title--${variant}`,
      {
        'pk-dv-glow-title--center': center,
        'pk-dv-glow-title--animated': animated,
      },
    ]"
  >
    <div class="pk-dv-glow-title__main">
      <span v-if="accent" class="pk-dv-glow-title__accent"></span>
      <component :is="tag" class="pk-dv-glow-title__text">
        <slot>{{ title }}</slot>
      </component>
      <span v-if="subTitle" class="pk-dv-glow-title__sub">{{ subTitle }}</span>
    </div>
    <button v-if="variant === 'panel' && (extraText || $slots.extra)" type="button" class="pk-dv-glow-title__extra" @click="$emit('extra-click', $event)">
      <slot name="extra">{{ extraText }}</slot>
    </button>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PkDvGlowTitle',
})

defineEmits(['extra-click'])

defineProps({
  title: {
    type: String,
    default: '',
  },
  subTitle: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'h3',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'panel'].includes(value),
  },
  extraText: {
    type: String,
    default: '',
  },
  center: {
    type: Boolean,
    default: false,
  },
  accent: {
    type: Boolean,
    default: true,
  },
  animated: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.pk-dv-glow-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  color: var(--pk-datav-text);
}

.pk-dv-glow-title__main {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.pk-dv-glow-title--center {
  justify-content: center;
  text-align: center;
}

.pk-dv-glow-title__accent {
  width: 5px;
  height: 18px;
  flex: none;
  background: var(--pk-datav-primary);
  border-radius: 999px;
  box-shadow: 0 0 14px rgba(24, 215, 255, 0.7);
}

.pk-dv-glow-title__text {
  margin: 0;
  color: var(--pk-datav-text);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  text-shadow: 0 0 16px rgba(24, 215, 255, 0.45);
}

.pk-dv-glow-title--animated .pk-dv-glow-title__accent {
  animation: pk-dv-glow-title-accent 1.8s ease-in-out infinite;
}

.pk-dv-glow-title--animated .pk-dv-glow-title__text {
  animation: pk-dv-glow-title-text 2.8s ease-in-out infinite;
}

.pk-dv-glow-title__sub {
  color: var(--pk-datav-muted);
  font-size: 0.75rem;
}

.pk-dv-glow-title--panel {
  min-height: 38px;
  padding: 0 12px 7px 14px;
  overflow: hidden;
  background:
    linear-gradient(270deg, #1f3e7a00, #1f3e7a33 21%, #1f3e7a 85%),
    linear-gradient(180deg, rgba(24, 215, 255, 0.16), rgba(24, 215, 255, 0.02) 52%, transparent);
  border-bottom: 1px solid rgba(75, 211, 255, 0.42);
  box-shadow:
    inset 0 -1px 0 rgba(24, 215, 255, 0.46),
    0 8px 18px rgba(0, 45, 110, 0.18);
}

.pk-dv-glow-title--panel::before {
  position: absolute;
  right: 0;
  bottom: 4px;
  left: 0;
  height: 6px;
  content: '';
  background:
    linear-gradient(90deg, rgba(24, 215, 255, 0.96), rgba(24, 215, 255, 0.36) 38%, rgba(24, 215, 255, 0.08) 56%, transparent 72%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent);
  box-shadow: 0 0 12px rgba(24, 215, 255, 0.42);
  opacity: 0.82;
  pointer-events: none;
}

.pk-dv-glow-title--panel::after {
  position: absolute;
  right: 8px;
  bottom: 0;
  left: 0;
  height: 2px;
  content: '';
  background: linear-gradient(90deg, rgba(24, 215, 255, 0.98), rgba(24, 215, 255, 0.3) 46%, rgba(24, 215, 255, 0.06) 62%, transparent 76%);
  pointer-events: none;
}

.pk-dv-glow-title--panel .pk-dv-glow-title__accent {
  width: 12px;
  height: 14px;
  border-radius: 0;
  background: linear-gradient(135deg, #24f5ff, #0c8eff);
  box-shadow: 12px 0 0 rgba(24, 215, 255, 0.76), 0 0 12px rgba(24, 215, 255, 0.72);
  transform: skewX(-14deg);
}

.pk-dv-glow-title--panel .pk-dv-glow-title__text {
  color: #f5fbff;
  font-size: 1.05rem;
  line-height: 1;
  text-shadow:
    0 0 10px rgba(24, 215, 255, 0.86),
    1px 1px 0 rgba(0, 20, 56, 0.92);
}

.pk-dv-glow-title__extra {
  position: relative;
  z-index: 1;
  flex: none;
  padding: 0;
  color: #18f2ff;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  text-shadow: 0 0 8px rgba(24, 215, 255, 0.76);
}

.pk-dv-glow-title__extra:hover {
  color: #bdf8ff;
}

.pk-dv-glow-title__extra:focus-visible {
  outline: 1px solid rgba(24, 215, 255, 0.84);
  outline-offset: 3px;
}

@keyframes pk-dv-glow-title-accent {
  0%,
  100% {
    opacity: 0.72;
    box-shadow: 0 0 10px rgba(24, 215, 255, 0.42);
  }

  50% {
    opacity: 1;
    box-shadow: 0 0 18px rgba(24, 215, 255, 0.78);
  }
}

@keyframes pk-dv-glow-title-text {
  0%,
  100% {
    text-shadow: 0 0 12px rgba(24, 215, 255, 0.28);
  }

  50% {
    text-shadow: 0 0 20px rgba(24, 215, 255, 0.58);
  }
}
</style>
