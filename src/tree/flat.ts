import { DEFAULT_CHILDREN_PROP, TraverseStrategy } from './_base'
import { traverse } from './traverse'

/**
 * 将树平铺为数组
 * 
 * 注：鉴于遍历算法有可能不同，因此返回的平铺数组不承诺节点顺序的一致性(如一定遵循深度优先顺序或广度优先顺序)
 * 
 * @param nodes 树节点列表
 * @param childrenProp 子节点列表字段(默认children)
 * @returns 
 */
export function flat<E>(
  nodes: E[],
  traverseStrategy: TraverseStrategy = 'bfs',
  childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E
) {
  const flatNodes: E[] = []
  traverse(nodes, (node) => {
    flatNodes.push(node)
  }, traverseStrategy, childrenProp)
  return flatNodes
}
