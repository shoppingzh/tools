/**
 * 复制文本
 * 
 * @param text 
 * @returns 
 */
export function copyText(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

/**
 * 获取复制的文本
 * 
 * @returns 
 */
export function getCopiedText(): Promise<string> {
  return navigator.clipboard.readText()
}
