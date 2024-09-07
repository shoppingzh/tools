import { traverseBreadth } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const result: [string, string, number][] = []
  traverseBreadth(nodes, (node, parent, depth) => {
    result.push([node.name, parent?.name, depth])
  })
  expect(result).toEqual([
    ['1', undefined, 0],
    ['2', undefined, 0],
    ['3', undefined, 0],
    ['1-1', '1', 1],
    ['1-2', '1', 1],
    ['2-1', '2', 1],
    ['2-2', '2', 1],
    ['1-1-1', '1-1', 2],
    ['1-1-2', '1-1', 2],
    ['1-2-1', '1-2', 2],
    ['1-2-2', '1-2', 2],
    ['1-2-2-1', '1-2-2', 3],
    ['1-2-2-2', '1-2-2', 3],
    ['1-2-2-2-1', '1-2-2-2', 4],
    ['1-2-2-2-2', '1-2-2-2', 4],
  ])
})

it('nodes is empty', () => {
  const callback = jest.fn()
  traverseBreadth([], callback)
  expect(callback).not.toBeCalled()
})

it('break', () => {
  let times = 0
  traverseBreadth(nodes, (node) => {
    times++
    if (node.name === '1-2-2') return true
  })
  expect(times).toBe(11)
})

it('exception: nodes is nil', () => {
  expect(() => traverseBreadth(null, () => {})).toThrow()
  expect(() => traverseBreadth(undefined, () => {})).toThrow()
})

it('exception: callback is nil', () => {
  expect(() => traverseBreadth(nodes, null)).toThrow()
  expect(() => traverseBreadth(nodes, undefined)).toThrow()
})

it('exception: callback is not function', () => {
  expect(() => traverseBreadth(nodes, {} as any)).toThrow()
  expect(() => traverseBreadth(nodes, 1 as any)).toThrow()
  expect(() => traverseBreadth(nodes, [] as any)).toThrow()
  expect(() => traverseBreadth(nodes, true as any)).toThrow()
  expect(() => traverseBreadth(nodes, '1' as any)).toThrow()
})
