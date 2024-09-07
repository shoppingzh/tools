
export type TraverseCallback<T> = (node: T, parent: T, depth: number) => boolean | void
export type NodePredicate<T> = (node: T, parent: T, depth: number) => boolean

/** 默认子节点列表字段 */
export const DEFAULT_CHILDREN_PROP = 'children'

/**
 * 检查节点列表
 * 
 * @param nodes 
 */
export function checkNodes(nodes: any) {
  if (nodes == null) throw new Error('nodes is nil')
}
