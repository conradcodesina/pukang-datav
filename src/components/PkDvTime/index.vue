<!--
/**
 * 组件介绍：大屏可视化时间组件
 * 作者：蒲康
 */
-->
<template>
  <time class="pk-dv-time" :datetime="isoTime">{{ formattedTime }}</time>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

defineOptions({
  name: 'PkDvTime',
})

const props = defineProps({
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss',
  },
  interval: {
    type: Number,
    default: 1000,
  },
})

const now = ref(new Date())
const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const pad = (value) => String(value).padStart(2, '0')

const formattedTime = computed(() => {
  const date = now.value
  const tokens = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    ddd: weekNames[date.getDay()],
  }

  return Object.entries(tokens).reduce((result, [token, value]) => result.replaceAll(token, value), props.format)
})

const isoTime = computed(() => now.value.toISOString())

const timer = window.setInterval(() => {
  now.value = new Date()
}, props.interval)

onBeforeUnmount(() => {
  window.clearInterval(timer)
})
</script>

<style scoped>
.pk-dv-time {
  color: var(--pk-datav-text);
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
}
</style>
