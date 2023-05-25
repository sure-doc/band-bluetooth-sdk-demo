module.exports = {
  extends: ['alloy/typescript'],

  rules: {
    '@typescript-eslint/no-require-imports': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-require-imports': ['error'],
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        '@typescript-eslint/no-parameter-properties': [
          'error',
          { allows: ['private', 'private readonly', 'protected', 'protected readonly'] },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            argsIgnorePattern: '^_',
            args: 'all',
            ignoreRestSiblings: false,
            caughtErrors: 'none',
          },
        ],
        '@typescript-eslint/no-namespace': ['off'],
      },
    },
  ],
};
