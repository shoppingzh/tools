import { setStyle } from './setStyle'

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
