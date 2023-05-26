console.warn(` 
---------------------- eslint-config-my ----------------------

"extends: ['@my/eslint-config-my/next-only'],"

替换为

"extends: ["extends": "@my/eslint-config-my-next"],"

---------------------- eslint-config-my ----------------------
`);

module.exports = {
  root: true,
  extends: [
    /**
     * https://github.com/AlloyTeam/eslint-config-alloy
     */
    'next/core-web-vitals',
    'alloy',
    // 'alloy/react',
    'alloy/typescript',
    /**
     * https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
     */
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    },
  },
  rules: {
    '@typescript-eslint/no-require-imports': ['off'],
    'react/display-name': ['off'],
    'jsx-a11y/alt-text': ['off'],
    'react/no-unstable-nested-components': ['off'],
    'guard-for-in': ['off'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never', propElementValues: 'always' }],
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
        'react/no-unstable-nested-components': ['off'],
        '@typescript-eslint/no-namespace': ['off'],
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js'],
};
