import { getObjectPropValue, PropValueGetter } from '@/_internal'

interface Props<E extends object = Record<string, any>> {
  id?: PropValueGetter<E>
  pid?: PropValueGetter<E>
}

const DEFAULT_PROPS: Props = {
  id: 'id',
  pid: 'pid',
}

interface Node {
  children?: Node[]
}

/**
 * 从集合解析树
 * 
 * @param list 集合
 * @param props 属性配置
 * @returns 
 */
export function parseFromList<Source extends object, Target extends Source & Node = Source & Node>(
  list: Source[],
  props?: Props<Source>,
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
        let children = parentItem.children
        if (!children) {
          parentItem.children = (children = [])
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
