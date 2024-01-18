import type { EChartsOption, XAXisComponentOption, YAXisComponentOption, SeriesOption, SliderDataZoomComponentOption, InsideDataZoomComponentOption, ContinousVisualMapComponentOption, PiecewiseVisualMapComponentOption, AxisPointerComponentOption, TitleComponentOption, LegendComponentOption, GridComponentOption, PolarComponentOption, RadarComponentOption, PlainLegendComponentOption, ScrollableLegendComponentOption, RadiusAxisComponentOption, AngleAxisComponentOption, SingleAxisComponentOption, TimelineComponentOption, AriaComponentOption, TooltipComponentOption, ToolboxComponentOption, BrushComponentOption, GeoComponentOption, ParallelComponentOption, GraphicComponentOption, CalendarComponentOption } from 'echarts'
import { merge } from 'lodash'

interface Typeable<T extends string = string> {
  type?: T
}
type AndType<From, Type> = From & { type: Type }
interface ThemeLegend {
  plain?: PlainLegendComponentOption
  scroll?: ScrollableLegendComponentOption
}
type AxisComponentOption = Partial<XAXisComponentOption | YAXisComponentOption>
interface ThemeAxis {
  category?: Partial<AndType<AxisComponentOption, 'category'>>
  value?: Partial<AndType<AxisComponentOption, 'value'>>
  time?: Partial<AndType<AxisComponentOption, 'time'>>
  log?: Partial<AndType<AxisComponentOption, 'log'>>
}
interface ThemeRadiusAxis {
  value?: Partial<AndType<RadiusAxisComponentOption, 'value'>>
  category?: Partial<AndType<RadiusAxisComponentOption, 'category'>>
  time?: Partial<AndType<RadiusAxisComponentOption, 'time'>>
  log?: Partial<AndType<RadiusAxisComponentOption, 'log'>>
}
interface ThemeAngleAxis {
  value?: Partial<AndType<AngleAxisComponentOption, 'value'>>
  category?: Partial<AndType<AngleAxisComponentOption, 'category'>>
  time?: Partial<AndType<AngleAxisComponentOption, 'time'>>
  log?: Partial<AndType<AngleAxisComponentOption, 'log'>>
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
interface ThemeSingleAxis {
  value?: Partial<AndType<SingleAxisComponentOption, 'value'>>
  category?: Partial<AndType<SingleAxisComponentOption, 'category'>>
  time?: Partial<AndType<SingleAxisComponentOption, 'time'>>
  log?: Partial<AndType<SingleAxisComponentOption, 'log'>>
}
interface ThemeTimeline {
  slider?: Partial<TimelineComponentOption>
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

interface BaseTheme {
  aria?: Partial<AriaComponentOption>
  darkMode?: EChartsOption['darkMode']
  backgroundColor?: EChartsOption['backgroundColor']
  textStyle?: Partial<Pick<TitleComponentOption['textStyle'], 'color' | 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>>
  animation?: EChartsOption['animation']
  animationThreshold?: EChartsOption['animationThreshold']
  animationDuration?: EChartsOption['animationDuration']
  animationEasing?: EChartsOption['animationEasing']
  animationDelay?: EChartsOption['animationDelay']
  animationDurationUpdate?: EChartsOption['animationDurationUpdate']
  animationEasingUpdate?: EChartsOption['animationEasingUpdate']
  animationDelayUpdate?: EChartsOption['animationDelayUpdate']
  stateAnimation?: Partial<EChartsOption['stateAnimation']>
  useUTC?: EChartsOption['useUTC']
  title?: Partial<TitleComponentOption>
  grid?: Partial<GridComponentOption>
  polar?: Partial<PolarComponentOption>
  radar?: Partial<RadarComponentOption>
  tooltip?: Partial<TooltipComponentOption>
  toolbox?: Partial<ToolboxComponentOption>
  brush?: Partial<BrushComponentOption>
  geo?: Partial<GeoComponentOption>
  parallel?: Partial<ParallelComponentOption>
  parallelAxis?: Partial<EChartsOption['parallelAxis']> // FIXME 类型有问题
  graphic?: Partial<GraphicComponentOption>
  calendar?: Partial<CalendarComponentOption>
  media?: Partial<EChartsOption['media']> // FIXME 类型有问题
}
interface TypedTheme {
  legend?: ThemeLegend
  axis?: ThemeAxis
  radiusAxis?: ThemeRadiusAxis
  angleAxis?: ThemeAngleAxis
  dataZoom?: ThemeDataZoom
  visualMap?: ThemeVisualMap
  axisPointer?: ThemeAxisPointer
  singleAxis?: ThemeSingleAxis
  timeline?: ThemeTimeline
  series?: ThemeSeries
}
export type Theme = BaseTheme & TypedTheme

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
  const normalTypesOptionKeys: (keyof TypedTheme)[]
    = ['legend', 'axis', 'radiusAxis', 'angleAxis', 'dataZoom', 'visualMap', 'axisPointer', 'singleAxis', 'timeline', 'series']
  const nonobjectOptionKeys: (keyof BaseTheme)[] = ['darkMode', 'backgroundColor', 'animation', 'animationThreshold', 'animationDuration', 'animationEasing', 'animationDelay', 'animationDurationUpdate', 'animationEasingUpdate', 'animationDelayUpdate', 'useUTC']

  Object.entries(option).forEach(([name, value]) => {
    const themeValue = theme[name as keyof Theme]
    if (name === 'xAxis' || name === 'yAxis') {
      mergeTypes([...wrapArray(option.xAxis), ...wrapArray(option.yAxis)], theme.axis)
    } else if (normalTypesOptionKeys.includes(name as keyof TypedTheme)) {
      mergeTypes(wrapArray(option[name]), theme[name as keyof TypedTheme])
    } else if (nonobjectOptionKeys.includes(name as keyof BaseTheme)) {
      option[name] = themeValue
    } else {
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
