import { getObjectType } from '@/_internal'

describe('getObjectType', () => {

  it('null', () => {
    expect(getObjectType(null)).toBe('Null')
  })

  it('undefined', () => {
    expect(getObjectType(undefined)).toBe('Undefined')
  })

  it('number', () => {
    expect(getObjectType(1)).toBe('Number')
  })

  it('boolean', () => {
    expect(getObjectType(true)).toBe('Boolean')
  })

  it('string', () => {
    expect(getObjectType('')).toBe('String')
  })

  it('symbol', () => {
    expect(getObjectType(Symbol.iterator)).toBe('Symbol')
  })

  it('object', () => {
    expect(getObjectType({})).toBe('Object')
  })

  it('array', () => {
    expect([
      getObjectType([]),
      getObjectType(new Array(10))
    ].every(o => o === 'Array')).toBeTruthy()
  })

  it('date', () => {
    expect(getObjectType(new Date())).toBe('Date')
  })

  it('function', () => {
    expect([
      getObjectType(() => {
        // 
      }),
      getObjectType(async() => {
        // 
      }),
      getObjectType(function() {
        // 
      })
    ].every(o => o === 'Function')).toBeTruthy()
  })

  it('regExp', () => {
    expect([
      getObjectType(/\s/),
      getObjectType(new RegExp('\\s'))
    ].every(o => o === 'RegExp')).toBeTruthy()
  })

})
