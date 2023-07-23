module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      typescript: {}
    }
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/no-unused-vars': ['error', { 'args': 'none' }],
    'import/no-extraneous-dependencies': ["off", { "devDependencies": true }],
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always-and-inside-groups',
        'alphabetize': {
          'order': 'asc'
        }
      }
    ],
    'max-depth': ['error', 3],
    'no-console': 'off',
    'no-magic-numbers': ['warn', { 'ignore': [-1, 0, 1, 2, 24, 30, 60, 100, 1000], 'ignoreArrayIndexes': true }],
    'no-unused-vars': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
  },
};
