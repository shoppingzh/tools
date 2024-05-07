import { ArrayItem } from '@/_internal'
import { merge } from 'lodash'

/**
 * 展开数组(与fold镜像)
 * 
 * @example
 * 源数组：
 * [
 *  { groupId: 1, children: [ { id: 1 }, { id: 2 }, { id: 3 } ] },
 *  { groupId: 2, children: [ { id: 1 }, { id: 2 } ] },
 * ]
 * 按照children字段进行展开，得到：
 * [
 *  { groupId: 1, id: 1 },
 *  { groupId: 1, id: 2 },
 *  { groupId: 1, id: 3 },
 *  { groupId: 2, id: 1 },
 *  { groupId: 2, id: 2 },
 * ]
 * 
 * @param source 源数组
 * @param foldKey 要展开的折叠数组字段名
 * @param unfoldItemKeysOrMap 折叠对象映射
 * @returns 
 */
export function unfold<
  Source extends object,
  FoldKey extends keyof Source,
  FoldItem extends ArrayItem<Source[FoldKey]>,
  UnfoldItemKey extends keyof FoldItem = never,
  UnfoldItem = Pick<FoldItem, UnfoldItemKey>,
  Target = Omit<Source, FoldKey> & UnfoldItem
>(
  source: Source[],
  foldKey: FoldKey,
  unfoldItemKeysOrMap: UnfoldItemKey[] | ((item: FoldItem) => UnfoldItem)
): Target[] {
  if (!foldKey) throw new Error('foldKey为空')
  if (!source || !Array.isArray(source) || !source.length) return []

  return source.reduce((all, o) => {
    const foldItemList = o[foldKey]
    if (!Array.isArray(foldItemList)) return all

    foldItemList.forEach(foldItem => {
      let unfoldItem: UnfoldItem = {} as any // FIXME type
      if (Array.isArray(unfoldItemKeysOrMap)) {
        unfoldItemKeysOrMap.forEach(key => {
          (unfoldItem as any)[key] = foldItem[key] // FIXME type
        })
      } else if (typeof unfoldItemKeysOrMap === 'function') {
        unfoldItem = unfoldItemKeysOrMap(foldItem)
      }

      const item = merge({}, o, unfoldItem)
      delete item[foldKey] // 注意：删掉原对象折叠对象列表

      all.push(item)
    })

    return all
  }, [])
}
