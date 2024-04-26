import { getValidItem } from '../../src/others'

it('normal', () => {
  expect(getValidItem(null, [1, 2, 3, 4], { value: o => o, valid: o => o != null })).toBe(1)
})
