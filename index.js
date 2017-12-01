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
  const errors = lines.reduce((errors, line, lineNumber) => {
    const words = line.split(/\W+/)
    words.forEach(word => {
      const entropy = simpleEntropy(word)
      if (entropy > 4) {
        errors.push(`    at line ${lineNumber + 1} ${word.substring(0, word.length / 2 + 1)}...`)
      }
    }, false)
    return errors
  }, [])
  if (errors.length > 0) {
    console.error('Found secrets in', fullpath)
    errors.forEach(error => console.error(error))
    process.exit(1)
  }
} catch (err) {
  console.error('Error', err.stack || err.message || String(err))
  process.exit(1)
}
