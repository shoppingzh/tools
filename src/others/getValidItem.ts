import { getObjectPropValue } from '@/_internal'

type Prop<T, R = unknown> = (keyof T) | ((item: T) => R)

interface Props<T> {
  value: Prop<T>
  valid: Prop<T, boolean>
}

/**
 * 获取当前选择列表中第一个可用项
 * 
 * @param currentValue 当前值
 * @param items 选择列表
 * @param props 属性
 * @returns 
 */
export function getValidItem<T>(currentValue: any, items: T[], props: Props<T>): T {
  if (!items || !items.length) return null
  const current = items.find(o => currentValue === getObjectPropValue(o, props.value))
  const isValid = getObjectPropValue(current, props.valid)
  if (isValid) return current
  return items.find(o => !!(getObjectPropValue(o, props.valid)))
}
