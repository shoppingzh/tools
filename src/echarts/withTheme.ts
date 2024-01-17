import type { EChartsOption, XAXisComponentOption, YAXisComponentOption, SeriesOption } from 'echarts'
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
type BaseThemeOptionKeys = 'title'
type BaseTheme = Partial<Pick<EChartsOption, BaseThemeOptionKeys>>
export interface Theme extends BaseTheme {
  axis?: ThemeAxis
  series?: ThemeSeries
}

// const theme: Theme = {
//   title: {

//   },
//   axis: {
//     category: {
//       // type: 'category',
//       // type: 'category',
//       // data: [],
//       // type: 'category'
//       data: [],
//     },
//     value: {
//       scale: true,
//     },
//     time: {}
//   },
//   series: {
//     line: {
//       // 
//       lineStyle: {},
//     },
//     bar: {
//       barWidth: 10,
//     },
//     pie: {
//       // radius: 
//       radius: [],
//     },
//     scatter: {
//       clip: true,
//     },
//     effectScatter: {
//       rippleEffect: {}
//     },
//     radar: {
//       radarId: '1',
//     },
//     tree: {
//       initialTreeDepth: 1,
//     },
//     treemap: {
//       leafDepth: 1,
//     },
//     sunburst: {
//       stillShowZeroSum: true,
//     },
//     boxplot: {
//       boxWidth: null,
//     },
//     candlestick: {
//       barMaxWidth: 1,
//     },
//     heatmap: {

//     },
//   }
// }

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

  mergeTypes([...wrapArray(option.xAxis), ...wrapArray(option.yAxis)], theme.axis)
  mergeTypes(wrapArray(option.series), theme.series)

  const otherKeys: BaseThemeOptionKeys[] = ['title']
  otherKeys.forEach(key => {
    const currentOption = theme[key]
    if (!currentOption) return
    if (typeof option[key] === 'object' && option[key] != null) {
      merge(option[key], currentOption)
    } else {
      option[key] = currentOption
    }
  })

  return option
}
