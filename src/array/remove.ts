
/**
 * 删除数组指定索引的元素
 * 
 * @param arr 数组
 * @param indexes 索引
 */
export function remove<T>(arr: T[], index: number): T[];
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
