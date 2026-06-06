<!--
/**
 * 组件介绍：大屏可视化装饰线组件
 * 作者：蒲康
 */
-->
<template>
  <div
    class="pk-dv-decoration"
    :class="[
      `pk-dv-decoration--${type}`,
      {
        'pk-dv-decoration--reverse': reverse,
        'pk-dv-decoration--animated': animated,
      },
    ]"
  >
    <span v-for="item in itemCount" :key="item" class="pk-dv-decoration__item"></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvDecoration',
})

const props = defineProps({
  type: {
    type: String,
    default: 'line',
    validator: (value) => ['line', 'bars', 'corner', 'divider'].includes(value),
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  animated: {
    type: Boolean,
    default: true,
  },
})

const itemCount = computed(() => (props.type === 'bars' ? 5 : 1))
</script>

<style scoped>
.pk-dv-decoration {
  width: 100%;
  color: var(--pk-datav-primary);
}

.pk-dv-decoration--line {
  position: relative;
  height: 12px;
  background:
    linear-gradient(90deg, currentColor 0 80px, transparent 80px 92px, rgba(24, 215, 255, 0.35) 92px 100%),
    linear-gradient(90deg, transparent, rgba(24, 215, 255, 0.22), transparent);
  background-position: left center, center bottom;
  background-repeat: no-repeat;
  background-size: 100% 2px, 100% 1px;
}

.pk-dv-decoration--line::after,
.pk-dv-decoration--divider::after {
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  height: 2px;
  content: '';
  background: linear-gradient(90deg, transparent, #fff, transparent);
  transform: translate(-100%, -50%);
  opacity: 0;
}

.pk-dv-decoration--animated.pk-dv-decoration--line::after,
.pk-dv-decoration--animated.pk-dv-decoration--divider::after {
  animation: pk-dv-decoration-flow 2.8s linear infinite;
}

.pk-dv-decoration--bars {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 18px;
}

.pk-dv-decoration--bars .pk-dv-decoration__item {
  width: 28px;
  height: 6px;
  background: currentColor;
  box-shadow: 0 0 12px rgba(24, 215, 255, 0.4);
  transform: skewX(-28deg);
}

.pk-dv-decoration--animated.pk-dv-decoration--bars .pk-dv-decoration__item {
  animation: pk-dv-decoration-bars 1.6s ease-in-out infinite;
}

.pk-dv-decoration--animated.pk-dv-decoration--bars .pk-dv-decoration__item:nth-child(2) {
  animation-delay: 0.12s;
}

.pk-dv-decoration--animated.pk-dv-decoration--bars .pk-dv-decoration__item:nth-child(3) {
  animation-delay: 0.24s;
}

.pk-dv-decoration--animated.pk-dv-decoration--bars .pk-dv-decoration__item:nth-child(4) {
  animation-delay: 0.36s;
}

.pk-dv-decoration--animated.pk-dv-decoration--bars .pk-dv-decoration__item:nth-child(5) {
  animation-delay: 0.48s;
}

.pk-dv-decoration--bars .pk-dv-decoration__item:nth-child(even) {
  width: 14px;
  opacity: 0.55;
}

.pk-dv-decoration--corner {
  position: relative;
  height: 26px;
}

.pk-dv-decoration--corner::before,
.pk-dv-decoration--corner::after {
  position: absolute;
  top: 0;
  width: 26px;
  height: 26px;
  content: '';
  border-top: 2px solid currentColor;
}

.pk-dv-decoration--corner::before {
  left: 0;
  border-left: 2px solid currentColor;
}

.pk-dv-decoration--corner::after {
  right: 0;
  border-right: 2px solid currentColor;
}

.pk-dv-decoration--divider {
  position: relative;
  height: 1px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  overflow: hidden;
}

.pk-dv-decoration--reverse {
  transform: scaleX(-1);
}

@keyframes pk-dv-decoration-flow {
  0% {
    opacity: 0;
    transform: translate(-100%, -50%);
  }

  20%,
  70% {
    opacity: 0.75;
  }

  100% {
    opacity: 0;
    transform: translate(120vw, -50%);
  }
}

@keyframes pk-dv-decoration-bars {
  0%,
  100% {
    opacity: 0.55;
    transform: skewX(-28deg) scaleY(0.78);
  }

  50% {
    opacity: 1;
    transform: skewX(-28deg) scaleY(1.2);
  }
}
</style>
