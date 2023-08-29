import fs from 'fs'
import path from 'path'

const SRC_ROOT = path.resolve(__dirname, '../src')
const entries = fs.readdirSync(SRC_ROOT, { withFileTypes: true }).filter(o => o.isDirectory()).map(o => o.name)

const input = entries.reduce((map, o) => {
  map[o] = path.resolve(SRC_ROOT, o, 'index.ts')
  return map
}, {} as Record<string, string>)

export default {
  SRC_ROOT,
  entries,
  input,
}
