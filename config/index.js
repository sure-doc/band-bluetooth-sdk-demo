/* eslint-disable import/no-commonjs */
const path = require('path');
const { createTaroConfig } = require('@my/taro-config');

const { env } = require('./env');

const rootPath = path.resolve(__dirname, '..');

const isPoster = process.env.MY_POSTER;

module.exports = function (merge) {
  const taroConfig = createTaroConfig({
    merge,
    dev: () => require('./dev'),
    prod: () => require('./prod'),
    rootPath,
    mini: {
      assetsServer: {
        port: 3003,
      },
    },
    h5: {
      ...(isPoster ? { outputRoot: 'dist-h5-poster' } : {}),
    },
  });

  taroConfig.merge({
    projectName: '心动家',
    date: '2021-3-15',
    env,
  });

  return taroConfig.getConfig();
};
