import { getBetweenDates } from '@/datetime'
import dayjs from 'dayjs'

it('normal', () => {
  expect(getBetweenDates(
    dayjs('2023-10-16').toDate(),
    dayjs('2023-10-20').toDate(),
    'date'
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
  expect(() => getBetweenDates('2023-10-01' as any, '2023-11-01' as any, 'D')).toThrow()
  expect(() => getBetweenDates(1 as any, 2 as any, 'D')).toThrow()
  expect(() => getBetweenDates(true as any, false as any, 'D')).toThrow()
  expect(() => getBetweenDates({} as any, [] as any, 'D')).toThrow()
})


it('unitType is null', () => {
  expect(() => getBetweenDates(new Date(), new Date(), undefined)).toThrow()
  expect(() => getBetweenDates(new Date(), new Date(), null)).toThrow()
})

it('unitType is incorrect', () => {
  expect(() => getBetweenDates(new Date(), new Date(), 1 as any)).toThrow()
})
