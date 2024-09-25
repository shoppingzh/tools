import { getObjectPropValue, PropValueGetter } from '@/_internal'
import { DEFAULT_CHILDREN_PROP, TraverseStrategy } from './_base'
import { traverse } from './traverse'

/**
 * 将树平铺为一个对象
 * 
 * 当你需要快速查找树节点时，提前将树平铺为对象，可以更快地方便查找
 * 
 * @param nodes  节点列表
 * @param prop 使用哪个属性作为键
 * @param traverseStrategy 遍历算法(默认dfs-pre)
 * @param childrenProp 子节点列表属性
 * @returns 
 */
export function flatToMap<E>(
  nodes: E[],
  prop: PropValueGetter<E>,
  traverseStrategy: TraverseStrategy = 'dfs-pre',
  childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E
): Record<string, E> {
  const map = Object.create(null)
  traverse(nodes, node => {
    const id = getObjectPropValue(node, prop)
    map[id] = node
  }, traverseStrategy, childrenProp)
  return map
}
