import { getObjectType } from '@/_internal/lang'

/**
 * 判断是否为数组
 * @param value 
 * @returns 
 */
export function isArray(value: any) {
  return getObjectType(value) === '[object Array]'
}
