import { PropValueGetter } from '@/_internal'

export function fold<
  Source extends object,
  FoldKey extends string | symbol,
  FoldItemKey extends keyof Source = never,
  FoldItem extends object = Pick<Source, FoldItemKey>,
  Target = Source & { [key in FoldKey]:FoldItem[] }
>(
  arr: Source[],
  foldBy: PropValueGetter<Source>,
  foldKey: FoldKey,
  foldItemKeysOrCallback: FoldItemKey[] | ((item: Source) => FoldItem)
): Target[] {
  // 
  return
}


export function unfold<T>(arr: T[]) {
  // 
}

// interface SourceItem {
//   groupId: number
//   groupName: string
//   id: number
//   value: any
// }

// const source: SourceItem[] = [
//   { groupId: 1, groupName: '第一组', id: 1, value: 1, },
//   { groupId: 1, groupName: '第一组', id: 2, value: 2, },
//   { groupId: 1, groupName: '第一组', id: 3, value: 3, },
// ]


// const target = fold(source, 'groupId', 'subItems', o => ({ subId: o.id, subValue: o.value, }))
// // const target = fold(source, 'groupId', 'subItems', ['id', 'value'])

// target.forEach(o => {
//   const items = o.subItems
//   items.forEach(sub => {

//   })
// })
