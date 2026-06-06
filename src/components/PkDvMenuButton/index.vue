<!--
/**
 * 组件介绍：大屏可视化菜单按钮组件
 * 作者：蒲康
 */
-->
<template>
  <button
    class="pk-dv-menu-button"
    :class="[
      `pk-dv-menu-button--${size}`,
      {
        'pk-dv-menu-button--active': active,
        'pk-dv-menu-button--disabled': disabled,
        'pk-dv-menu-button--block': block,
      },
    ]"
    :type="type"
    :disabled="disabled"
    :style="buttonStyle"
    @click="handleClick"
  >
    <span class="pk-dv-menu-button__shine"></span>
    <span class="pk-dv-menu-button__edge pk-dv-menu-button__edge--left"></span>
    <span class="pk-dv-menu-button__edge pk-dv-menu-button__edge--right"></span>
    <span class="pk-dv-menu-button__text">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvMenuButton',
})

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  width: {
    type: [Number, String],
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
})

const emit = defineEmits(['click'])

const formatSize = (value) => {
  if (value === '' || value === null || value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const buttonStyle = computed(() => ({
  width: formatSize(props.width),
}))

const handleClick = (event) => {
  if (props.disabled) return
  emit('click', event)
}
</script>

<style scoped>
.pk-dv-menu-button {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 104px;
  max-width: 100%;
  height: 38px;
  padding: 0 24px;
  overflow: hidden;
  color: #eaf7ff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background:
    linear-gradient(180deg, rgba(46, 150, 255, 0.92), rgba(13, 83, 178, 0.88) 58%, rgba(8, 45, 106, 0.96)),
    rgba(5, 23, 52, 0.92);
  border: 1px solid rgba(80, 190, 255, 0.86);
  border-radius: 3px;
  clip-path: polygon(8px 0, calc(100% - 4px) 0, 100% calc(100% - 8px), calc(100% - 9px) 100%, 4px 100%, 0 8px);
  box-shadow:
    inset 0 1px 0 rgba(227, 250, 255, 0.42),
    inset 0 -8px 14px rgba(0, 35, 120, 0.52),
    0 0 14px rgba(24, 155, 255, 0.34);
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

.pk-dv-menu-button::before,
.pk-dv-menu-button::after {
  position: absolute;
  z-index: -1;
  content: '';
  pointer-events: none;
}

.pk-dv-menu-button::before {
  inset: 3px 8px 6px;
  background:
    linear-gradient(90deg, transparent, rgba(87, 220, 255, 0.34), transparent),
    linear-gradient(180deg, rgba(255, 255, 255, 0.16), transparent 45%);
  clip-path: polygon(5px 0, calc(100% - 2px) 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 5px);
}

.pk-dv-menu-button::after {
  right: 8px;
  bottom: 4px;
  left: 8px;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(24, 215, 255, 0.95), transparent);
  box-shadow: 0 0 10px rgba(24, 215, 255, 0.72);
}

.pk-dv-menu-button:hover:not(:disabled) {
  filter: brightness(1.08);
  box-shadow:
    inset 0 1px 0 rgba(227, 250, 255, 0.56),
    inset 0 -8px 14px rgba(0, 35, 120, 0.48),
    0 0 20px rgba(24, 155, 255, 0.52);
}

.pk-dv-menu-button:active:not(:disabled) {
  transform: translateY(1px);
}

.pk-dv-menu-button:focus-visible {
  outline: 2px solid rgba(24, 215, 255, 0.92);
  outline-offset: 3px;
}

.pk-dv-menu-button__shine {
  position: absolute;
  top: 0;
  left: -55%;
  width: 46%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.32), transparent);
  transform: skewX(-18deg);
  animation: pk-dv-menu-button-shine 3.2s ease-in-out infinite;
}

.pk-dv-menu-button__edge {
  position: absolute;
  top: 5px;
  width: 18px;
  height: 3px;
  pointer-events: none;
  background: rgba(91, 220, 255, 0.88);
  box-shadow: 0 0 10px rgba(24, 215, 255, 0.86);
}

.pk-dv-menu-button__edge--left {
  left: 11px;
}

.pk-dv-menu-button__edge--right {
  right: 11px;
}

.pk-dv-menu-button__text {
  position: relative;
  z-index: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow:
    0 1px 0 rgba(0, 18, 50, 0.88),
    0 0 10px rgba(98, 220, 255, 0.52);
}

.pk-dv-menu-button--active {
  color: #fff8dc;
  background:
    linear-gradient(180deg, rgba(255, 189, 72, 0.98), rgba(242, 111, 28, 0.96) 62%, rgba(137, 50, 9, 0.98)),
    rgba(62, 25, 4, 0.98);
  border-color: rgba(255, 211, 105, 0.96);
  box-shadow:
    inset 0 1px 0 rgba(255, 251, 213, 0.58),
    inset 0 -9px 16px rgba(133, 43, 0, 0.5),
    0 0 18px rgba(255, 146, 44, 0.56);
}

.pk-dv-menu-button--active::after {
  background: linear-gradient(90deg, transparent, rgba(255, 231, 111, 1), transparent);
  box-shadow: 0 0 12px rgba(255, 174, 45, 0.9);
}

.pk-dv-menu-button--active .pk-dv-menu-button__edge {
  background: rgba(255, 230, 132, 0.9);
  box-shadow: 0 0 12px rgba(255, 176, 45, 0.88);
}

.pk-dv-menu-button--small {
  min-width: 86px;
  height: 32px;
  padding: 0 18px;
  font-size: 13px;
}

.pk-dv-menu-button--large {
  min-width: 128px;
  height: 46px;
  padding: 0 30px;
  font-size: 17px;
}

.pk-dv-menu-button--block {
  display: flex;
  width: 100%;
}

.pk-dv-menu-button--disabled,
.pk-dv-menu-button:disabled {
  cursor: not-allowed;
  filter: grayscale(0.25);
  opacity: 0.52;
}

@keyframes pk-dv-menu-button-shine {
  0%,
  48% {
    left: -55%;
    opacity: 0;
  }

  58% {
    opacity: 1;
  }

  78%,
  100% {
    left: 110%;
    opacity: 0;
  }
}
</style>
