module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    // Disables ESLint rules that might conflict with Prettier
    'eslint-config-prettier',
  ],
  ignorePatterns: ['babel.config.js', 'metro.config.js', 'node_modules', 'vite.config.ts'],
  plugins: [
    // TypeScript plugin for ESLint
    '@typescript-eslint',
    // React-specific linting rules
    'react',
    // React Native-specific linting rules
    'react-native',
    // Prettier integration to disable conflicting rules
    'prettier',
    // Rules for React hooks
    'react-hooks',
    // Rules for React hooks
    'import',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        // Sort imports by groups
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        // Sort imports inside groups
        pathGroups: [
          { pattern: 'react', group: 'builtin' },
          { pattern: 'react-native', group: 'builtin' },
          { pattern: '@assets', group: 'external' },
          { pattern: '@assets/**', group: 'external' },
          { pattern: '@screens', group: 'internal' },
          { pattern: '@screens/**', group: 'internal' },
          { pattern: '@components', group: 'parent' },
          { pattern: '@components/**', group: 'parent' },
          { pattern: '@hooks', group: 'sibling' },
          { pattern: '@hooks/**', group: 'sibling' },
          { pattern: '@utils', group: 'index' },
          { pattern: '@utils/**', group: 'index' },
          { pattern: '@types', group: 'object' },
          { pattern: '@types/**', group: 'object' },
          { pattern: '@theme', group: 'type' },
          { pattern: '@theme/**', group: 'type' },
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
