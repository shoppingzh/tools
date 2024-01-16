import fs from 'fs'
import path from 'path'
import env from './env'

const SRC_ROOT = path.resolve(__dirname, '../src')
const OUT_ROOT = path.resolve(__dirname, '../lib')
const entries = fs.readdirSync(SRC_ROOT, { withFileTypes: true }).filter(o => o.isDirectory()).map(o => o.name)

const input = entries.reduce((map, o) => {
  map[o] = path.resolve(SRC_ROOT, o, 'index.ts')
  return map
}, {} as Record<string, string>)


export default {
  SRC_ROOT,
  OUT_ROOT,
  entries,
  input,
  env,
  isDevEnv: env.NODE_ENV === 'dev',
  isProdEnv: env.NODE_ENV === 'prod',
  useBabel: false, // 是否使用babel转译
}
