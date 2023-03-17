require('@rushstack/eslint-patch/modern-module-resolution');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  plugins: ['vue', '@typescript-eslint', 'prettier', '@typescript-eslint', 'import', 'promise'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-prettier',
    'plugin:promise/recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  ignorePatterns: ['node_modules', 'dist', '*.d.ts', 'vite.config.ts'],
  rules: {
    'prettier/prettier': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'arrow-spacing': 'error',
    'no-confusing-arrow': ['error', { allowParens: true, onlyOneSimpleParam: false }],
    'no-undef': 'off',

    // # TYPESCRIPT
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow',
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'static-field',
          'static-method',
          'field',
          'abstract-method',
          'constructor',
          'method',
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    // # VUE
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { registeredComponentsOnly: false },
    ],
    'vue/custom-event-name-casing': [
      'error',
      'camelCase',
      {
        ignores: ['/^(click):[a-z]+((d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/'],
      },
    ],
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/v-on-function-call': 'error',
    'vue/no-restricted-class': ['error', '/^(p|m)(l|r)-/'],
  },
};
