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
 * 在数组特定位置的前面插入N个元素
 * 
 * 注：当插入位置小于0时将报错，大于最大索引时，将插入到数组的最后
 * 
 * @param arr 数组
 * @param index 位置
 * @param objects 插入的元素
 * @returns 返回原数组
 */
export function insert<T>(arr: T[], index: number, objects: T[]): T[];
export function insert<T>(arr: T[], index: number, objects: T): T;
export function insert<T>(arr: T[], index: number, objects: any) {
  if (index < 0) throw new Error('out of index')
  arr.splice(index, 0, ...(Array.isArray(objects) ? objects : [objects]))
  return arr
}

/**
 * 删除数组指定索引的元素
 * 
 * @param arr 数组
 * @param indexes 索引
 */
export function remove<T>(arr: T[], indexes: number): T[];
export function remove<T>(arr: T[], indexes: number[]): T[];
export function remove<T>(arr: T[], indexes: any) {
  let indexList = Array.isArray(indexes) ? indexes : [indexes]
  // 去重并从小到大排序
  indexList = [...new Set(indexList)].sort()

  const result: T[] = []

  for (let len = indexList.length, i = len - 1;i >= 0;i--) {
    const removeList = arr.splice(indexList[i], 1)
    result.unshift(...removeList)
  }

  return result
}
