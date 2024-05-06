import { getValidItem } from '../../src/others'

it('normal', () => {
  expect(getValidItem(null, [1, 2, 3, 4], { value: o => o, valid: o => o != null })).toBe(1)
  expect(getValidItem(null, [null, null, 2, null, 3], { value: o => o, valid: o => o != null })).toBe(2)
  expect(getValidItem(1, [null, null, 2, null, 3], { value: o => o, valid: o => o != null })).toBe(2)
  expect(getValidItem(3, [null, null, 2, null, 3], { value: o => o, valid: o => o != null })).toBe(3)
})

it('object', () => {
  const tabs = [{ value: 1 }, { value: 2, disabled: true }, { value: 3 }]
  expect(getValidItem(null, tabs, { value: 'value', valid: o => !o.disabled })).toMatchObject({ value: 1 })
  expect(getValidItem(4, tabs, { value: 'value', valid: o => !o.disabled })).toMatchObject({ value: 1 })
  expect(getValidItem(3, tabs, { value: 'value', valid: o => !o.disabled })).toMatchObject({ value: 3 })
})

it('current is undefined/null', () => {
  const tabs = [{ value: 1, disabled: true }, { value: 2 }, { value: undefined as any, name: 'hello' }, { value: 3 }]
  expect(getValidItem(undefined, tabs, { value: 'value', valid: o => !o.disabled })).toMatchObject({ name: 'hello' })
  expect(getValidItem(null, tabs, { value: 'value', valid: o => !o.disabled })).toMatchObject({ value: 2, })
})

it('items is empty', () => {
  expect(getValidItem(1, null, { value: 'value', valid: 'valid' })).toBeUndefined()
  expect(getValidItem(1, undefined, { value: 'value', valid: 'valid' })).toBeUndefined()
  expect(getValidItem(1, [], { value: 'value', valid: 'valid' })).toBeUndefined()
})

it('props is empty', () => {
  expect(() => getValidItem(1, [1, 2, 3], null)).toThrow()
})
