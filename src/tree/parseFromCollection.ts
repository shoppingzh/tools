import { getObjectPropValue } from '@/_internal'
import { merge } from 'lodash'

type KeyOrMapKey<T> = (keyof T) | ((o: T) => unknown)

interface Props<S, R> {
  id?: KeyOrMapKey<S>
  pid?: KeyOrMapKey<S>
  children?: string
}

const DEFAULT_PROPS: Props<any, any> = {
  id: 'id',
  pid: 'pid',
  children: 'children',
}

interface Node {
  children?: Node[]
}

/**
 * 从集合解析树
 * 
 * @param collection 集合
 * @param props 属性配置
 * @returns 
 */
export function parseFromCollection<S extends object, R extends S & Node>(collection: S[], props?: Props<S, R>): R[] {
  const mergedProps: Props<S, R> = merge({}, DEFAULT_PROPS, props)
  const map: Record<any, R> = Object.create(null)
  const nodes: R[] = []

  // 先构建一个哈希表，以便速查
  for (const item of collection) {
    const id = getObjectPropValue(item, mergedProps.id)
    if (id == null) continue
    map[id as any] = item as unknown as R
  }

  // 构建树
  for (const item of (collection as unknown as R[])) {
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
        console.warn('存在游离节点')
      }
    }
  }

  return nodes
}
