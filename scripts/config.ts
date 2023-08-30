import fs from 'fs'
import path from 'path'

const SRC_ROOT = path.resolve(__dirname, '../src')
const OUT_ROOT = path.resolve(__dirname, '../lib')
const entries = fs.readdirSync(SRC_ROOT, { withFileTypes: true }).filter(o => o.isDirectory()).map(o => o.name)

const input = entries.reduce((map, o) => {
  map[o] = path.resolve(SRC_ROOT, o, 'index.ts')
  return map
}, {} as Record<string, string>)

const env = process.env.NODE_ENV

export default {
  SRC_ROOT,
  OUT_ROOT,
  entries,
  input,
  env,
  isDevEnv: env === 'dev',
  isProdEnv: env === 'prod',
}
