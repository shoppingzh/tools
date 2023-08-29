const objectProto = Object.prototype

/**
 * 获取
 * @param value 
 * @returns 
 */
export function getObjectType(value: any) {
  return objectProto.toString.call(value)
}
