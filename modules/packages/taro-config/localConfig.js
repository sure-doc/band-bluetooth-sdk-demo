/* eslint-disable import/no-commonjs */
const path = require('path');
const fs = require('fs');

function loadLocalConfig({ rootPath }) {
  const localPath = path.resolve(rootPath, 'config/local.js');

  if (!fs.existsSync(localPath)) return;

  return require(localPath);
}

module.exports = {
  loadLocalConfig,
};
