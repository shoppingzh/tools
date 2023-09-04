/**
 * 加载图片
 * 
 * @param url 图片URL
 * @returns 
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-promise-executor-return
    if (!url) return reject('url is empty')
    let loaded = false
    const img = new Image()
    function onload() {
      if (loaded) return
      loaded = true
      resolve(img)
    }

    img.onload = onload
    img.onerror = () => {
      reject()
    }
    img.src = url
    if (img.complete) {
      onload()
    }
  })
}
