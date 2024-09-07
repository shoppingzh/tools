import { getObjectPropValue, PropValueGetter } from '@/_internal'
import { traverseBreadth } from './traverseBreadth'
import { DEFAULT_CHILDREN_PROP } from './_base'

/**
 * 将树平铺为一个对象
 * 
 * 当你需要快速查找树节点时，提前将树平铺为对象，可以更快地方便查找
 * 
 * @param nodes 
 * @param prop 
 * @param childrenProp 
 * @returns 
 */
export function flatToMap<E>(
  nodes: E[],
  prop: PropValueGetter<E>,
  childrenProp:keyof E = DEFAULT_CHILDREN_PROP as keyof E
): Record<string, E> {
  const map = Object.create(null)
  traverseBreadth(nodes, node => {
    const id = getObjectPropValue(node, prop)
    map[id] = node
  }, childrenProp)
  return map
}
