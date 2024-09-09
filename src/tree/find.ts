import { BaseNode, DEFAULT_CHILDREN_PROP, NodePredicate, TraverseStrategy } from './_base'
import { traverse } from './traverse'

/**
 * 寻找指定节点
 * 
 * 注意：使用不同的遍历策略，会导致找到的元素不同！！
 * 
 * @param nodes 节点列表
 * @param predicate 推断函数，返回truthy时找到节点
 * @param traverseStrategy 遍历策略，默认使用bfs广度优先算法
 * @param childrenProp 子节点列表属性
 */
export function find<E extends BaseNode>(
  nodes: E[],
  predicate: NodePredicate<E>,
  traverseStrategy: TraverseStrategy = 'bfs',
  childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E
): E | undefined {
  if (predicate == null) throw new Error('predicate is nil')

  let foundNode: E
  traverse(nodes, (node, parent, depth) => {
    const pass = predicate(node, parent, depth)
    if (pass) {
      foundNode = node
      return true
    }
  }, traverseStrategy, childrenProp)
  return foundNode
}
