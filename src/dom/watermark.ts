import { getObjectType } from '@/_internal'
import { merge } from 'lodash'

interface WatermarkCoreOptions {
  // 文字
  fontFamily?: string
  textColor?: string
  textSize?: number
  fontBold?: boolean
  fontItalic?: boolean
  rotate?: number
  // 背景
  bgColor?: string
  // 其他
  padding?: [number, number]
}

interface TextRect {
  left?: number
  top?: number
  width?: number
  height?: number
}

/**
 * 为元素设置CSS样式
 * @param el 元素
 * @param style 样式列表
 */
function setStyle(el: HTMLElement, style: Partial<CSSStyleDeclaration>) {
  merge(el.style, style)
}

function getTextRect(ctx: CanvasRenderingContext2D, font: string, text: string): TextRect {
  ctx.save()
  ctx.font = font
  const tm = ctx.measureText(text)
  ctx.restore()
  return {
    left: tm.actualBoundingBoxLeft,
    top: tm.actualBoundingBoxAscent,
    width: tm.actualBoundingBoxLeft + tm.actualBoundingBoxRight,
    height: tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent,
  }
}

interface RenderWatermarkOptions extends WatermarkCoreOptions {
  canvas?: HTMLCanvasElement
}

/**
 * 渲染水印
 * @param text 文字
 * @param options 配置
 * @returns 
 */
function renderWatermark(text: string, options: RenderWatermarkOptions) {
  const opts = options || {}
  const canvas = opts.canvas || document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const font = `${opts.fontBold ? 'bold' : ''} ${opts.fontItalic ? 'italic' : ''} ${opts.textSize}px ${opts.fontFamily}`

  // 1. 确定文字绘制边界
  const textRect = getTextRect(ctx, font, text)

  // 2. 根据文字边界与间距确定画布大小
  canvas.width = textRect.width + (Math.abs(opts.padding[0]) * 2)
  canvas.height = textRect.height + (Math.abs(opts.padding[1]) * 2)

  // 3. 绘制背景
  if (opts.bgColor) {
    ctx.save()
    ctx.fillStyle = opts.bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
  }

  // TODO 删 绘制边界 调试用
  // ctx.save()
  // ctx.strokeStyle = 'green'
  // ctx.lineWidth = 2
  // ctx.strokeRect(0, 0, canvas.width, canvas.height)
  // ctx.restore()

  // 4. 移动、旋转画布
  ctx.translate(canvas.width / 2, canvas.height / 2)
  if (opts.rotate != null && opts.rotate !== 0) {
    ctx.rotate(Math.PI * opts.rotate / 180)
  }

  // 5. 绘制文本
  ctx.font = font
  ctx.fillStyle = `${opts.textColor}`
  const left = (0 - textRect.width) / 2
  const top = (0 - textRect.height) / 2
  ctx.fillText(text, left + textRect.left, top + textRect.top)

  return canvas
}

export interface CreateWatermarkOptions extends WatermarkCoreOptions {
  zIndex?: number
}

const DEFAULT_CREATE_WATERMARK_OPTIONS: CreateWatermarkOptions = {
  fontFamily: '微软雅黑',
  textColor: 'rgba(100, 100, 100, .15)',
  textSize: 16,
  fontBold: false,
  fontItalic: false,
  rotate: -10,
  bgColor: 'rgba(0, 0, 0, 0)',
  padding: [30, 50],
  zIndex: 99999999,
}

/**
 * 在指定的DOM元素上创建水印
 * 当元素为普通元素时，会将水印作为背景图与渲染；当元素为canvas时，会将水印内容渲染在当前canvas上
 * @param el 元素，可以是普通元素，也可以是canvas 
 * @param text 水印文字
 * @param options 配置项
 */
export function createWatermark(el: HTMLCanvasElement, text: string, options: CreateWatermarkOptions): void;
export function createWatermark(el: HTMLElement, text: string, options: CreateWatermarkOptions): void;
export function createWatermark(el: HTMLElement | HTMLCanvasElement, text: string, options: CreateWatermarkOptions) {
  const opts = merge({}, DEFAULT_CREATE_WATERMARK_OPTIONS, options)
  const watermarkCanvas = renderWatermark(text, opts)

  const type = getObjectType(el)
  if (type === 'HTMLCanvasElement') {
    const canvas = el as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = ctx.createPattern(watermarkCanvas, 'repeat')
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  } else {
    const dataUrl = watermarkCanvas.toDataURL('image/png')
    setStyle(el, {
      backgroundImage: `url(${dataUrl})`,
      backgroundRepeat: 'repeat',
      zIndex: String(opts.zIndex),
    })
  }
}
