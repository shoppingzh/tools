import { getObjectPropValue } from '@/_internal'

type Prop<T, R = unknown> = (keyof T) | ((item: T) => R)

interface Props<T> {
  value: Prop<T>
  valid: Prop<T, boolean>
}

/**
 * 尝试在一个待选列表中，获取可用项
 * 如果当前值可用，直接返回该项；如果不可用，尝试返回第一个可用项；如果都不可用，则返回空
 * 
 * @param currentValue 当前值
 * @param items 选择列表
 * @param props 属性
 * @returns 
 */
export function tryGetValidItem<T>(currentValue: any, items: T[], props: Props<T>): T {
  if (!items || !items.length) return null
  const current = items.find(o => currentValue === getObjectPropValue(o, props.value))
  const isValid = getObjectPropValue(current, props.valid)
  if (isValid) return current
  return items.find(o => !!(getObjectPropValue(o, props.valid)))
}
