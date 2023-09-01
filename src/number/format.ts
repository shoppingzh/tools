function createCache(maxSize = 100) {
  const map = new Map<string, Intl.NumberFormat>()

  return {
    make: function(thousandth: boolean, fraction: number): Intl.NumberFormat {
      const key = `${thousandth}/${fraction}`
      let formatter = map.get(key)
      if (!formatter) {
        const options: Intl.NumberFormatOptions = {
          useGrouping: !!thousandth,
          maximumFractionDigits: fraction == null ? 20 : fraction,
        }
        if (fraction != null) {
          options.minimumFractionDigits = fraction
        }
        formatter = new Intl.NumberFormat(undefined, options)
        if (map.size > maxSize) {
          map.delete(map.keys().next().value)
        }
        map.set(key, formatter)
      }
      return formatter
    }
  }
}

const cache = createCache()

/**
 * 格式化数值
 * 
 * @param value 数值
 * @param thousandth 千分位
 * @param fraction 小数位
 * @returns 
 */
export function format(value: number, thousandth?: boolean, fraction?: number): string {
  if (value == null) return null
  return cache.make(thousandth, fraction).format(value)
}
