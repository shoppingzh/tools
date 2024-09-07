import { traverseDeep, } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const result: [string, string, number][] = []
  traverseDeep(nodes, (node, parent, depth) => {
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
  traverseDeep([], callback)
  expect(callback).not.toBeCalled()
})

it('break', () => {
  let times = 0
  traverseDeep(nodes, (node) => {
    times++
    if (node.name === '1-2-2') return true
  })
  expect(times).toBe(7)
})

it('set children prop', () => {
  let times = 0
  traverseDeep(nodes, () => {
    times++
  }, 'childNodes' as any)
  expect(times).toBeLessThanOrEqual(3)
})

it('exception: nodes is nil', () => {
  expect(() => traverseDeep(null, () => {})).toThrow()
  expect(() => traverseDeep(undefined, () => {})).toThrow()
})

it('exception: callback is nil', () => {
  expect(() => traverseDeep(nodes, null)).toThrow()
  expect(() => traverseDeep(nodes, undefined)).toThrow()
})

it('exception: callback is not function', () => {
  expect(() => traverseDeep(nodes, {} as any)).toThrow()
  expect(() => traverseDeep(nodes, 1 as any)).toThrow()
  expect(() => traverseDeep(nodes, [] as any)).toThrow()
  expect(() => traverseDeep(nodes, true as any)).toThrow()
  expect(() => traverseDeep(nodes, '1' as any)).toThrow()
})
