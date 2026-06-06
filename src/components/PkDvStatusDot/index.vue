<!--
/**
 * 组件介绍：大屏可视化状态灯组件
 * 作者：蒲康
 */
-->
<template>
  <span class="pk-dv-status-dot" :class="[`pk-dv-status-dot--${type}`, { 'pk-dv-status-dot--pulse': pulse }]">
    <span class="pk-dv-status-dot__point"></span>
    <span v-if="text" class="pk-dv-status-dot__text">{{ text }}</span>
  </span>
</template>

<script setup>
defineOptions({
  name: 'PkDvStatusDot',
})

defineProps({
  type: {
    type: String,
    default: 'online',
    validator: (value) => ['online', 'offline', 'warning', 'danger', 'processing'].includes(value),
  },
  text: {
    type: String,
    default: '',
  },
  pulse: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.pk-dv-status-dot {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--pk-datav-muted);
  font-size: 0.8125rem;
}

.pk-dv-status-dot__point {
  position: relative;
  width: 8px;
  height: 8px;
  flex: none;
  background: currentColor;
  border-radius: 50%;
}

.pk-dv-status-dot--online {
  color: var(--pk-datav-accent);
}

.pk-dv-status-dot--offline {
  color: rgba(234, 247, 255, 0.42);
}

.pk-dv-status-dot--warning {
  color: var(--pk-datav-warning);
}

.pk-dv-status-dot--danger {
  color: var(--pk-datav-danger);
}

.pk-dv-status-dot--processing {
  color: var(--pk-datav-primary);
}

.pk-dv-status-dot--pulse .pk-dv-status-dot__point::after {
  position: absolute;
  inset: -5px;
  content: '';
  border: 1px solid currentColor;
  border-radius: 50%;
  animation: pk-dv-status-dot-pulse 1.6s ease-out infinite;
}

@keyframes pk-dv-status-dot-pulse {
  from {
    opacity: 0.9;
    transform: scale(0.45);
  }

  to {
    opacity: 0;
    transform: scale(1.2);
  }
}
</style>
