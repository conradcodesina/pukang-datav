import type { App, DefineComponent } from 'vue'

export type PkDatavComponent = DefineComponent<Record<string, any>, Record<string, any>, any>

declare const PukangDatav: {
  install: (app: App) => void
}

export default PukangDatav

export const PkDvBarChart: PkDatavComponent
export const PkDvBorderBox: PkDatavComponent
export const PkDvCell: PkDatavComponent
export const PkDvChart: PkDatavComponent
export const PkDvDecoration: PkDatavComponent
export const PkDvDigitalNumber: PkDatavComponent
export const PkDvGaugeChart: PkDatavComponent
export const PkDvGlowTitle: PkDatavComponent
export const PkDvGradientPanel: PkDatavComponent
export const PkDvGrid: PkDatavComponent
export const PkDvGroup: PkDatavComponent
export const PkDvHeaderTitle: PkDatavComponent
export const PkDvLayer: PkDatavComponent
export const PkDvLineChart: PkDatavComponent
export const PkDvFlylineMap: PkDatavComponent
export const PkDvGeoPanel: PkDatavComponent
export const PkDvMapCanvas: PkDatavComponent
export const PkDvMapChina: PkDatavComponent
export const PkDvMenuButton: PkDatavComponent
export const PkDvPanel: PkDatavComponent
export const PkDvPieChart: PkDatavComponent
export const PkDvPointMap: PkDatavComponent
export const PkDvProgress: PkDatavComponent
export const PkDvRadarChart: PkDatavComponent
export const PkDvRankList: PkDatavComponent
export const PkDvRingProgress: PkDatavComponent
export const PkDvScreen: PkDatavComponent
export const PkDvScrollNotice: PkDatavComponent
export const PkDvScrollTable: PkDatavComponent
export const PkDvStatCard: PkDatavComponent
export const PkDvStatusDot: PkDatavComponent
export const PkDvTime: PkDatavComponent

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PkDvBarChart: typeof PkDvBarChart
    PkDvBorderBox: typeof PkDvBorderBox
    PkDvCell: typeof PkDvCell
    PkDvChart: typeof PkDvChart
    PkDvDecoration: typeof PkDvDecoration
    PkDvDigitalNumber: typeof PkDvDigitalNumber
    PkDvGaugeChart: typeof PkDvGaugeChart
    PkDvGlowTitle: typeof PkDvGlowTitle
    PkDvGradientPanel: typeof PkDvGradientPanel
    PkDvGrid: typeof PkDvGrid
    PkDvGroup: typeof PkDvGroup
    PkDvHeaderTitle: typeof PkDvHeaderTitle
    PkDvLayer: typeof PkDvLayer
    PkDvLineChart: typeof PkDvLineChart
    PkDvFlylineMap: typeof PkDvFlylineMap
    PkDvGeoPanel: typeof PkDvGeoPanel
    PkDvMapCanvas: typeof PkDvMapCanvas
    PkDvMapChina: typeof PkDvMapChina
    PkDvMenuButton: typeof PkDvMenuButton
    PkDvPanel: typeof PkDvPanel
    PkDvPieChart: typeof PkDvPieChart
    PkDvPointMap: typeof PkDvPointMap
    PkDvProgress: typeof PkDvProgress
    PkDvRadarChart: typeof PkDvRadarChart
    PkDvRankList: typeof PkDvRankList
    PkDvRingProgress: typeof PkDvRingProgress
    PkDvScreen: typeof PkDvScreen
    PkDvScrollNotice: typeof PkDvScrollNotice
    PkDvScrollTable: typeof PkDvScrollTable
    PkDvStatCard: typeof PkDvStatCard
    PkDvStatusDot: typeof PkDvStatusDot
    PkDvTime: typeof PkDvTime
  }
}
