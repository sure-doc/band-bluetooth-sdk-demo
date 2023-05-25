/* eslint-disable import/no-commonjs */

function addTrailingSlash(url) {
  return url?.endsWith('/') ? url : `${url ?? ''}/`;
}

function envValue(value) {
  return value !== undefined ? JSON.stringify(value) : 'undefined';
}

function envValues(obj) {
  return Object.keys(obj).reduce((res, key) => {
    const value = obj[key];
    return {
      ...res,
      [key]: envValue(value),
    };
  }, {});
}

module.exports = {
  addTrailingSlash,
  envValue,
  envValues,
};
