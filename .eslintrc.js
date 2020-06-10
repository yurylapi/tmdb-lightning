module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['prettier'],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    quotes: [2, 'single', 'avoid-escape'],
    'no-extra-boolean-cast': 'off',
    'no-unused-vars': [
      1,
      {
        'ignoreSiblings': true,
        'argsIgnorePattern': 'res|next|^err'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: false,
        singleQuote: true,
        tabWidth: 2,
        semi: true,
        printWidth: 120,
        endOfLine: "auto"
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
