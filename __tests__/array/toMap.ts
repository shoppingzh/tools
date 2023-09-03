import { toMap } from '@/array'

describe('toMap', () => {

  const arr = [{
    id: 1,
    name: '张三'
  }, {
    id: 2,
    name: '李四'
  }, {
    id: 3,
    name: '王五'
  }]

  it('string key', () => {
    expect(toMap(arr, 'id')).toEqual({
      1: { id: 1, name: '张三' },
      2: { id: 2, name: '李四' },
      3: { id: 3, name: '王五' }
    })
  })

  it('function key', () => {
    expect(toMap(arr, o => o.id)).toEqual({
      1: { id: 1, name: '张三' },
      2: { id: 2, name: '李四' },
      3: { id: 3, name: '王五' }
    })
  })

  it('array is null', () => {
    expect(() => toMap(null, 'id')).toThrow()
    expect(() => toMap(undefined, 'id')).toThrow()
  })

  it('empty array', () => {
    expect(toMap([], 'id')).toEqual({})
  })

  it('object prototype keys', () => {
    const map = toMap(arr, 'id')
    Object.getOwnPropertyNames(Object.prototype).forEach(key => {
      expect(map[key]).toBeUndefined()
    })
  })

})
