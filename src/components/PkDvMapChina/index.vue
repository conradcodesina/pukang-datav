<!--
/**
 * 组件介绍：大屏可视化中国地图组件
 * 作者：蒲康
 */
-->
<template>
  <pk-dv-chart :option="chartOption" :height="height" />
</template>

<script setup>
import * as echarts from 'echarts'
import { computed, watch } from 'vue'
import PkDvChart from '../PkDvChart/index.vue'
import { mergeOption } from '../../utils/mergeOption.js'

defineOptions({
  name: 'PkDvMapChina',
})

const props = defineProps({
  geoJson: {
    type: Object,
    default: null,
  },
  mapName: {
    type: String,
    default: 'china',
  },
  data: {
    type: Array,
    default: () => [],
  },
  height: {
    type: [Number, String],
    default: 420,
  },
  option: {
    type: Object,
    default: () => ({}),
  },
  southSeaInset: {
    type: Boolean,
    default: true,
  },
  southSeaInsetBounds: {
    type: Object,
    default: () => ({
      minX: 124.6,
      minY: 18.1,
      maxX: 130.4,
      maxY: 25,
    }),
  },
})

const SOUTH_SEA_NAME = '南海诸岛'
const SOUTH_SEA_ORIGINAL_NAME = '__pk_dv_south_sea_original__'
const SOUTH_SEA_FRAME_NAME = '__pk_dv_south_sea_frame__'

const isSouthSeaFeature = (properties = {}) => (
  properties.name === SOUTH_SEA_NAME ||
  properties.name === SOUTH_SEA_ORIGINAL_NAME ||
  properties.adcode === '100000_JD' ||
  properties.adchar === 'JD'
)

const flattenCoordinates = (coordinates, result = []) => {
  if (!Array.isArray(coordinates)) return result

  if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
    result.push(coordinates)
  } else {
    coordinates.forEach((item) => flattenCoordinates(item, result))
  }

  return result
}

const getFeatureBounds = (feature) => {
  const points = flattenCoordinates(feature?.geometry?.coordinates)
  if (!points.length) return null

  const xs = points.map((point) => point[0])
  const ys = points.map((point) => point[1])

  return {
    minX: Math.min(...xs),
    minY: Math.min(...ys),
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
  }
}

const createSouthSeaFrameFeature = (feature) => {
  const bounds = getFeatureBounds(feature)
  if (!bounds) return null

  const paddingX = (bounds.maxX - bounds.minX) * 0.03
  const paddingY = (bounds.maxY - bounds.minY) * 0.03
  const minX = bounds.minX - paddingX
  const minY = bounds.minY - paddingY
  const maxX = bounds.maxX + paddingX
  const maxY = bounds.maxY + paddingY
  const labelPoint = [
    (minX + maxX) / 2,
    minY + (maxY - minY) * 0.08,
  ]

  return {
    type: 'Feature',
    properties: {
      name: SOUTH_SEA_FRAME_NAME,
      pkDvSynthetic: true,
      cp: labelPoint,
      center: labelPoint,
      centroid: labelPoint,
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [minX, maxY],
        [maxX, maxY],
        [maxX, minY],
        [minX, minY],
        [minX, maxY],
      ]],
    },
  }
}

const transformCoordinatesToBounds = (coordinates, sourceBounds, targetBounds) => {
  if (!Array.isArray(coordinates)) return coordinates

  if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
    const sourceWidth = sourceBounds.maxX - sourceBounds.minX || 1
    const sourceHeight = sourceBounds.maxY - sourceBounds.minY || 1
    const targetWidth = targetBounds.maxX - targetBounds.minX
    const targetHeight = targetBounds.maxY - targetBounds.minY
    const x = targetBounds.minX + ((coordinates[0] - sourceBounds.minX) / sourceWidth) * targetWidth
    const y = targetBounds.minY + ((coordinates[1] - sourceBounds.minY) / sourceHeight) * targetHeight

    return coordinates.length > 2 ? [x, y, ...coordinates.slice(2)] : [x, y]
  }

  return coordinates.map((item) => transformCoordinatesToBounds(item, sourceBounds, targetBounds))
}

