import { DEFAULT_CHILDREN_PROP, TraverseCallback } from './_base'

/**
 * 深度遍历
 * 
 * @param nodes 节点列表
 * @param callback 回调
 * @param childrenProp 子节点列表属性
 */
export function traverseDeep<E>(nodes: E[], callback: TraverseCallback<E>, childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E) {
  const doTraverse = (nodes: E[], parent?: E, depth: number = 0) => {
    if (!nodes || !nodes.length) return
    for (let i = 0;i < nodes.length;i++) {
      const node = nodes[i]
      const isBreak = callback(node, parent, depth)
      if (isBreak === true) return true
      const isBeforeBreak = doTraverse(node[childrenProp] as E[], node, depth + 1)
      if (isBeforeBreak) return true
    }
  }
  doTraverse(nodes)
}
