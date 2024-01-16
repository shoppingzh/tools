import { isDate } from '@/_internal'
import dayjs, { ManipulateType } from 'dayjs'

export type Type = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'

function mapManipulateType(type: Type): ManipulateType {
  if (type === 'year') return 'year'
  if (type === 'month') return 'month'
  if (type === 'week') return 'week'
  if (type === 'day') return 'day'
  if (type === 'hour') return 'hour'
  if (type === 'minute') return 'minute'
  if (type === 'second') return 'second'
}

/**
 * 根据指定的日期/时间范围，获取范围列表
 * 
 * @param from 开始日期/时间
 * @param to 截止日期/时间
 * @param type 类型
 * @param useStart 是否将
 * @returns 
 */
export function getBetweenDates(from: Date, to: Date, type: Type): Date[] {
  if (!isDate(from) || !isDate(to)) throw new TypeError('日期/时间错误，必须为Date对象')
  const mType = mapManipulateType(type)
  if (!mType) throw new TypeError('type错误')

  const fromIns = dayjs(from)
  const toIns = dayjs(to)
  if (!fromIns.isValid() || !toIns.isValid()) return []

  const dates: Date[] = []
  const reverse = fromIns.isAfter(toIns)
  const minIns = !reverse ? fromIns : toIns
  const maxIns = !reverse ? toIns : fromIns

  let current = minIns
  while (current.isSame(maxIns) || current.isBefore(maxIns)) {
    const d = current.toDate()
    !reverse ? dates.push(d) : dates.unshift(d)
    current = current.add(1, mType)
  }

  return dates
}
