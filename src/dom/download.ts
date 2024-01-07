import { setStyle } from './base'

/**
 * 下载
 * 
 * @param url 下载链接
 * @param filename 文件名
 */
export function download(url: string, filename?: string, newWindow = true) {
  const el = document.createElement('a')
  setStyle(el, {
    display: 'none',
    position: 'absolute',
  })
  el.href = url

  if (filename) {
    el.download = filename
  } else {
    const parts = url.split('/')
    const filenamePart = parts[parts.length - 1]
    el.download = filenamePart.split('?')[0]
  }
  if (newWindow) {
    el.target = '_blank'
  }
  el.addEventListener('click', () => {
    document.body.removeChild(el)
  })

  document.body.appendChild(el)
  el.click()
}

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

/**
 * 静默下载(通过iframe)
 * 
 * @param url 下载链接
 */
export function downloadSilent(url: string): void {
  const el = document.createElement('iframe')
  setStyle(el, { display: 'none' })
  el.src = url
  el.onload = () => {
    document.body.removeChild(el)
  }
  document.body.appendChild(el)
}
