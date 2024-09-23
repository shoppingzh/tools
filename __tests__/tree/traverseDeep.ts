import { traverse, } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const result: [string, string, number][] = []
  traverse(nodes, (node, parent, depth) => {
    result.push([node.name, parent?.name, depth])
  })
  expect(result).toEqual([
    ['1', undefined, 0],
    ['1-1', '1', 1],
    ['1-1-1', '1-1', 2],
    ['1-1-2', '1-1', 2],
    ['1-2', '1', 1],
    ['1-2-1', '1-2', 2],
    ['1-2-2', '1-2', 2],
    ['1-2-2-1', '1-2-2', 3],
    ['1-2-2-2', '1-2-2', 3],
    ['1-2-2-2-1', '1-2-2-2', 4],
    ['1-2-2-2-2', '1-2-2-2', 4],
    ['2', undefined, 0],
    ['2-1', '2', 1],
    ['2-2', '2', 1],
    ['3', undefined, 0],
  ])
})

it('nodes is empty', () => {
  const callback = jest.fn()
  traverse([], callback)
  expect(callback).not.toBeCalled()
})

it('exception: nodes is not array', () => {
  expect(() => traverse(1 as any, () => {})).toThrow()
})

it('exception: nodes is nil', () => {
  expect(() => traverse(null, () => {})).toThrow()
  expect(() => traverse(undefined, () => {})).toThrow()
})

it('break', () => {
  let times = 0
  traverse(nodes, (node) => {
    times++
    if (node.name === '1-2-2') return true
  })
  expect(times).toBe(7)
})

it('exception: callback is not function', () => {
  expect(() => traverse(nodes, {} as any)).toThrow()
  expect(() => traverse(nodes, 1 as any)).toThrow()
  expect(() => traverse(nodes, [] as any)).toThrow()
  expect(() => traverse(nodes, true as any)).toThrow()
  expect(() => traverse(nodes, '1' as any)).toThrow()
})

it('exception: callback is nil', () => {
  expect(() => traverse(nodes, null)).toThrow()
  expect(() => traverse(nodes, undefined)).toThrow()
})

it('set children prop', () => {
  let times = 0
  traverse(nodes, () => {
    times++
  }, 'dfs-pre', 'childNodes' as any)
  expect(times).toBeLessThanOrEqual(3)
})
