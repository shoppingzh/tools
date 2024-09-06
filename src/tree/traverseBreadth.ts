import { DEFAULT_CHILDREN_PROP, TraverseCallback } from './_base'

/**
 * 广度遍历
 * 
 * @param nodes 节点列表
 * @param callback 回调
 * @param childrenProp 子节点列表属性
 */
export function traverseBreadth<E>(nodes: E[], callback: TraverseCallback<E>, childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E) {
  const queue: E[] = [...nodes]
  const parentMap = new Map<E, E>()
  const depthMap = new Map<E, number>()
  while (queue.length) {
    const node = queue.shift()
    const parentNode = parentMap.get(node)
    const depth = depthMap.get(node) ?? 0

    const isBreak = callback(node, parentNode, depth)
    if (isBreak === true) return

    const children = node[childrenProp] as E[]
    if (children) {
      for (const child of children) {
        parentMap.set(child, node)
        depthMap.set(child, depth + 1)
        queue.push(child)
      }
    }
  }
}
