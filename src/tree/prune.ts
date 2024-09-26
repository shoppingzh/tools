import { BaseNode, checkNodes, DEFAULT_CHILDREN_PROP, NodePredicate } from './_base'

/**
 * 剪枝
 * 
 * 该算法会就地(in place)修改节点的children属性，同时，也会修改根节点列表本身，以保持对整个树的写入一致性
 * 
 * @param nodes 节点列表
 * @param predicate 推断回调，返回true表示被剪掉
 * @param childrenProp 子节点列表属性
 * 
 * @returns 原节点数组
 */
export function prune<E extends BaseNode>(
  nodes: E[],
  predicate: NodePredicate<E>,
  childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E,
) {
  checkNodes(nodes)
  const doPrune = (nodes: E[], parent?: E, depth = 0): E[] => {
    return nodes.filter(node => {
      const shouldPrune = predicate(node, parent, depth)
      if (shouldPrune) return false

      if (!node[childrenProp]) return true
      node[childrenProp] = doPrune(node[childrenProp], node, depth + 1) as any // FIXME type
      return true
    })
  }

  const newNodes = doPrune(nodes)
  nodes.splice(0, nodes.length, ...newNodes)
  return nodes
}
