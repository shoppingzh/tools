/**
 * 拼接路径
 * 
 * @param paths 路径列表
 * @returns 
 */
export function join(...paths: string[]) {
  const len = paths.length
  let result = ''
  if (!len) return result

  for (let i = 0;i < len;i++) {
    const path = paths[i]
    if (path != null) {
      result += (path + (i < len - 1 ? '/' : ''))
    }
  }
  return result.length ? result.replace(/\/+/g, '/') : result
}
