import { checkNodes, DEFAULT_CHILDREN_PROP, TraverseCallback } from './_base'

/**
 * 深度遍历(先序)
 * 
 * @param nodes 节点列表
 * @param callback 回调
 * @param childrenProp 子节点列表属性
 */
export function traverseDeep<E>(nodes: E[], callback: TraverseCallback<E>, childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E) {
  checkNodes(nodes)

  const doTraverse = (nodes: E[], parent?: E, depth: number = 0) => {
    for (let i = 0;i < nodes.length;i++) {
      const node = nodes[i]
      const isBreak = callback(node, parent, depth)
      if (isBreak === true) return true

      const children = node[childrenProp] as E[]
      if (children && children.length) {
        const isBeforeBreak = doTraverse(children, node, depth + 1)
        if (isBeforeBreak) return true
      }
    }
  }
  doTraverse(nodes)
}
