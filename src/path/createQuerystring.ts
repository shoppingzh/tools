import { isArray, isObject, isSet, isSymbol, merge } from 'lodash'

interface Options<T> {
  encode?: boolean
}
interface Pair {
  name?: string
  value?: string
}

function getQueryValue(value: any, encode: boolean) {
  const strValue = String(value)
  return encode ? encodeURIComponent(strValue) : strValue
}

function getPairs<T>(name: string, value: any, options: Options<T>, deep = true): Pair[] {
  // undefined跳过
  if (value === undefined) return []
  const pairs: Pair[] = []
  const encode = options.encode

  if (value === null) {
    pairs.push({ name, value: getQueryValue('', encode) })
  } else {
    // 数组/Set展开
    if (isArray(value) || isSet(value)) {
      for (const subValue of value) {
        if (deep) {
          const subPairs = getPairs(name, subValue, options, false)
          pairs.push(...subPairs)
        } else {
          pairs.push({ name, value: getQueryValue(subValue, encode) })
        }
      }
    } else if (isSymbol(value)) {
      // symbol跳过，处理了没意义
    } else {
      // 其他一律转为字符串
      pairs.push({ name, value: getQueryValue(value, encode) })
    }
  }


  return pairs
}

/**
 * 创建查询字符串
 * 
 * 注：对象的undefined属性会跳过，null属性会被处理为空字符串
 * 
 * @param object 对象
 * @param options 配置
 * @returns 
 */
export function createQuerystring<T extends object>(object: T, options?: Options<T>): string {
  if (object == null) return ''
  if (!isObject(object)) throw new Error('object is not Object!')
  const opts = merge({}, options)

  const pairs: Pair[] = []
  Object.entries(object).forEach(([name, value]) => {
    const currentPairs = getPairs(name, value, opts)
    pairs.push(...currentPairs)
  })

  return pairs.map(o => `${o.name}=${o.value}`).join('&')
}
