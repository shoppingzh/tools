type Callback<T> = (node: T, depth: number, parentNode: T, siblingsNodes: T[]) => void

export function iterate<T>(nodes: T[], callback: Callback<T>): void {
  // 
}
