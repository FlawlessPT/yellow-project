module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    // Disables ESLint rules that might conflict with Prettier
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Sorting Import Statements
    'import/order': [
      'error',
      {
        // Sort imports by groups
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index', 'object', 'type', 'unknown'],
        // Sort imports inside groups
        pathGroups: [
          { pattern: 'react', group: 'builtin' },
          { pattern: '@configs/**', group: 'internal' },
          { pattern: '@configs', group: 'internal' },
          { pattern: '@pages/**', group: 'sibling' },
          { pattern: '@pages', group: 'sibling' },
          { pattern: '@components/**', group: 'parent' },
          { pattern: '@components', group: 'parent' },
          { pattern: '@hooks/**', group: 'index' },
          { pattern: '@hooks', group: 'index' },
          { pattern: '@utils/**', group: 'object' },
          { pattern: '@utils', group: 'object' },
          { pattern: '@types/**', group: 'unknown' },
          { pattern: '@types', group: 'unknown' },
        ],
        // Don't sort imports
        pathGroupsExcludedImportTypes: ['react'],
        // Add newlines between import groups
        'newlines-between': 'always',
        // Sort alphabetically
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      // Enable TypeScript files extension
      files: ['*.ts', '*.tsx'],
      // Enable TypeScript specific rules
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        quotes: ['error', 'single', { avoidEscape: true }],
        // Disallows the use of the no-unused-vars rule
        'no-unused-expressions': ['error'],
        // Disallows the use of the no-console rule
        'no-console': ['warn'],
        // Disallow duplicate imports
        'no-duplicate-imports': 'error',
        // Disable the need of importing react when using JSX
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
      },
      // Enable TypeScript specific parser
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
    },
  ],
};
