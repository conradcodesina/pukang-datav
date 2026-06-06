<!--
/**
 * 组件介绍：大屏可视化顶部标题组件
 * 作者：蒲康
 */
-->
<template>
  <header class="pk-dv-header-title" :class="{ 'pk-dv-header-title--animated': animated }">
    <div class="pk-dv-header-title__center">
      <div class="pk-dv-header-title__line pk-dv-header-title__line--left"></div>
      <div class="pk-dv-header-title__main">
        <component :is="tag" class="pk-dv-header-title__text">
          <slot>{{ title }}</slot>
        </component>
        <div v-if="subTitle" class="pk-dv-header-title__sub">{{ subTitle }}</div>
      </div>
      <div class="pk-dv-header-title__line pk-dv-header-title__line--right"></div>
    </div>
  </header>
</template>

<script setup>
defineOptions({
  name: 'PkDvHeaderTitle',
})

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
    default: 'h1',
  },
  animated: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.pk-dv-header-title {
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 76px;
  padding: 10px 18px 0;
  color: var(--pk-datav-text);
  background:
    radial-gradient(circle at 50% 0%, rgba(24, 215, 255, 0.22), transparent 42%),
    linear-gradient(90deg, transparent, rgba(24, 215, 255, 0.1), transparent);
}

.pk-dv-header-title::before,
.pk-dv-header-title::after {
  position: absolute;
  top: 0;
  width: 34%;
  height: 3px;
  content: '';
  background: linear-gradient(90deg, transparent, var(--pk-datav-primary), transparent);
  box-shadow: 0 0 16px rgba(24, 215, 255, 0.55);
}

.pk-dv-header-title::before {
  left: 0;
}

.pk-dv-header-title::after {
  right: 0;
}

.pk-dv-header-title__center {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;
  width: min(100%, 860px);
  min-width: 0;
}

.pk-dv-header-title__main {
  position: relative;
  min-width: 280px;
  padding: 10px 44px 14px;
  text-align: center;
  background:
    linear-gradient(180deg, rgba(24, 215, 255, 0.22), rgba(24, 215, 255, 0.04)),
    rgba(4, 22, 40, 0.72);
  border: 1px solid rgba(24, 215, 255, 0.42);
  border-top: 0;
  clip-path: polygon(7% 0, 93% 0, 100% 100%, 0 100%);
  box-shadow:
    inset 0 0 22px rgba(24, 215, 255, 0.2),
    0 0 24px rgba(24, 215, 255, 0.16);
}

.pk-dv-header-title__text {
  margin: 0;
  color: #f2fbff;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0;
  text-shadow: 0 0 18px rgba(24, 215, 255, 0.78);
}

.pk-dv-header-title__sub {
  margin-top: 4px;
  color: rgba(189, 230, 255, 0.78);
  font-size: 0.75rem;
  line-height: 1.3;
}

.pk-dv-header-title__line {
  height: 18px;
  background:
    linear-gradient(90deg, transparent, rgba(24, 215, 255, 0.86)),
    linear-gradient(180deg, transparent 45%, rgba(24, 215, 255, 0.65) 45%, rgba(24, 215, 255, 0.65) 55%, transparent 55%);
  clip-path: polygon(0 42%, 84% 42%, 100% 100%, 12% 100%);
  opacity: 0.88;
}

.pk-dv-header-title__line--right {
  transform: scaleX(-1);
}

.pk-dv-header-title--animated::before,
.pk-dv-header-title--animated::after {
  animation: pk-dv-header-title-line 2.4s ease-in-out infinite;
}

.pk-dv-header-title--animated .pk-dv-header-title__main {
  animation: pk-dv-header-title-glow 3s ease-in-out infinite;
}

@keyframes pk-dv-header-title-line {
  0%,
  100% {
    opacity: 0.55;
  }

  50% {
    opacity: 1;
  }
}

@keyframes pk-dv-header-title-glow {
  0%,
  100% {
    box-shadow:
      inset 0 0 18px rgba(24, 215, 255, 0.16),
      0 0 18px rgba(24, 215, 255, 0.12);
  }

  50% {
    box-shadow:
      inset 0 0 28px rgba(24, 215, 255, 0.28),
      0 0 28px rgba(24, 215, 255, 0.22);
  }
}
</style>
