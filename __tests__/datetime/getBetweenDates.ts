import { getBetweenDates, Type } from '@/datetime'
import dayjs, { UnitType } from 'dayjs'

function date(str: string, startOf?: UnitType, endOf?: UnitType) {
  let d = dayjs(str)
  if (startOf) {
    d = d.startOf(startOf)
  }
  if (endOf) {
    d = d.endOf(endOf)
  }
  return d.toDate()
}

function dates(strList: string[], startOf?: UnitType, endOf?: UnitType) {
  return strList.map(str => date(str, startOf, endOf))
}

it('normal', () => {
  expect(getBetweenDates(
    dayjs('2023-10-16').toDate(),
    dayjs('2023-10-20').toDate(),
    'day'
  )).toEqual([
    dayjs('2023-10-16').toDate(),
    dayjs('2023-10-17').toDate(),
    dayjs('2023-10-18').toDate(),
    dayjs('2023-10-19').toDate(),
    dayjs('2023-10-20').toDate(),
  ])
})

it('from/to is null', () => {
  expect(() => getBetweenDates(undefined, new Date(), 'month')).toThrow()
  expect(() => getBetweenDates(null, new Date(), 'month')).toThrow()

  expect(() => getBetweenDates(new Date(), undefined, 'month')).toThrow()
  expect(() => getBetweenDates(new Date(), null, 'month')).toThrow()
})

it('from/to is not date', () => {
  expect(() => getBetweenDates('2023-10-01' as any, '2023-11-01' as any, 'day')).toThrow()
  expect(() => getBetweenDates(1 as any, 2 as any, 'day')).toThrow()
  expect(() => getBetweenDates(true as any, false as any, 'day')).toThrow()
  expect(() => getBetweenDates({} as any, [] as any, 'day')).toThrow()
})

it('from/to is invalid date', () => {
  expect(getBetweenDates(new Date(NaN), new Date(), 'year')).toEqual([])
  expect(getBetweenDates(new Date(), new Date(NaN), 'year')).toEqual([])
})


it('unitType is null', () => {
  expect(() => getBetweenDates(new Date(), new Date(), undefined)).toThrow()
  expect(() => getBetweenDates(new Date(), new Date(), null)).toThrow()
})

it('unitType is incorrect', () => {
  expect(() => getBetweenDates(new Date(), new Date(), 1 as any)).toThrow()
})

it('unitTypes', () => {

  interface Pair {
    type: Type
    from: string
    to: string
    data: string[]
  }
  const pairs: Pair[] = [
    {
      type: 'year',
      from: '2024-05-01',
      to: '2027-01-16',
      data: ['2024-05-01', '2025-05-01', '2026-05-01']
    },
    // {
    //   type: 'quarter',
    //   from: '2024-01-16',
    //   to: '2024-12-01',
    //   data: ['2024-01-16', '2024-01-16']
    // },
    {
      type: 'month',
      from: '2024-01-16',
      to: '2024-05-01',
      data: ['2024-01-16', '2024-02-16', '2024-03-16', '2024-04-16']
    },
    {
      type: 'day',
      from: '2024-01-16',
      to: '2024-01-18',
      data: ['2024-01-16', '2024-01-17', '2024-01-18']
    },
    {
      type: 'hour',
      from: '2024-01-16 22',
      to: '2024-01-17 03',
      data: ['2024-01-16 22', '2024-01-16 23', '2024-01-17 00', '2024-01-17 01', '2024-01-17 02', '2024-01-17 03']
    },
    {
      type: 'minute',
      from: '2024-01-16 23:55',
      to: '2024-01-17 00:01',
      data: ['2024-01-16 23:55', '2024-01-16 23:56', '2024-01-16 23:57', '2024-01-16 23:58', '2024-01-16 23:59', '2024-01-17 00:00', '2024-01-17 00:01']
    },
    {
      type: 'second',
      from: '2024-01-16 23:59:58',
      to: '2024-01-17 00:00:02',
      data: ['2024-01-16 23:59:58', '2024-01-16 23:59:59', '2024-01-17 00:00:00', '2024-01-17 00:00:01', '2024-01-17 00:00:02',]
    }
  ]

  for (const pair of pairs) {
    // console.log(pair.type)
    expect(getBetweenDates(date(pair.from), date(pair.to), pair.type)).toEqual(dates(pair.data))
  }
})
