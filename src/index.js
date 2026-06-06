import './styles/theme.css'

import {
  PkDvBarChart,
  PkDvBorderBox,
  PkDvCell,
  PkDvChart,
  PkDvDecoration,
  PkDvDigitalNumber,
  PkDvGaugeChart,
  PkDvGlowTitle,
  PkDvGradientPanel,
  PkDvGrid,
  PkDvGroup,
  PkDvHeaderTitle,
  PkDvLayer,
  PkDvLineChart,
  PkDvFlylineMap,
  PkDvGeoPanel,
  PkDvMapCanvas,
  PkDvMapChina,
  PkDvMenuButton,
  PkDvPanel,
  PkDvPieChart,
  PkDvPointMap,
  PkDvProgress,
  PkDvRadarChart,
  PkDvRankList,
  PkDvRingProgress,
  PkDvScreen,
  PkDvScrollNotice,
  PkDvScrollTable,
  PkDvStatCard,
  PkDvStatusDot,
  PkDvTime,
} from './exports.js'

const components = [
  PkDvScreen,
  PkDvPanel,
  PkDvGrid,
  PkDvCell,
  PkDvGroup,
  PkDvHeaderTitle,
  PkDvMenuButton,
  PkDvGradientPanel,
  PkDvLayer,
  PkDvStatCard,
  PkDvDigitalNumber,
  PkDvRankList,
  PkDvScrollTable,
  PkDvStatusDot,
  PkDvTime,
  PkDvBorderBox,
  PkDvDecoration,
  PkDvGlowTitle,
  PkDvScrollNotice,
  PkDvProgress,
  PkDvRingProgress,
  PkDvChart,
  PkDvLineChart,
  PkDvBarChart,
  PkDvPieChart,
  PkDvGaugeChart,
  PkDvRadarChart,
  PkDvMapCanvas,
  PkDvPointMap,
  PkDvFlylineMap,
  PkDvGeoPanel,
  PkDvMapChina,
]

const toKebabName = (name) =>
  name
    .replace(/^Pk/, 'pk')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()

const install = (app) => {
  components.forEach((component) => {
    if (!component?.name) return

    app.component(toKebabName(component.name), component)
  })
}

export * from './exports.js'

export default {
  install,
}
