module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es2017: true,
    jest: true,
    jquery: true,
    serviceworker: true,
    webextensions: true,
    worker: true
  },
  plugins: [
    'jest',
    'import',
    'node',
    'prettier',
    'promise',
    'security',
    'standard',
    'vue',
    // "vue-a11y",
    'fp',
    '@getify/proper-arrows',
    'unicorn'
  ],
  extends: [
    'plugin:jest/recommended',
    'plugin:security/recommended',
    // "plugin:vue-a11y/base"
    '@vue/prettier',
    'plugin:vue/recommended',
    'plugin:you-dont-need-lodash-underscore/compatible'
  ],
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2017,
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'callback-return': ['error'],
    'handle-callback-err': ['error'],
    indent: ['off'],
    'key-spacing': ['off'],
    'linebreak-style': ['warn', 'unix'],
    'no-eval': ['error'],
    'no-mixed-requires': ['error'],
    'no-script-url': ['error'],
    'no-undef': ['off'],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: 'i|res|next|^err'
      }
    ],
    'no-useless-escape': ['off'],
    quotes: ['warn', 'single'],
    'require-jsdoc': [
      'off',
      {
        ArrowFunctionExpression: [true],
        ClassDeclaration: [true],
        FunctionDeclaration: [true],
        FunctionExpression: [true],
        MethodDefinition: [true],
        require: null
      }
    ],
    'security/detect-non-literal-fs-filename': ['off'],
    'security/detect-non-literal-regexp': ['off'],
    'security/detect-non-literal-require': ['off'],
    'security/detect-object-injection': ['off'],
    semi: ['warn', 'never'],
    'valid-jsdoc': ['warn'],
    'vue/html-self-closing': ['off'],
    'vue/max-attributes-per-line': ['off'],
    'vue/no-v-html': ['off'],
    'wrap-iife': ['error', 'inside']
  }
}
