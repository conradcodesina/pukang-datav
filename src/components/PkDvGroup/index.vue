<!--
/**
 * 组件介绍：大屏可视化弹性分组组件
 * 作者：蒲康
 */
-->
<template>
  <div class="pk-dv-group" :style="groupStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'PkDvGroup',
})

const props = defineProps({
  direction: {
    type: String,
    default: 'row',
    validator: (value) => ['row', 'column'].includes(value),
  },
  gap: {
    type: String,
    default: '12px',
  },
  align: {
    type: String,
    default: 'stretch',
  },
  justify: {
    type: String,
    default: 'flex-start',
  },
  wrap: {
    type: Boolean,
    default: false,
  },
})

const groupStyle = computed(() => ({
  display: 'flex',
  flexDirection: props.direction,
  flexWrap: props.wrap ? 'wrap' : 'nowrap',
  gap: props.gap,
  alignItems: props.align,
  justifyContent: props.justify,
}))
</script>

<style scoped>
.pk-dv-group {
  width: 100%;
  min-width: 0;
}
</style>