const createSouthSeaInsetFeature = (feature) => {
  const bounds = getFeatureBounds(feature)
  if (!props.southSeaInset || !bounds) return feature

  const targetBounds = props.southSeaInsetBounds

  return {
    ...feature,
    properties: {
      ...feature.properties,
      center: [
        (targetBounds.minX + targetBounds.maxX) / 2,
        targetBounds.minY + (targetBounds.maxY - targetBounds.minY) * 0.18,
      ],
      centroid: [
        (targetBounds.minX + targetBounds.maxX) / 2,
        targetBounds.minY + (targetBounds.maxY - targetBounds.minY) * 0.18,
      ],
    },
    geometry: {
      ...feature.geometry,
      coordinates: transformCoordinatesToBounds(feature.geometry.coordinates, bounds, targetBounds),
    },
  }
}

const southSeaRegionOption = {
  name: SOUTH_SEA_NAME,
  label: {
    show: false,
  },
  itemStyle: {
    areaColor: 'rgba(24, 215, 255, 0.1)',
    borderColor: '#18d7ff',
    borderWidth: 1,
    shadowBlur: 10,
    shadowColor: 'rgba(24, 215, 255, 0.26)',
  },
  emphasis: {
    label: { show: false },
    itemStyle: {
      areaColor: 'rgba(24, 215, 255, 0.18)',
      borderColor: '#18d7ff',
      borderWidth: 1.2,
    },
  },
}

const southSeaFrameOption = {
  name: SOUTH_SEA_FRAME_NAME,
  value: 0,
  label: {
    show: true,
    color: 'rgba(234, 247, 255, 0.9)',
    fontSize: 10,
    formatter: SOUTH_SEA_NAME,
  },
  itemStyle: {
    areaColor: 'rgba(24, 215, 255, 0.02)',
    borderColor: '#18d7ff',
    borderWidth: 1,
    shadowBlur: 10,
    shadowColor: 'rgba(24, 215, 255, 0.28)',
  },
  emphasis: {
    disabled: true,
    label: {
      show: true,
      color: '#fff',
      formatter: SOUTH_SEA_NAME,
    },
    itemStyle: {
      areaColor: 'rgba(24, 215, 255, 0.02)',
      borderColor: '#18d7ff',
      borderWidth: 1,
    },
  },
}

const southSeaOriginalOption = {
  name: SOUTH_SEA_ORIGINAL_NAME,
  value: 0,
  label: {
    show: false,
  },
  itemStyle: {
    areaColor: 'rgba(24, 215, 255, 0.08)',
    borderColor: 'rgba(24, 215, 255, 0.7)',
    borderWidth: 1,
  },
  emphasis: {
    disabled: true,
    label: { show: false },
  },
}

const normalizedGeoJson = computed(() => {
  if (!props.geoJson?.features) return props.geoJson

  const features = []
  const insetFeatures = []

  props.geoJson.features.forEach((feature) => {
    const properties = feature.properties || {}

    if (!isSouthSeaFeature(properties)) {
      features.push(feature)
      return
    }

    const normalizedFeature = {
      ...feature,
      properties: {
        ...properties,
        name: properties.name || SOUTH_SEA_NAME,
      },
    }

    if (!props.southSeaInset) {
      features.push(normalizedFeature)
      return
    }

    features.push({
      ...feature,
      properties: {
        ...properties,
        name: SOUTH_SEA_ORIGINAL_NAME,
        pkDvSouthSeaOriginal: true,
      },
    })
    insetFeatures.push(createSouthSeaInsetFeature(normalizedFeature))
  })

  const displayFeatures = features.concat(insetFeatures)
  const southSeaFeature = insetFeatures.find((feature) => isSouthSeaFeature(feature.properties))
    || displayFeatures.find((feature) => feature.properties?.name === SOUTH_SEA_NAME)
  const hasSouthSeaFrame = displayFeatures.some((feature) => feature.properties?.name === SOUTH_SEA_FRAME_NAME)
  const southSeaFrameFeature = !hasSouthSeaFrame ? createSouthSeaFrameFeature(southSeaFeature) : null

  return {
    ...props.geoJson,
    features: southSeaFrameFeature ? displayFeatures.concat(southSeaFrameFeature) : displayFeatures,
  }
})

