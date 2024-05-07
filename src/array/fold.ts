import { PropValueGetter, getObjectPropValue } from '@/_internal'
import { cloneDeep, isNil } from 'lodash'

/**
 * 折叠数组(与unfold镜像)
 * 
 * @example
 * 源数组：
 * [
 *  { groupId: 1, id: 1 },
 *  { groupId: 1, id: 2 },
 *  { groupId: 1, id: 3 },
 *  { groupId: 2, id: 1 },
 *  { groupId: 2, id: 2 },
 * ]
 * 
 * 如果按照groupId进行折叠，折叠后的数组长度将为2，这个数组的每个元素称为组对象：
 * [
 *  { groupId: 1 },
 *  { groupId: 2 },
 * ]
 * 
 * 如果将同组内的对象折叠到children字段，则最后的列表变为：
 * [
 *  { groupId: 1, children: [ { id: 1 }, { id: 2 }, { id: 3 } ] },
 *  { groupId: 2, children: [ { id: 1 }, { id: 2 } ] },
 * ]
 * children数组中的每个元素称为折叠对象
 * 
 * @param source 源数组
 * @param foldBy 相同的foldBy将会被折叠到同一个组
 * @param foldKey 折叠对象数组挂在组对象上的键名
 * @param foldItemKeysOrMap 折叠对象的映射
 * @returns 
 */
export function fold<
  Source extends object,
  FoldKey extends string | symbol,
  FoldItemKey extends keyof Source = never,
  FoldItem = Pick<Source, FoldItemKey>,
  Target extends object = Source & { [key in FoldKey]: FoldItem[] }
>(
  source: Source[],
  foldBy: PropValueGetter<Source>,
  foldKey: FoldKey,
  foldItemKeysOrMap?: FoldItemKey[] | ((item: Source) => FoldItem)
): Target[] {
  if (!foldBy) throw new Error('foldBy为空')
  if (!foldKey) throw new Error('foldKey为空')
  if (!source || !Array.isArray(source) || !source.length) return []

  const groups = source.reduce((groups, o) => {
    // 获取组对象
    const groupKey = getObjectPropValue(o, foldBy)
    if (isNil(groupKey)) return groups
    let group = groups[groupKey]
    if (!group) {
      group = cloneDeep(o) as unknown as Target // FIXME type
      groups[groupKey] = group
    }
    let foldList: FoldItem[] = (group as any)[foldKey]
    if (!foldList) {
      (group as any)[foldKey] = (foldList = []) // FIXME type
    }

    // 折叠对象映射并加入组对象折叠列表
    let foldItem: FoldItem = {} as any
    if (Array.isArray(foldItemKeysOrMap)) {
      foldItemKeysOrMap.forEach(foldItemKey => {
        (foldItem as any)[foldItemKey] = o[foldItemKey] // FIXME type
      })
    } else if (typeof foldItemKeysOrMap === 'function') {
      foldItem = foldItemKeysOrMap(o)
    }
    foldList.push(foldItem)

    return groups
  }, Object.create(null) as Record<string, Target>)

  return Object.values(groups)
}
