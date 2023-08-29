import { getObjectType } from '@/_internal/lang'

/**
 * 判断是否为数组
 * @param value 
 * @returns 
 */
export function isArray(value: any) {
  return getObjectType(value) === 'Array'
}

/**
 * 在数组特定位置的后面插入N个元素
 * 
 * @param arr 数组
 * @param index 位置
 * @param object 插入的元素
 * @returns 
 */
export function insert<T>(arr: T[], index: number, objects: T[]): T[];
export function insert<T>(arr: T[], index: number, object: T): T;
export function insert<T>(arr: T[], index: number, object: any) {
  if (!arr) return null
  if (Array.isArray(object)) {
    arr.splice(index + 1, 0, ...object)
  } else {
    arr.splice(index + 1, 0, object)
  }

  return object
}
