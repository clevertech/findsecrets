#!/usr/bin/env node
const path = require('path')
const fs = require('fs')

const simpleEntropy = (str) => {
  const set = {}

  str.split('').forEach(
    c => (set[c] ? set[c]++ : (set[c] = 1))
  )

  return Object.keys(set).reduce((acc, c) => {
    const p = set[c] / str.length;
    return acc - (p * (Math.log(p) / Math.log(2)))
  }, 0)
}

const file = process.argv[2]
if (!file) {
  console.error('You need to provide a file as an argument')
  process.exit(1)
}

const fullpath = path.isAbsolute(file) ? file : path.join(process.cwd(), file)
try {
  const source = fs.readFileSync(fullpath, 'utf8')
  const lines = source.split('\n')
  const error = lines.reduce((acc, line, lineNumber) => {
    const words = line.split(/\W+/)
    const err = words.reduce((acc, word) => {
      const entropy = simpleEntropy(word)
      if (entropy > 4) {
        console.log(`Found secret at line ${lineNumber + 1}`, word)
        return true
      }
      return acc
    }, false)
    return acc || err
  }, false)
  if (error) {
    process.exit(1)
  }
} catch (err) {
  console.error('Error', err.stack || err.message || String(err))
  process.exit(1)
}
