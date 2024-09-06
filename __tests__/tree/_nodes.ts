interface TreeNode {
  id?: number
  name?: string
  children?: TreeNode
}

let id = 1

export default [
  {
    id: id++,
    name: '1',
    children: [
      {
        id: id++,
        name: '1-1',
        children: [
          {
            id: id++,
            name: '1-1-1',
          },
          {
            id: id++,
            name: '1-1-2',
          },
        ],
      },
      {
        id: id++,
        name: '1-2',
        children: [
          {
            id: id++,
            name: '1-2-1',
          },
          {
            id: id++,
            name: '1-2-2',
            children: [
              {
                id: id++,
                name: '1-2-2-1',
              },
              {
                id: id++,
                name: '1-2-2-2',
                children: [
                  {
                    id: id++,
                    name: '1-2-2-2-1',
                  },
                  {
                    id: id++,
                    name: '1-2-2-2-2',
                  },
                ],
              },
            ]
          },
        ],
      }
    ]
  },
  {
    id: id++,
    name: '2',
    children: [
      {
        id: id++,
        name: '2-1',
      },
      {
        id: id++,
        name: '2-2',
      },
    ],
  },
  {
    id: id++,
    name: '3',
  },
] as TreeNode[]
