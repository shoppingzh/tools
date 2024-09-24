const { traverse } = require('../lib/tree')

let id = 0

function generateWideNodes() {
  return new Array(100000).fill(null).map(() => ({ id: ++id }))
}

function generateDeepNode() {
  let current = { id: ++id }
  for (let i = 0;i < 3000;i++) {
    current = { id: ++id, children: [current] }
  }
  return current
}

const wideNodes = [
  {
    id: ++id,
    children: generateWideNodes()
  }
]
const deepNodes = [
  generateDeepNode()
]

function runWithTime(callback, label) {
  const start = process.hrtime()
  callback()
  const [second, nano] = process.hrtime(start)
  const time = (second + nano) / 1e6
  console.log(`${label || ''}耗时：${time}ms`)
  return time
}

function run() {

  const t1 = runWithTime(() => traverse(wideNodes, () => {}, 'dfs-pre'), '宽节点列表 - 深度遍历')
  const t2 = runWithTime(() => traverse(wideNodes, () => {}, 'bfs'), '宽节点列表 - 广度遍历')
  const t3 = runWithTime(() => traverse(deepNodes, () => {}, 'dfs-pre'), '深节点列表 - 深度遍历')
  const t4 = runWithTime(() => traverse(deepNodes, () => {}, 'bfs'), '深节点列表 - 广度遍历')

  return [t1, t2, t3, t4]
}

const count = 100
const arr = [0, 0, 0, 0]
for (let i = 0;i < count;i++) {

  const [t1, t2, t3, t4] = run()
  arr[0] += t1
  arr[1] += t2
  arr[2] += t3
  arr[3] += t4
  console.log('=====================================')
}

console.log('平均时长：')
console.log(arr.map(t => t / count))
