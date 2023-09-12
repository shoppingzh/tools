import { getObjectPropValue, ObjectKeyType } from '@/_internal'

/**
 * 将数组转为一个对象map
 * 
 * @param arr 对象数组
 * @param keyOrMapKey 数组中对象的主键
 * @returns 
 */
export function toMap<T extends object>(arr: T[], keyOrMapKey: (keyof T) | ((o: T) => ObjectKeyType)): Record<ObjectKeyType, T> {
  const map: Record<ObjectKeyType, T> = Object.create(null) // 一定要注意！不能直接使用{}，否则会带上Object.prototype的属性！

  arr.forEach(o => {
    const key = getObjectPropValue(o, keyOrMapKey)
    map[key as ObjectKeyType] = o
  })
  return map
}
