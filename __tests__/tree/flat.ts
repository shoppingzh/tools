import { flat } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const flatNodes = flat(nodes)
  expect(flatNodes.length).toBe(15)
  expect(flatNodes.map(o => o.name).sort()).toEqual([
    '1-1-2',
    '1-2-1',
    '1-1-1',
    '1',
    '1-2-2-2-1',
    '1-1',
    '1-2',
    '1-2-2-2-2',
    '3',
    '1-2-2-2',
    '2',
    '1-2-2',
    '2-1',
    '1-2-2-1',
    '2-2',
  ].sort())
})

it('exception: nodes is nil', () => {
  expect(() => flat(undefined)).toThrow()
  expect(() => flat(null)).toThrow()
})
