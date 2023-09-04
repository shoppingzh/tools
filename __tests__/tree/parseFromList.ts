import { parseFromList } from '@/tree'

describe('parseFromList', () => {

  function createData() {
    return [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
      { id: 4, pid: 1, name: '1-1' },
      { id: 5, pid: 1, name: '1-2' },
      { id: 6, pid: 4, name: '1-1-1' },
      { id: 7, pid: 5, name: '1-2-1' },
      { id: 8, pid: 3, name: '3-1' },
      { id: 9, pid: 1000, name: 'free' },
      { id: 10, pid: 9, name: 'free-1' },
    ]
  }

  it('base', () => {
    expect(parseFromList(createData())).toEqual([
      {
        id: 1,
        name: '1',
        children: [{
          id: 4,
          pid: 1,
          name: '1-1',
          children: [{
            id: 6,
            pid: 4,
            name: '1-1-1'
          }]
        }, {
          id: 5,
          pid: 1,
          name: '1-2',
          children: [{
            id: 7,
            pid: 5,
            name: '1-2-1'
          }]
        }]
      },
      {
        id: 2,
        name: '2'
      },
      {
        id: 3,
        name: '3',
        children: [{
          id: 8,
          pid: 3,
          name: '3-1'
        }]
      }
    ])
  })

  it('props: custom id', () => {
    expect(parseFromList(createData(), {
      id: o => o.id * o.id,
    })).toEqual([
      {
        id: 1,
        name: '1',
        children: [{
          id: 4,
          pid: 1,
          name: '1-1',
        }, {
          id: 5,
          pid: 1,
          name: '1-2',
        }]
      },
      {
        id: 2,
        name: '2',
        children: [{
          id: 6,
          pid: 4,
          name: '1-1-1'
        }]
      },
      {
        id: 3,
        name: '3',
        children: [{
          id: 10,
          pid: 9,
          name: 'free-1'
        }]
      }
    ])
  })

  it('props: custom pid', () => {
    expect(parseFromList(createData(), {
      pid: () => undefined
    }).map(o => o.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('list is null', () => {
    expect(() => parseFromList(null)).toThrow()
  })

})
