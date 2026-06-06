<!--
/**
 * 组件介绍：大屏可视化数字翻牌组件
 * 作者：蒲康
 */
-->
<template>
  <span class="pk-dv-digital-number">
    <span v-if="prefix" class="pk-dv-digital-number__affix">{{ prefix }}</span>
    <span class="pk-dv-digital-number__value">{{ displayValue }}</span>
    <span v-if="suffix" class="pk-dv-digital-number__affix">{{ suffix }}</span>
  </span>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

defineOptions({
  name: 'PkDvDigitalNumber',
})

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 900,
  },
  precision: {
    type: Number,
    default: 0,
  },
  separator: {
    type: Boolean,
    default: true,
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
})

const currentValue = ref(0)
let frameId = 0

const formatValue = (value) => {
  const fixed = Number(value).toFixed(props.precision)
  if (!props.separator) return fixed

  const [integer, decimal] = fixed.split('.')
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimal ? `${formatted}.${decimal}` : formatted
}

const displayValue = computed(() => formatValue(currentValue.value))

const animateTo = (nextValue, previousValue) => {
  cancelAnimationFrame(frameId)

  const startTime = performance.now()
  const delta = nextValue - previousValue

  const step = (now) => {
    const progress = Math.min((now - startTime) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    currentValue.value = previousValue + delta * eased

    if (progress < 1) {
      frameId = requestAnimationFrame(step)
    } else {
      currentValue.value = nextValue
    }
  }

  frameId = requestAnimationFrame(step)
}

watch(
  () => props.value,
  (value, oldValue) => {
    animateTo(value, oldValue ?? 0)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
})
</script>

<style scoped>
.pk-dv-digital-number {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  color: var(--pk-datav-primary);
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.pk-dv-digital-number__value {
  font-size: inherit;
  font-weight: inherit;
}

.pk-dv-digital-number__affix {
  color: var(--pk-datav-muted);
  font-size: 0.42em;
  font-weight: 500;
}
</style>
