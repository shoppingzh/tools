import path from 'path'
import { InputPluginOption, defineConfig } from 'rollup'
import alias from '@rollup/plugin-alias'
import { babel } from '@rollup/plugin-babel'
import sizes from '@atomico/rollup-plugin-sizes'
import ts from '@rollup/plugin-typescript'
import beep from '@rollup/plugin-beep'
import terser from '@rollup/plugin-terser'
import pkg from '../package.json'
import clear from 'rollup-plugin-clear'
import strip from '@rollup/plugin-strip'
import config from './config'
import { dts } from 'rollup-plugin-dts'

const plugins: InputPluginOption[] = [
  alias({
    entries: {
      '@': config.SRC_ROOT,
    }
  }),
]

export default [
  defineConfig({
    input: config.input,
    output: [{
      dir: config.OUT_ROOT,
      format: 'esm',
    }, {
      dir: config.OUT_ROOT,
      format: 'cjs',
      entryFileNames: '[name].cjs',
    }],
    external: [
      ...Object.keys((pkg as any).peerDependencies || {}),
      /^\@babel\/runtime/,
    ],
    plugins: [
      ...plugins,
      clear({
        targets: [config.OUT_ROOT],
      }),
      ts({
        tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      }),
      config.isProdEnv && babel({
        babelHelpers: 'runtime',
      }),
      // 去除console.log
      config.isProdEnv && strip({
        include: 'src/**/*.{ts,js}'
      }),
      // 生成包大小监控
      sizes(100),
      // 代码混淆
      config.isProdEnv && terser(),
      // 警告声
      beep(),
    ],
  }),
  defineConfig({
    input: config.input,
    output: {
      dir: config.OUT_ROOT,
    },
    plugins: [
      ...plugins,
      dts({
        compilerOptions: {
          preserveSymlinks: false,
        }
      })
    ]
  })
]
