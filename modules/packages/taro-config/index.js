/* eslint-disable import/no-commonjs */
const path = require('path');
const { loadLocalConfig } = require('./localConfig');

/**
 * ## Example
 *
 * ```js
 * const { createTaroConfig } = require('@my/taro-config');
 *
 * module.exports = function (merge) {
 *   const taroConfig = createTaroConfig({
 *     merge,
 *     dev: () => require('./dev'),
 *     prod: () => require('./prod'),
 *     // 当前项目根目录
 *     rootPath: path.resolve(__dirname, '..'),
 *     // 小程序相关
 *     mini: {
 *       // 输出目录，默认 'dist'
 *       outputRoot： '',
 *       // 本地静态资源服务器
 *       assetsServer: {
 *         // 端口, 默认: 8001
 *         port: 8001,
 *       },
 *     },
 *     // h5 相关
 *     h5: {
 *       // 输出目录，默认 'dist-h5'
 *       outputRoot: '',
 *       // 静态资源的路径
 *       // 如：'https://cdn.xindong.com/'
 *       publicPath: '',
 *       // 是否开启 sourceMap
 *       enableSourceMap: true,
 *     },
 *     // rn 相关
 *     rn: {
 *       // 输出目录，默认 'dist-rn'
 *       outputRoot: ''
 *       // taro-app 项目的相对路径，如：'../profession-coach-app'
 *       appDir: ''
 *     }
 *   });
 *
 *   taroConfig.merge({
 *     projectName: '心动家',
 *     date: '2021-3-15',
 *     env,
 *   });
 *
 *   return taroConfig.getConfig();
 * };
 * ```
 */
function createTaroConfig({ merge, dev: getDevConfig, prod: getProdConfig, rootPath, ...reset }) {
  console.info(`[taro-config]: rootPath=${rootPath}`);

  const devMode = process.env.NODE_ENV === 'development';
  if (devMode) {
    console.info(`[taro-config]: is devMode`);
  }

  const localConfig = loadLocalConfig({ rootPath });
  const { mini: miniConfig, h5: h5Config, rn: rnConfig } = merge({ ...reset, ...localConfig });

  // mini
  const { outputRoot: miniOutputRoot = 'dist', assetsServer: miniAssetsServerConfig } = miniConfig || {};
  const miniAssetsServer = { port: 8081, ...miniAssetsServerConfig };

  // h5
  const {
    outputRoot: h5OutputRoot = 'dist-h5',
    publicPath: h5PublicPath = '/',
    enableSourceMap: h5EnableSourceMap,
  } = h5Config || {};

  // rn
  const { outputRoot: rnOutputRoot = 'dist-rn', appDir = '.' } = rnConfig || {};

  if (h5PublicPath !== undefined) {
    console.info(`[taro-config]: h5.publicPath=${h5PublicPath}`);
  }
  if (h5EnableSourceMap) {
    console.info(`[taro-config]: h5.enableSourceMap=${h5EnableSourceMap}`);
  }

  const alias = {
    '@': path.resolve(rootPath, 'src'),
  };

  const compiler = {
    type: 'webpack5',
    prebundle: {
      /**
       * 文档：https://docs.taro.zone/docs/next/prebundle
       *
       * - 之前 3.5.3 weapp 开启后异常，未验证是否可以
       * - 开启后，构建 h5 (build:h5) 会打不开页面
       */
      enable: devMode,
    },
  };

  const cssModules = {
    enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
    config: {
      namingPattern: 'module', // 转换模式，取值为 global/module
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  };

  const taroOutputRoot =
    {
      h5: h5OutputRoot,
      weapp: miniOutputRoot,
      rn: rnOutputRoot,
    }[process.env.TARO_ENV] || 'dist';

  function analyzerWebpackChain(chain) {
    if (process.env.ANALYZER) {
      chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, []);
    }
  }

  let taroConfig = {
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: taroOutputRoot,
    framework: 'react',
    compiler,
    cache: {
      /** 本地开发, 开启缓存 */
      enable: process.env.MY_DEV === 'true', // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    alias,
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 0, // 设定转换尺寸上限
          },
        },
        cssModules,
      },
      webpackChain(chain) {
        analyzerWebpackChain(chain);
      },
      // 优化主包的体积大小
      optimizeMainPackage: {
        enable: process.env.NODE_ENV === 'production',
      },
      miniCssExtractPluginOption: {
        // 忽略css文件引入顺序
        ignoreOrder: true,
      },
    },
    h5: {
      output: {
        filename: devMode ? 'js/[name].js' : 'js/[name].[fullhash].js',
        chunkFilename: devMode ? 'js/[name].js' : 'js/[name].[contenthash].js',
      },
      publicPath: h5PublicPath,
      staticDirectory: 'static',
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: devMode ? '[name].css' : 'css/[name].[contenthash].css',
        chunkFilename: devMode ? '[name].css' : 'css/[name].[contenthash].css',
      },
      imageUrlLoaderOption: {
        name(resourcePath, resourceQuery) {
          return devMode ? '[path][name][ext]' : 'image/[contenthash][ext]';
        },
        publicPath: h5PublicPath,
      },
      enableSourceMap: h5EnableSourceMap,
      ...(devMode ? {} : { sourceMapType: 'source-map' }),
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            targetUnit: 'px',
          },
        },
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules,
      },
      webpackChain(chain) {
        analyzerWebpackChain(chain);
      },
    },
    rn: {
      output: {
        ios: `${appDir}/ios/main.jsbundle`,
        iosAssetsDest: `${appDir}/ios`,
        android: `${appDir}/android/app/src/main/assets/index.android.bundle`,
        androidAssetsDest: `${appDir}/android/app/src/main/res`,
        // iosSourceMapUrl: '',
        iosSourcemapOutput: `${appDir}/ios/main.map`,
        // iosSourcemapSourcesRoot: '',
        // androidSourceMapUrl: '',
        androidSourcemapOutput: `${appDir}/android/app/src/main/assets/index.android.map`,
        // androidSourcemapSourcesRoot: '',
      },
      postcss: {
        cssModules: {
          enable: cssModules.enable,
        },
      },
    },
  };

  // 静态资源配置
  if (process.env.TARO_ENV === 'weapp') {
    taroConfig = require('@my/taro-assets')(taroConfig, {
      taro35: true,
      outputPath: path.join('..', 'assets-dist'),
      server: {
        enabled: process.env.MY_DEV === 'true',
        assetsPath: path.resolve(rootPath, './assets-dist'),
        port: miniAssetsServer.port,
      },
    });
  }

  // merge dev/prod config
  if (devMode) {
    taroConfig = merge({}, taroConfig, getDevConfig?.() ?? {});
  } else {
    taroConfig = merge({}, taroConfig, getProdConfig?.() ?? {});
  }

  console.info('[taro-config]', taroConfig);

  return {
    merge: (config) => {
      taroConfig = merge({}, taroConfig, config);
    },
    change: (changeFn) => {
      taroConfig = changeFn(taroConfig);
    },
    getConfig: () => taroConfig,
  };
}

module.exports = {
  createTaroConfig,
};
