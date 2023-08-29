const objectProto = Object.prototype

function getObjectTag(value: any): string {
  return objectProto.toString.call(value)
}

/**
 * 获取对象类型
 * @param value 
 * @returns 
 */
export function getObjectType(value: any) {
  const tag = getObjectTag(value)
  return tag.substring(8, tag.length - 1)
}
