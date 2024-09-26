/** 遍历回调 */
export type TraverseCallback<T> = (node: T, parent: T, depth: number) => boolean | void
/** 节点推断函数 */
export type NodePredicate<T> = (node: T, parent: T, depth: number) => boolean
/** 遍历策略 dfs-pre 深度优先遍历-前序遍历 dfs-post 深度优先遍历-后序遍历 bfs 广度优先遍历 */
export type TraverseStrategy = 'dfs-pre' | 'dfs-post' | 'bfs'
export type BaseNode = Record<string, any>
/** 子节点列表字段类型 */
export type ChildrenKeyType = string | symbol
/** 默认子节点列表字段 */
export type DefaultChildrenKeyType = 'children'
/** 将原数据结构与指定的children属性合并成一个新的树结构 */
export type MixNodes<E extends BaseNode, ChildrenKey extends ChildrenKeyType> = E & { [key in ChildrenKey]: MixNodes<E, ChildrenKey>[] }

/** 默认子节点列表字段 */
export const DEFAULT_CHILDREN_PROP: ChildrenKeyType = 'children'

/**
 * 检查节点列表
 * 
 * @param nodes 
 */
export function checkNodes(nodes: any) {
  if (nodes == null) throw new Error('Nodes is nil')
  if (!Array.isArray(nodes)) throw new Error('Invalid nodes type')
}
