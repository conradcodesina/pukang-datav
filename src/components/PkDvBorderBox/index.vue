<!--
/**
 * 组件介绍：大屏可视化装饰边框组件
 * 作者：蒲康
 */
-->
<template>
  <section
    class="pk-dv-border-box"
    :class="[
      `pk-dv-border-box--${variant}`,
      {
        'pk-dv-border-box--glow': glow,
        'pk-dv-border-box--scan': scan,
        'pk-dv-border-box--pulse': pulse,
      },
    ]"
  >
    <span class="pk-dv-border-box__corner pk-dv-border-box__corner--tl"></span>
    <span class="pk-dv-border-box__corner pk-dv-border-box__corner--tr"></span>
    <span class="pk-dv-border-box__corner pk-dv-border-box__corner--bl"></span>
    <span class="pk-dv-border-box__corner pk-dv-border-box__corner--br"></span>
    <div class="pk-dv-border-box__body" :style="{ padding }">
      <div v-if="title || $slots.title" class="pk-dv-border-box__title">
        <span class="pk-dv-border-box__title-mark"></span>
        <slot name="title">{{ title }}</slot>
      </div>
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineOptions({
  name: 'PkDvBorderBox',
})

defineProps({
  title: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning'].includes(value),
  },
  padding: {
    type: String,
    default: '16px',
  },
  glow: {
    type: Boolean,
    default: true,
  },
  scan: {
    type: Boolean,
    default: false,
  },
  pulse: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.pk-dv-border-box {
  --pk-dv-border-box-color: var(--pk-datav-primary);
  position: relative;
  box-sizing: border-box;
  height: 100%;
  min-width: 0;
  color: var(--pk-datav-text);
  background:
    linear-gradient(135deg, rgba(24, 215, 255, 0.12), transparent 36%),
    var(--pk-datav-panel);
  border: 1px solid rgba(24, 215, 255, 0.26);
  border-radius: 8px;
  overflow: hidden;
}

.pk-dv-border-box--success {
  --pk-dv-border-box-color: var(--pk-datav-accent);
}

.pk-dv-border-box--warning {
  --pk-dv-border-box-color: var(--pk-datav-warning);
}

.pk-dv-border-box--glow {
  box-shadow: 0 0 22px rgba(24, 215, 255, 0.14);
}

.pk-dv-border-box--pulse {
  animation: pk-dv-border-box-pulse 2.8s ease-in-out infinite;
}

.pk-dv-border-box--scan::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background: linear-gradient(110deg, transparent 0 36%, rgba(255, 255, 255, 0.16) 46%, transparent 58% 100%);
  transform: translateX(-120%);
  animation: pk-dv-border-box-scan 4.2s ease-in-out infinite;
}

.pk-dv-border-box__body {
  position: relative;
  z-index: 1;
}

.pk-dv-border-box__title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  color: var(--pk-datav-text);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
  text-shadow: 0 0 14px rgba(24, 215, 255, 0.42);
}

.pk-dv-border-box__title-mark {
  width: 4px;
  height: 16px;
  flex: none;
  background: var(--pk-dv-border-box-color);
  border-radius: 999px;
  box-shadow: 0 0 12px var(--pk-dv-border-box-color);
}

.pk-dv-border-box__corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: var(--pk-dv-border-box-color);
  pointer-events: none;
}

.pk-dv-border-box__corner--tl {
  top: -1px;
  left: -1px;
  border-top: 2px solid;
  border-left: 2px solid;
}

.pk-dv-border-box__corner--tr {
  top: -1px;
  right: -1px;
  border-top: 2px solid;
  border-right: 2px solid;
}

.pk-dv-border-box__corner--bl {
  bottom: -1px;
  left: -1px;
  border-bottom: 2px solid;
  border-left: 2px solid;
}

.pk-dv-border-box__corner--br {
  right: -1px;
  bottom: -1px;
  border-right: 2px solid;
  border-bottom: 2px solid;
}

@keyframes pk-dv-border-box-scan {
  0%,
  38% {
    transform: translateX(-120%);
  }

  78%,
  100% {
    transform: translateX(120%);
  }
}

@keyframes pk-dv-border-box-pulse {
  0%,
  100% {
    border-color: rgba(24, 215, 255, 0.22);
    box-shadow: 0 0 16px rgba(24, 215, 255, 0.1);
  }

  50% {
    border-color: var(--pk-dv-border-box-color);
    box-shadow: 0 0 28px rgba(24, 215, 255, 0.22);
  }
}
</style>
