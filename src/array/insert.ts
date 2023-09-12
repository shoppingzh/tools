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
export function insert<T>(arr: T[], index: number, object: T): T[];
export function insert<T>(arr: T[], index: number, objects: any): T[] {
  if (index < 0) throw new Error('out of index')
  arr.splice(index, 0, ...(Array.isArray(objects) ? objects : [objects]))
  return arr
}
