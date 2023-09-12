/**
 * 移动数组元素
 * 
 * @param arr 数组
 * @param fromIndex 开始移动的索引位置
 * @param toIndex 移动到的索引位置
 * @returns 
 */
export function move<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const len = arr.length
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= len || toIndex >= len) throw new Error('index out of range')

  const removeList = arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, ...removeList)

  return arr
}
