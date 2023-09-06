interface Config {
  numbers: string[]
  units: string[]
  negative: string
}
type Type = 'uppercase' | 'lowercase'

const CONFIGS: Record<Type, Config> = {
  uppercase: {
    numbers: [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'],
    units: ['', '拾', '佰', '仟', '万', '亿', '兆', '京', '垓'],
    negative: '負',
  },
  lowercase: {
    numbers: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    units: ['', '十', '百', '千', '万', '亿', '兆', '京', '垓'],
    negative: '负',
  },
}

// 注：算法有问题！！
export function formatChinese(num: number, uppercase?: boolean): string {
  const config = CONFIGS[uppercase ? 'uppercase' : 'lowercase']
  const intNumber = Math.abs(Math.round(num))
  let current = intNumber

  const list: string[] = []
  let digitIndex = 0
  let hasGtZero = false // 标识在当前数值后是否存在过不为0的数

  while (current > 0) {
    const digit = current % 10
    const n = config.numbers[digit]
    const count = Math.floor(digitIndex / 4) // 进位的数量
    const mainUnitIndex = count + Math.min(digitIndex, 3)

    let unit = ''
    // 当前位不为0，才有单位
    if (digit !== 0) {
      if (count > 0) {
        unit += config.units[digitIndex % 4]
      }
      unit += config.units[mainUnitIndex]
    }
    // 如果当前数字是0，且当前数字后出现过0，则跳过
    if (digit !== 0 || hasGtZero) {
      list.unshift(`${n}${unit}`)
    }

    current = Math.floor(current / 10)
    hasGtZero = digit > 0
    digitIndex++
  }

  let result = list.join('')

  // 特殊处理：以“一十”开头的表述，去掉“一”
  if (result.startsWith(`${config.numbers[1]}${config.units[1]}`)) {
    result = result.substring(1)
  }

  if (num < 0) {
    result = config.negative + result
  }

  return result
}
