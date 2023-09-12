/**
 * 设置浏览器当前标题
 * 
 * @param title 标题
 */
export function setTitle(title: string) {
  document.title = title == null ? '' : title
}
