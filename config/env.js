/* eslint-disable import/no-commonjs */
const nextEnv = require('@next/env');
const path = require('path');

const { combinedEnv } = nextEnv.loadEnvConfig(path.resolve(__dirname, '../'));

const envKeys = ['MY_DEV', 'MY_INDEX_PAGE', 'MY_NOT_LOGIN_INDEX_PAGE', 'MY_POSTER'];
const env = envKeys.reduce((map, key) => {
  return {
    ...map,
    [key]: JSON.stringify(combinedEnv[key] ?? ''),
  };
}, {});

console.info('[ENV]', env);

module.exports = {
  combinedEnv,
  env,
};
