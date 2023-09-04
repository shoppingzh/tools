import { setStyle } from '.'

export interface DownloadOptions {
  filename?: string
}

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
