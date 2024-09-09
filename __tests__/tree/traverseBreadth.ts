import { traverse } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const result: [string, string, number][] = []
  traverse(nodes, (node, parent, depth) => {
    result.push([node.name, parent?.name, depth])
  }, 'bfs')
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
  traverse([], callback, 'bfs')
  expect(callback).not.toBeCalled()
})

it('break', () => {
  let times = 0
  traverse(nodes, (node) => {
    times++
    if (node.name === '1-2-2') return true
  }, 'bfs')
  expect(times).toBe(11)
})

it('exception: nodes is nil', () => {
  expect(() => traverse(null, () => {}, 'bfs')).toThrow()
  expect(() => traverse(undefined, () => {}, 'bfs')).toThrow()
})

it('exception: callback is nil', () => {
  expect(() => traverse(nodes, null, 'bfs')).toThrow()
  expect(() => traverse(nodes, undefined, 'bfs')).toThrow()
})

it('exception: callback is not function', () => {
  expect(() => traverse(nodes, {} as any, 'bfs')).toThrow()
  expect(() => traverse(nodes, 1 as any, 'bfs')).toThrow()
  expect(() => traverse(nodes, [] as any, 'bfs')).toThrow()
  expect(() => traverse(nodes, true as any, 'bfs')).toThrow()
  expect(() => traverse(nodes, '1' as any, 'bfs')).toThrow()
})
