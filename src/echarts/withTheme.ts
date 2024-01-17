import type { EChartsOption, XAXisComponentOption, YAXisComponentOption, SeriesOption } from 'echarts'

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
type BaseTheme = Partial<Pick<EChartsOption, 'title'>>
interface Theme extends BaseTheme {
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

export function withTheme(option: EChartsOption, theme: Theme): EChartsOption {
  option.yAxis

  return option
}
