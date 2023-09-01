import { format } from '@/number'

describe('format', () => {

  it('base', () => {
    type Pair = [number, string]
    const pairs: Pair[] = [
      [0, '0.00'],
      [1, '1.00'],
      [1.234, '1.23'],
      [123.456, '123.46'],
      [1234.567, '1,234.57'],
    ]
    expect(pairs.every(o => format(o[0], true, 2) === o[1])).toBeTruthy()
  })

  it('not use thousandth', () => {
    expect(format(12345.6789, false, 2)).toBe('12345.68')
    expect(format(12345.6789, null, 2)).toBe('12345.68')
    expect(format(12345.6789, undefined, 2)).toBe('12345.68')
  })

  it('not use fraction', () => {
    expect(format(1234.56789)).toBe('1234.56789')
  })

  it('value is null', () => {
    expect(format(null, true, 2)).toBeNull()
  })

  it('value is NaN', () => {
    expect(format(NaN, true, 2)).toBe('NaN')
  })

  // FIXME 这种是否合理？
  it('value is Infinity', () => {
    expect(format(Infinity, true, 2)).toBe('∞')
    expect(format(-Infinity, true, 2)).toBe('-∞')
  })

  it('value is not number', () => {
    expect(format('1234.567' as any, true, 2)).toBe('1,234.57')
    expect(format({} as any)).toBe('NaN')
  })

})
