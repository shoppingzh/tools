import { traverse } from '@/tree'
import nodes from './_nodes'

it('exception: unknown strategy', () => {
  expect(() => traverse(nodes, () => {}, 'abc' as any)).toThrow()
})
