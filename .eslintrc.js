module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    serviceworker: true
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
    'vue-a11y',
    'fp',
    '@getify/proper-arrows'
  ],
  extends: [
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:security/recommended',
    'plugin:vue-a11y/base',
    '@vue/prettier',
    'plugin:vue/recommended'
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
    'no-console': ['warn'],
    'no-debugger': ['warn'],
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
    'prettier/prettier': ['warn'],
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
    'vue/singleline-html-element-content-newline': ['off'],
    'wrap-iife': ['error', 'inside'],
    'vue-a11y/click-events-have-key-events': ['off'],
    'vue-a11y/label-has-for': ['off']
  }
}
