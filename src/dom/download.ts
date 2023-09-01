import { merge } from 'lodash'
import { setStyle } from '.'

export interface DownloadOptions {
  filename?: string
}

export function download(url: string, options?: DownloadOptions) {
  const opts = merge({}, options)
  const el = document.createElement('a')
  setStyle(el, {
    display: 'none'
  })
  el.href = url
  if (opts.filename) {
    el.download = ''
  }
  el.addEventListener('click', () => {
    document.body.removeChild(el)
  })

  document.body.appendChild(el)
  el.click()
}
