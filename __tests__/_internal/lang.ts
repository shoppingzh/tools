import { getObjectType } from '@/_internal'

describe('getObjectType', () => {

  it('base', () => {
    expect(getObjectType({})).toBe('[object Object]')
  })

})
