const objectProto = Object.prototype

export type ObjectKeyType = string | number | symbol
type FindObjectValue<T, R = unknown> = (keyof T) | ((o: T) => R)

function getObjectTag(value: any): string {
  return objectProto.toString.call(value)
}

/**
 * 获取对象类型
 * @param value 
 * @returns 
 */
export function getObjectType(value: any) {
  const tag = getObjectTag(value)
  return tag.substring(8, tag.length - 1)
}

/**
 * 判断是否为数组
 * @param value 
 * @returns 
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

/**
 * 判断是否为日期类型
 * @param value 
 * @returns 
 */
export function isDate(value: any): value is Date {
  return getObjectType(value) === 'Date'
}

/**
 * 获取对象的指定属性
 * 
 * @param object 对象
 * @param keyOrMap 对象key或回调
 * @returns 
 */
export function getObjectPropValue<T, R>(object: T, keyOrMap: FindObjectValue<T, R>) {
  return typeof keyOrMap === 'function' ? keyOrMap(object) : object[keyOrMap]
}


/**
 * 包装为数组
 * 
 * @param value 
 * @returns 
 */
export function wrapArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : (value == null ? [] : [value])
}
