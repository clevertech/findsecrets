# findsecrets

Looks for secrets in your code. Ignores `.env` files. The idea is preventing pushing secrets to a repository, so it is useful to invoke it in a `precommit` hook. You can use it in combination with `lint-staged` and `husky` for example so all (and only) modified files in a commit get analyzed.

Example secret:

```javascript
const FACEBOOK_API_SECRET = 'ZVyyCKt7i2JMtlaJgnYExjRyBlI1KOHbxiDcseWQ9at5uHFvQl'
```

Running manually:

```
findsecrets /path/to/code.js
```

Output:

```
Found secrets in /path/to/code.js
    at line 1 ZVyyCKt7i2JMtlaJgnYExjRyBl...
```

## Installing

Install locally. Perfect for using it in combination with `lint-staged` and `husky` or any npm script.

```
npm install @clevertech.biz/findsecrets
```

Optionally install it globally

```
npm install @clevertech.biz/findsecrets -g
```

## Usage

```
findsecrets /path/to/code.js
```

## Skipping lines or files

Sometimes you'll get false positives. You can ignore a line like this:

```javascript
const falsePositive = 'yLjaLLAnycACDX3aAeA8Vnac' // findsecrets-ignore-line
```

You can also ignore a whole file by putting a comment containing `findsecrets-ignore-file` in the first line.

