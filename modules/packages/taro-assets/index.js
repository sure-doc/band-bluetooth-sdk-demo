/* eslint-disable import/no-commonjs */
const path = require('path');
const { startServer } = require('./server');

function config(
  taroConfig,
  {
    taro35,
    // 输出路径，相对于小程序文件的输出目录
    // 如： path.join('..', assetsConfig.relativeOut)
    outputPath,
    // 静态资源服务
    // {
    //   enabled: true,
    //   port: 4005,
    //   assetsPath,
    // }
    // enabled: 默认为 process.env.NODE_ENV === 'development'
    // port: 默认 undefined
    server,
  },
) {
  const serverConfig = server || { enabled: process.env.NODE_ENV === 'development', port: undefined };
  if (serverConfig.enabled) {
    if (!serverConfig.port) {
      throw new Error('[taro-assets]: server.enabled is true but server.port is undefined');
    }
    if (!serverConfig.assetsPath) {
      throw new Error('[taro-assets]: server.enabled is true but server.assetsPath is undefined');
    }
    startServer({ port: serverConfig.port, assetsPath: serverConfig.assetsPath });
  }
  return {
    ...taroConfig,
    mini: {
      ...taroConfig.mini,

      // 针对 mp4 | webm | ogg | mp3 | wav | flac | aac 文件的 url-loader 配置
      // https://docs.taro.zone/docs/config-detail/#minimediaurlloaderoption
      mediaUrlLoaderOption: {
        limit: 0,
        // 修改输出地址，不放到小程序内
        outputPath,
        ...(taro35
          ? {
              name(filename) {
                return process.env.NODE_ENV === 'development' ? '[path][name][ext]' : '[contenthash][ext]';
              },
            }
          : {
              name(filename) {
                return process.env.NODE_ENV === 'development' ? '[path][name].[ext]' : '[contenthash].[ext]';
              },
              publicPath: '/',
              // 修改静态资源的访问地址，直接访问静态资源对应地址，如：http://localhost:4005
              // __webpack_public_path__ 变量在 app.tsx 中赋值
              // postTransformPublicPath 设置: https://github.com/webpack-contrib/file-loader#dynamic-public-path-depending-on-environment-variable-at-run-time
              postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
            }),
      },
      // 针对 png | jpg | jpeg | gif | bpm | svg 文件的 url-loader 配置
      // https://docs.taro.zone/docs/config-detail#miniimageurlloaderoption
      imageUrlLoaderOption: {
        limit: 0,

        // 修改输出地址，不放到小程序内
        outputPath,
        ...(taro35
          ? {
              name(filename) {
                return process.env.NODE_ENV === 'development' ? '[path][name][ext]' : '[contenthash][ext]';
              },
            }
          : {
              name(filename) {
                return process.env.NODE_ENV === 'development' ? '[path][name].[ext]' : '[contenthash].[ext]';
              },
              publicPath: '/',
              // 修改静态资源的访问地址，直接访问静态资源对应地址，如：http://localhost:4005
              // __webpack_public_path__ 变量在 app.tsx 中赋值
              // postTransformPublicPath 设置: https://github.com/webpack-contrib/file-loader#dynamic-public-path-depending-on-environment-variable-at-run-time
              postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
            }),
      },
    },
    env: {
      ...taroConfig.env,
      ASSETS_SERVER_PORT: JSON.stringify(serverConfig.port),
    },
  };
}

module.exports = config;
