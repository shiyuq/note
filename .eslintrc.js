module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "semistandard",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      1,
      "single"
    ],
    "semi": "error",
    "no-console": 1,
    "space-before-function-paren": 0,
    "no-multiple-empty-lines": [
      "off"
    ]
  }
}
