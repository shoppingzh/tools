import { isObject } from 'lodash'

export function getQueryValue(value: any): string {
  if (value == null) return ''
  return String(value)
}

/**
 * 创建查询字符串
 * 
 * 注：对象的undefined属性会跳过，null属性会被处理为空字符串
 * 
 * @param object 对象
 * @param encode 是否编码
 * @returns 
 */
export function createQuerystring<T extends object>(object: T, encode?: boolean): string {
  if (object == null) return ''
  if (!isObject(object)) throw new Error('object is not Object!')

  const pairs: string[] = []
  Object.entries(object).forEach(([name, value]) => {
    if (value === undefined) return
    let queryValue = getQueryValue(value)
    if (encode) {
      queryValue = encodeURIComponent(queryValue)
    }
    pairs.push(`${name}=${queryValue}`)
  })
  return pairs.join('&')
}
