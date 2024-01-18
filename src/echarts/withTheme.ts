import type { EChartsOption, XAXisComponentOption, YAXisComponentOption, SeriesOption, SliderDataZoomComponentOption, InsideDataZoomComponentOption, ContinousVisualMapComponentOption, PiecewiseVisualMapComponentOption, AxisPointerComponentOption, TitleComponentOption, LegendComponentOption, GridComponentOption, PolarComponentOption, RadarComponentOption, PlainLegendComponentOption, ScrollableLegendComponentOption } from 'echarts'
import { merge } from 'lodash'

interface Typeable<T extends string = string> {
  type?: T
}
type AndType<From, Type> = From & { type: Type }
type AxisComponentOption = Partial<XAXisComponentOption | YAXisComponentOption>
interface ThemeAxis {
  category?: Partial<AndType<AxisComponentOption, 'category'>>
  value?: Partial<AndType<AxisComponentOption, 'value'>>
  time?: Partial<AndType<AxisComponentOption, 'time'>>
  log?: Partial<AndType<AxisComponentOption, 'log'>>
}
interface ThemeSeries {
  line?: Partial<AndType<SeriesOption, 'line'>>
  bar?: Partial<AndType<SeriesOption, 'bar'>>
  pie?: Partial<AndType<SeriesOption, 'pie'>>
  scatter?: Partial<AndType<SeriesOption, 'scatter'>>
  effectScatter?: Partial<AndType<SeriesOption, 'effectScatter'>>
  radar?: Partial<AndType<SeriesOption, 'radar'>>
  tree?: Partial<AndType<SeriesOption, 'tree'>>
  treemap?: Partial<AndType<SeriesOption, 'treemap'>>
  sunburst?: Partial<AndType<SeriesOption, 'sunburst'>>
  boxplot?: Partial<AndType<SeriesOption, 'boxplot'>>
  candlestick?: Partial<AndType<SeriesOption, 'candlestick'>>
  heatmap?: Partial<AndType<SeriesOption, 'heatmap'>>
  map?: Partial<AndType<SeriesOption, 'map'>>
  parallel?: Partial<AndType<SeriesOption, 'parallel'>>
  lines?: Partial<AndType<SeriesOption, 'lines'>>
  graph?: Partial<AndType<SeriesOption, 'graph'>>
  sankey?: Partial<AndType<SeriesOption, 'sankey'>>
  funnel?: Partial<AndType<SeriesOption, 'funnel'>>
  gauge?: Partial<AndType<SeriesOption, 'gauge'>>
  pictorialBar?: Partial<AndType<SeriesOption, 'pictorialBar'>>
  themeRiver?: Partial<AndType<SeriesOption, 'themeRiver'>>
  custom?: Partial<AndType<SeriesOption, 'custom'>>
}
interface ThemeLegend {
  plain?: PlainLegendComponentOption
  scroll?: ScrollableLegendComponentOption
}
interface ThemeDataZoom {
  inside?: InsideDataZoomComponentOption // 很奇怪，echarts在这里反常不使用type进行类型分发
  slider?: SliderDataZoomComponentOption
}
interface ThemeVisualMap {
  continuous?: ContinousVisualMapComponentOption // 很奇怪，echarts在这里反常不使用type进行类型分发
  piecewise?: PiecewiseVisualMapComponentOption
}
interface ThemeAxisPointer {
  line?: Partial<AndType<AxisPointerComponentOption, 'line'>>
  shadow?: Partial<AndType<AxisPointerComponentOption, 'shadow'>>
  none?: Partial<AndType<AxisPointerComponentOption, 'none'>>
}

interface BaseTheme {
  title?: TitleComponentOption
  grid?: GridComponentOption
  polar?: PolarComponentOption
  radar?: RadarComponentOption
}
export interface Theme extends BaseTheme {
  axis?: ThemeAxis
  series?: ThemeSeries
  legend?: ThemeLegend
  dataZoom?: ThemeDataZoom
  visualMap?: ThemeVisualMap
  axisPointer?: ThemeAxisPointer
}

function wrapArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : (value == null ? [] : [value])
}

function mergeTypes<Type extends string>(typeableList: Typeable<Type>[], types: Partial<Record<Type, any>>) {
  if (!types || !typeableList || !typeableList.length) return
  typeableList.forEach(item => {
    if (!item) return
    const config = types[item.type]
    if (!config) return
    merge(item, config)
  })
}


// const o: EChartsOption = {
//   axisPointer: [{
//     type: 'cross'
//   }, {
//     type: 'line',

//   }]
// }
// const theme: Theme = {
// }

/**
 * 使用主题配置加工echarts的配置项
 * 
 * 请注意：xAxis/yAxis/series一定要有type，该函数内部使用type区分不同的主题配置进行合并
 * @param option echarts option
 * @param theme 主题配置
 * @returns 
 */
export function withTheme(option: EChartsOption, theme: Theme): EChartsOption {
  if (!option) return null
  if (!theme) return option
  const normalTypesOptionKeys: (keyof Theme)[] = ['series', 'legend', 'dataZoom', 'visualMap', 'axisPointer']

  Object.entries(option).forEach(([name, value]) => {
    if (name === 'xAxis' || name === 'yAxis') {
      mergeTypes([...wrapArray(option.xAxis), ...wrapArray(option.yAxis)], theme.axis)
    } else if (normalTypesOptionKeys.includes(name as keyof Theme)) {
      mergeTypes(wrapArray(option[name]), theme[name as keyof Theme])
    } else {
      const themeValue = theme[name as keyof Theme]
      const valueList = wrapArray(value)
      if (valueList.length) {
        valueList.forEach(valueItem => {
          merge(valueItem, themeValue)
        })
      }
    }
  })

  return option
}
