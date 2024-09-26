
const { random } = require('lodash')
const { parseFilename } = require('../lib/path')

function randomChar() {
  return String.fromCharCode('A'.charCodeAt(0) + random(0, 32, false))
}

function randomFilename() {
  const basename = new Array(random(5, 80)).fill(null).map(() => randomChar()).join('')
  const extname = new Array(random(0, 20)).fill(null).map(() => randomChar()).join('')
  return basename + (extname ? `.${extname}` : '')
}

function test() {
  const filenames = new Array(100000).fill(null).map(() => randomFilename())

  console.time('parseFilename')
  filenames.forEach(filename => parseFilename(filename))
  console.timeEnd('parseFilename')
}

new Array(10).fill(null).forEach(test)