const hasSouthSea = computed(() => normalizedGeoJson.value?.features?.some((feature) => feature.properties?.name === SOUTH_SEA_NAME))
const hasSouthSeaOriginal = computed(() => normalizedGeoJson.value?.features?.some((feature) => feature.properties?.name === SOUTH_SEA_ORIGINAL_NAME))

const mapData = computed(() => {
  const data = [...props.data]
  const hasSouthSeaData = data.some((item) => item.name === SOUTH_SEA_NAME)
  const hasSouthSeaOriginalData = data.some((item) => item.name === SOUTH_SEA_ORIGINAL_NAME)
  const hasSouthSeaFrameData = data.some((item) => item.name === SOUTH_SEA_FRAME_NAME)

  if (hasSouthSea.value && !hasSouthSeaData) {
    data.push({
      ...southSeaRegionOption,
      value: 0,
    })
  }

  if (hasSouthSeaOriginal.value && !hasSouthSeaOriginalData) {
    data.push(southSeaOriginalOption)
  }

  if (hasSouthSea.value && !hasSouthSeaFrameData) {
    data.push(southSeaFrameOption)
  }

  return data
})

watch(
  () => [normalizedGeoJson.value, props.mapName],
  () => {
    if (normalizedGeoJson.value) {
      echarts.registerMap(props.mapName, normalizedGeoJson.value)
    }
  },
  { immediate: true }
)

const formatMapLabel = (params) => {
  const name = String(params.name || '')
  if (name === SOUTH_SEA_FRAME_NAME || name === SOUTH_SEA_ORIGINAL_NAME) return ''

  const normalizedName = name === '100000_JD' || name === 'JD' ? SOUTH_SEA_NAME : name

  return normalizedName
    .replace('维吾尔自治区', '')
    .replace('壮族自治区', '')
    .replace('回族自治区', '')
    .replace('特别行政区', '')
    .replace('自治区', '')
    .replace('省', '')
    .replace('市', '')
}

const chartOption = computed(() => mergeOption({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(7, 24, 45, 0.92)',
    borderColor: 'rgba(24, 215, 255, 0.28)',
    textStyle: { color: '#eaf7ff' },
    formatter: (params) => {
      if (params.name === SOUTH_SEA_FRAME_NAME || params.name === SOUTH_SEA_ORIGINAL_NAME) return SOUTH_SEA_NAME
      return params.name
    },
  },
  visualMap: {
    show: false,
    min: 0,
    max: Math.max(...props.data.map((item) => Number(item.value) || 0), 100),
    inRange: {
      color: ['rgba(24, 215, 255, 0.18)', 'rgba(24, 215, 255, 0.72)'],
    },
  },
  series: [
    {
      type: 'map',
      map: props.mapName,
      roam: false,
      layoutCenter: ['50%', '50%'],
      layoutSize: '88%',
      data: mapData.value,
      label: {
        show: true,
        color: 'rgba(234, 247, 255, 0.76)',
        fontSize: 11,
        formatter: formatMapLabel,
      },
      regions: [
        {
          name: SOUTH_SEA_NAME,
          ...southSeaRegionOption,
        },
        southSeaOriginalOption,
        southSeaFrameOption,
      ],
      itemStyle: {
        areaColor: 'rgba(24, 215, 255, 0.16)',
        borderColor: 'rgba(24, 215, 255, 0.65)',
        borderWidth: 1,
      },
      emphasis: {
        label: { color: '#fff' },
        itemStyle: { areaColor: '#18d7ff' },
      },
    },
  ],
}, props.option))
</script>
