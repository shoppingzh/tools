export interface CreateWatermarkOptions {
  // 字
  fontFamily?: string
  textColor?: string
  textSize?: number
  fontBold?: number
  rotate?: number
  // 背景
  bgColor?: string
  // 其他
  gap?: number
}

export function createWatermark(options: CreateWatermarkOptions) {
  // TODO
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')


}
