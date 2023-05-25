module.exports = {
  root: true,
  extends: ['@my/eslint-config-my-taro'],
  rules: {
    'import/export': ['off'],
    'import/first': ['off'],
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    WechatMiniprogram: false,
    wx: false,
  },
  overrides: [
    {
      files: ['scripts/**/*.js'],
      rules: {
        'import/no-commonjs': ['off'],
      },
    },
  ],
};
