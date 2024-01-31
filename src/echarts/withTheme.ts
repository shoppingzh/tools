import { wrapArray } from '@/_internal'
import type { EChartsOption, XAXisComponentOption, YAXisComponentOption, SeriesOption, SliderDataZoomComponentOption, InsideDataZoomComponentOption, ContinousVisualMapComponentOption, PiecewiseVisualMapComponentOption, AxisPointerComponentOption, TitleComponentOption, GridComponentOption, PolarComponentOption, RadarComponentOption, PlainLegendComponentOption, ScrollableLegendComponentOption, RadiusAxisComponentOption, AngleAxisComponentOption, SingleAxisComponentOption, TimelineComponentOption, AriaComponentOption, TooltipComponentOption, ToolboxComponentOption, BrushComponentOption, GeoComponentOption, ParallelComponentOption, GraphicComponentOption, CalendarComponentOption } from 'echarts'
import { merge } from 'lodash'

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

/** 非对象配置 */
interface NonobjectTheme {
  darkMode?: EChartsOption['darkMode']
  backgroundColor?: EChartsOption['backgroundColor']
  animation?: EChartsOption['animation']
  animationThreshold?: EChartsOption['animationThreshold']
  animationDuration?: EChartsOption['animationDuration']
  animationEasing?: EChartsOption['animationEasing']
  animationDelay?: EChartsOption['animationDelay']
  animationDurationUpdate?: EChartsOption['animationDurationUpdate']
  animationEasingUpdate?: EChartsOption['animationEasingUpdate']
  animationDelayUpdate?: EChartsOption['animationDelayUpdate']
  useUTC?: EChartsOption['useUTC']
  color?: Partial<EChartsOption['color']> // FIXME 类型有问题 
}
/** 不区分类型的对象配置 */
interface UnTypedObjectTheme {
  aria?: Partial<AriaComponentOption>
  textStyle?: Partial<Pick<TitleComponentOption['textStyle'], 'color' | 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>>
  stateAnimation?: Partial<EChartsOption['stateAnimation']>

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
/** 区分类型的对象配置 */
interface TypedObjectTheme {
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
type ObjectTheme = UnTypedObjectTheme & TypedObjectTheme
export type Theme = NonobjectTheme & ObjectTheme

interface MergeOption {
  /** echarts 配置项名称 */
  optionName: keyof EChartsOption
  /** 主题配置项名称 */
  themeName: keyof Theme
  /** 合并策略 passive：被动合并，echarts配置有值，才合并主题配置 active：主动合并，不管echarts配置是否有值，主动合并主题配置 */
  strategy: 'passive' | 'active'
  /** echarts配置按照类型进行分发的类型列名，如果分发，则从主题配置项中寻找下一级内容进行合并 */
  optionTypeKey?: string
  /** 如果echarts配置没有设置类型，则按照默认类型进行分发 */
  defaultOptionType?: string
}

const MERGE_OPTIONS: MergeOption[] = [
  { optionName: 'darkMode', themeName: 'darkMode', strategy: 'active', },
  { optionName: 'backgroundColor', themeName: 'backgroundColor', strategy: 'active', },
  { optionName: 'animation', themeName: 'animation', strategy: 'active', },
  { optionName: 'animationThreshold', themeName: 'animationThreshold', strategy: 'active', },
  { optionName: 'animationDuration', themeName: 'animationDuration', strategy: 'active', },
  { optionName: 'animationEasing', themeName: 'animationEasing', strategy: 'active', },
  { optionName: 'animationDelay', themeName: 'animationDelay', strategy: 'active', },
  { optionName: 'animationDurationUpdate', themeName: 'animationDurationUpdate', strategy: 'active', },
  { optionName: 'animationEasingUpdate', themeName: 'animationEasingUpdate', strategy: 'active', },
  { optionName: 'animationDelayUpdate', themeName: 'animationDelayUpdate', strategy: 'active', },
  { optionName: 'useUTC', themeName: 'useUTC', strategy: 'active', },
  { optionName: 'color', themeName: 'color', strategy: 'active', },

  { optionName: 'legend', themeName: 'legend', strategy: 'passive', optionTypeKey: 'type', defaultOptionType: 'plain', },
  { optionName: 'xAxis', themeName: 'axis', strategy: 'passive', optionTypeKey: 'type', defaultOptionType: 'category', },
  { optionName: 'yAxis', themeName: 'axis', strategy: 'passive', optionTypeKey: 'type', defaultOptionType: 'value', },
  { optionName: 'radiusAxis', themeName: 'radiusAxis', strategy: 'passive', optionTypeKey: 'type', },
  { optionName: 'angleAxis', themeName: 'angleAxis', strategy: 'passive', optionTypeKey: 'type', },
  { optionName: 'dataZoom', themeName: 'dataZoom', strategy: 'passive', optionTypeKey: 'type', },
  { optionName: 'visualMap', themeName: 'visualMap', strategy: 'passive', optionTypeKey: 'type', },
  { optionName: 'axisPointer', themeName: 'axisPointer', strategy: 'passive', optionTypeKey: 'type', },
  { optionName: 'singleAxis', themeName: 'singleAxis', strategy: 'passive', optionTypeKey: 'type', },
  { optionName: 'timeline', themeName: 'timeline', strategy: 'passive', optionTypeKey: 'type', },
  { optionName: 'series', themeName: 'series', strategy: 'passive', optionTypeKey: 'type', },

  // 下面这三个待定
  { optionName: 'aria', themeName: 'aria', strategy: 'passive', },
  { optionName: 'textStyle', themeName: 'textStyle', strategy: 'passive', },
  { optionName: 'stateAnimation', themeName: 'stateAnimation', strategy: 'passive', },

  { optionName: 'title', themeName: 'title', strategy: 'passive', },
  { optionName: 'grid', themeName: 'grid', strategy: 'passive', },
  { optionName: 'polar', themeName: 'polar', strategy: 'passive', },
  { optionName: 'radar', themeName: 'radar', strategy: 'passive', },
  { optionName: 'tooltip', themeName: 'tooltip', strategy: 'passive', },
  { optionName: 'toolbox', themeName: 'toolbox', strategy: 'passive', },
  { optionName: 'brush', themeName: 'brush', strategy: 'passive', },
  { optionName: 'geo', themeName: 'geo', strategy: 'passive', },
  { optionName: 'parallel', themeName: 'parallel', strategy: 'passive', },
  { optionName: 'parallelAxis', themeName: 'parallelAxis', strategy: 'passive', },
  { optionName: 'graphic', themeName: 'graphic', strategy: 'passive', },
  { optionName: 'calendar', themeName: 'calendar', strategy: 'passive', },
  { optionName: 'media', themeName: 'media', strategy: 'passive', },
]

function coverOrMerge<T extends object>(object: T, key: keyof T, mergeValue: any) {
  if (!object) return
  const value = object[key]
  if (typeof value === 'object' && value !== null) {
    merge(value, mergeValue)
  } else {
    object[key] = mergeValue
  }
}

/**
 * 主动合并
 * 不管echarts配置项是否有值，都将主题的配置合并进去
 * 
 * @param option 
 * @param optionName 
 * @param theme 
 * @param themeName 
 */
function mergeActive(option: EChartsOption, optionName: keyof EChartsOption, theme: Theme, themeName: keyof Theme) {
  coverOrMerge(option, optionName, theme[themeName])
}

/**
 * 被动合并
 * 只有在echarts配置项有值时，才将主题配置合并进去
 * 
 * @param option 
 * @param optionName 
 * @param theme 
 * @param themeName 
 * @param typeKey 
 * @param defaultOptionType
 * @returns 
 */
function mergePassive(option: EChartsOption, optionName: keyof EChartsOption, theme: Theme, themeName: keyof Theme, typeKey?: string, defaultOptionType?: string) {
  const optionValue: any = option[optionName]
  const themeValue = theme[themeName]
  if (optionValue == null || themeValue == null) return

  if (typeof optionValue === 'object') {
    const optionValueList = wrapArray(optionValue)
    optionValueList.forEach(subOptionValue => {
      if (subOptionValue == null) return
      let subThemeValue = themeValue
      // 设置了类型，从下级中找具体配置
      if (typeKey) {
        const type = subOptionValue[typeKey]
        subThemeValue = (themeValue as any)[type || defaultOptionType] // FIXME 强化类型
      }
      if (!subThemeValue) return

      merge(subOptionValue, subThemeValue)
    })
  } else {
    coverOrMerge(option, optionName, themeValue)
  }
}


/**
 * 使用主题配置加工echarts的配置项
 * 
 * @param option echarts option
 * @param theme 主题配置
 * @returns 
 */
export function withTheme(option: EChartsOption, theme: Theme): EChartsOption {
  if (!option) return null
  if (!theme) return option

  MERGE_OPTIONS.forEach((mergeOption) => {
    const { optionName, themeName, strategy, optionTypeKey, defaultOptionType } = mergeOption
    const themeValue = theme[themeName]
    if (themeValue == null) return // 主题配置没有值，无论如何都不合并

    if (strategy === 'active') {
      mergeActive(option, optionName, theme, themeName)
    } else if (strategy === 'passive') {
      mergePassive(option, optionName, theme, themeName, optionTypeKey, defaultOptionType)
    }
  })
  return option
}
