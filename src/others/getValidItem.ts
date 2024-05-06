import { getObjectPropValue, isNil } from '@/_internal'

type Prop<T, R = unknown> = (keyof T) | ((item: T) => R)

interface Props<T> {
  value: Prop<T>
  valid: Prop<T, boolean>
}

/**
 * 尝试在一个待选列表中，获取可用项
 * 如果当前值可用，直接返回该项；如果不可用，尝试返回第一个可用项；如果都不可用，则返回空
 * 
 * 注1：如果当前值为undefined或null，不会在待选列表中寻找，而是返回第一个可用项
 * 注2：寻找第一个可用项时，会跳过值为undefined或null的项
 * 
 * @param currentValue 当前值
 * @param items 选择列表
 * @param props 属性
 * @returns 被选中选项或undefined
 */
export function getValidItem<T>(currentValue: any, items: T[], props: Props<T>): T {
  if (!items || !items.length) return undefined

  let current: T
  if (!isNil(props.value) && !isNil(currentValue)) {
    current = items.find(o => currentValue === getObjectPropValue(o, props.value))
  }
  const isValid = current != null && !isNil(props.valid) && !!getObjectPropValue(current, props.valid)
  if (isValid) return current

  if (isNil(props.valid)) return undefined
  return items.find(o => !isNil(getObjectPropValue(o, props.value)) && !!getObjectPropValue(o, props.valid))
}
