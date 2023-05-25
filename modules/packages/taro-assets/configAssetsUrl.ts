/* eslint-disable no-undef */

export default function configAssetsUrl(fn: (options: { port: number }) => string) {
  if (process.env.TARO_ENV === 'weapp') {
    // 设置静态资源路径
    // 相关性设置：/config/index.js 中的 imageUrlLoaderOption
    // 参看文档：https://github.com/webpack-contrib/file-loader#dynamic-public-path-depending-on-environment-variable-at-run-time
    __webpack_public_path__ = fn({ port: Number(process.env.ASSETS_SERVER_PORT) });
  }
}
