import { merge } from 'lodash'

/**
 * 为元素设置CSS样式
 * @param el 元素
 * @param style 样式列表
 */
export function setStyle(el: HTMLElement, style: Partial<CSSStyleDeclaration>) {
  merge(el.style, style)
}
