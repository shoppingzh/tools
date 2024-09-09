import { findFirstLeaf } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  expect(findFirstLeaf(nodes)?.name).toBe('1-1-1')
})
