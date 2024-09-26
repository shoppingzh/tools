import { getObjectPropValue, PropValueGetter } from '@/_internal'
import { BaseNode, ChildrenKeyType, DEFAULT_CHILDREN_PROP, DefaultChildrenKeyType, MixNodes } from './_base'

interface Props<E extends BaseNode = BaseNode, CK extends ChildrenKeyType = ChildrenKeyType> {
  id?: PropValueGetter<E>
  pid?: PropValueGetter<E>
  children?: CK
}

const DEFAULT_PROPS: Props = {
  id: 'id',
  pid: 'pid',
  children: DEFAULT_CHILDREN_PROP
}


/**
 * 从集合解析树
 * 
 * @param list 集合
 * @param props 属性配置
 * @returns 
 */
export function parseFromList<Source extends BaseNode, CK extends ChildrenKeyType = DefaultChildrenKeyType, Target extends MixNodes<Source, CK> = MixNodes<Source, CK>>(
  list: Source[],
  props?: Props<Source, CK>,
): Target[] {
  const mergedProps: Props<Source> = Object.assign({}, DEFAULT_PROPS, props)
  const map: Record<any, Target> = Object.create(null) // 不直接使用{}，防止原型链上的属性干扰
  const nodes: Target[] = []

  // 先构建一个哈希表，以便速查
  for (const item of list) {
    const id = getObjectPropValue(item, mergedProps.id)
    if (id == null) continue
    map[id as any] = item as unknown as Target
  }

  // 构建树
  for (const item of (list as unknown as Target[])) {
    const pid = getObjectPropValue(item, mergedProps.pid)
    if (pid == null) {
      nodes.push(item)
    } else {
      const parentItem = map[pid as any]
      if (parentItem) {
        let children = parentItem[mergedProps.children as any] as Target[] // FIXME type
        if (!children) {
          (parentItem as any)[mergedProps.children] = (children = []) // FIXME type
        }
        children.push(item)
      } else {
        // FIXME 需不需要警告？
        // console.warn('存在游离节点')
      }
    }
  }

  return nodes
}
