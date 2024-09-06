
export type TraverseCallback<T> = (node: T, parent: T, depth: number) => boolean | void
export const DEFAULT_CHILDREN_PROP = 'children'
