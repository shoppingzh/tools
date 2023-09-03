const objectProto = Object.prototype

export type ObjectKeyType = string | number | symbol

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
