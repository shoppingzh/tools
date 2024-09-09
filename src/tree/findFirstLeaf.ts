import { BaseNode, DEFAULT_CHILDREN_PROP } from './_base'
import { find } from './find'

/**
 * 寻找第一个叶子节点
 * 
 * @param nodes 节点列表
 * @param childrenProp 子节点列表属性
 * @returns 
 */
export function findFirstLeaf<E extends BaseNode>(
  nodes: E[],
  childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E
) {
  return find(nodes, (node) => !(node[childrenProp] as E[])?.length, 'dfs-post', childrenProp)
}
