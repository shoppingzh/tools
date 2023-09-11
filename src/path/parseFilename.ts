interface ParseResult {
  basename: string
  extname: string
}

const SEPERATOR = '.'

// 经过性能测试，第一个实现方案性能更好
// FIXME 为什么？理论上，第二个方案循环次数更少，说明String.prototype.substring性能真的很好！

/**
 * 解析文件名
 * 
 * @param filename 文件名
 * @param withSeperator 后缀名是否以分隔符(.)开头
 * @returns 
 */
export function parseFilename(filename: string, withSeperator?: boolean): ParseResult {
  const len = filename.length

  // 关键要点：从后向前扫描
  let lastSeperatorIndex = -1
  let index = len - 1
  while (index-- >= 0) {
    if (filename.charAt(index) === SEPERATOR) {
      lastSeperatorIndex = index
      break
    }
  }

  // 如果点出现在两侧，则认为没有后缀名
  if (lastSeperatorIndex === 0 || lastSeperatorIndex === len - 1) {
    lastSeperatorIndex = -1
  }

  return {
    basename: lastSeperatorIndex >= 0 ? filename.substring(0, lastSeperatorIndex) : filename,
    extname: lastSeperatorIndex >= 0 ? filename.substring(withSeperator ? lastSeperatorIndex : lastSeperatorIndex + 1, len) : null,
  }
}
// export function parseFilename(filename: string, withSeperator?: boolean): ParseResult {
//   const len = filename.length

//   let basename: string = null
//   let extname: string = null
//   // 关键要点，扫描一次文件名
//   for (let i = 0;i < len;i++) {
//     const c = filename.charAt(i)
//     const isSeperator = c === SEPERATOR

//     if (isSeperator) {
//       if (basename == null) basename = ''
//       basename += (extname || '')
//       extname = null
//     }

//     const isBasenameTurn = !basename || (extname == null && (!isSeperator || i >= len - 1))
//     if (isBasenameTurn) {
//       if (basename == null) basename = ''
//       basename += c
//     } else {
//       if (extname == null) extname = ''
//       extname += c
//     }
//   }

//   if (extname && !withSeperator) {
//     extname = extname.substring(1)
//   }

//   return {
//     basename: basename || null,
//     extname: extname || null,
//   }
// }
