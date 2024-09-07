import { DEFAULT_CHILDREN_PROP, NodePredicate } from './_base'

/**
 * 寻找指定节点
 * 
 * @param nodes 
 * @param predicate 
 * @param childrenProp 
 */
export function find<E>(nodes: E[], predicate: NodePredicate<E>, childrenProp: keyof E = DEFAULT_CHILDREN_PROP as keyof E) {

}
