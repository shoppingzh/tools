import { download } from './download'

/**
 * 下载Blob
 * 
 * @param blob Blob对象
 * @param filename 文件名
 */
export function downloadBlob(blob: Blob, filename?: string) {
  if (!blob) throw new Error('blob is empty!')
  const url = URL.createObjectURL(blob)
  download(url, filename, false)
  URL.revokeObjectURL(url)
}
