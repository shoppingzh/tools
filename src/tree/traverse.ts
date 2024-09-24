import { BaseNode, checkNodes, DEFAULT_CHILDREN_PROP, TraverseCallback, TraverseStrategy } from './_base'

type DeepTraverseStrategy = 'pre' | 'post'

/**
 * 深度遍历(先序)
 * 
 * @param nodes 节点列表
 * @param callback 回调
 * @param strategy
 * @param childrenProp 子节点列表属性
 */
function traverseDeep<E extends BaseNode>(
  nodes: E[],
  callback: TraverseCallback<E>,
  strategy: DeepTraverseStrategy = 'pre',
  childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E
) {
  checkNodes(nodes)
  if (strategy !== 'pre' && strategy !== 'post') {
    throw new Error('Unkonwn strategy')
  }

  const doTraverse = (nodes: E[], parent?: E, depth: number = 0) => {
    for (let i = 0;i < nodes.length;i++) {
      const node = nodes[i]

      if (strategy === 'pre') {
        const isBreak = callback(node, parent, depth)
        if (isBreak === true) return true
      }

      const children = node[childrenProp] as E[]
      if (children && children.length) {
        const isBeforeBreak = doTraverse(children, node, depth + 1)
        if (isBeforeBreak) return true
      }

      if (strategy === 'post') {
        const isBreak = callback(node, parent, depth)
        if (isBreak === true) return true
      }
    }
  }
  doTraverse(nodes)
}

interface NodeExtraInfo<E> {
  depth: number
  parent: E
}

/**
 * 广度遍历
 * 
 * @param nodes 节点列表
 * @param callback 回调
 * @param childrenProp 子节点列表属性
 */
function traverseBreadth<E extends BaseNode>(
  nodes: E[],
  callback: TraverseCallback<E>,
  childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E
) {
  checkNodes(nodes)

  const queue: E[] = [...nodes]
  let index = 0 // 通过游标节约性能，因为Array.prototype.shift是一个O(n)操作
  const extraInfoMap = new Map<E, NodeExtraInfo<E>>()
  while (index < queue.length) {
    const node = queue[index++]
    const extraInfo = extraInfoMap.get(node)
    const depth = extraInfo?.depth ?? 0

    const isBreak = callback(node, extraInfo?.parent, depth)
    if (isBreak === true) return

    const children = node[childrenProp] as E[]
    if (children) {
      for (const child of children) {
        extraInfoMap.set(child, { parent: node, depth: depth + 1 })
        queue.push(child)
      }
    }
  }
}


/**
 * 遍历(默认采用深度优先先序遍历算法)
 * 
 * @param nodes 节点列表
 * @param callback 回调(可通过返回true中断遍历)
 * @param strategy 遍历策略(默认dfs-pre)，可选：dfs-pre深度优先先序遍历 dfs-post深度优先后序遍历 bfs广度优先遍历
 * @param childrenProp 子节点列表所在字段名
 */
export function traverse<T extends BaseNode>(
  nodes: T[],
  callback: TraverseCallback<T>,
  strategy: TraverseStrategy = 'dfs-pre',
  childrenProp: keyof T = DEFAULT_CHILDREN_PROP as keyof T,
): void {
  if (strategy === 'dfs-pre') {
    traverseDeep(nodes, callback, 'pre', childrenProp)
  } else if (strategy === 'dfs-post') {
    traverseDeep(nodes, callback, 'post', childrenProp)
  } else if (strategy === 'bfs') {
    traverseBreadth(nodes, callback, childrenProp)
  } else {
    throw new Error('Unkonwn strategy')
  }
}
