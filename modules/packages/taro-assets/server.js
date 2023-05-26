const express = require('express');

let app;
function startServer({ port, assetsPath }) {
  if (app) {
    console.error('[taro-assets] server is already start!');
    return;
  }
  console.info(`[taro-assets] server start: http://localhost:${port}`);

  app = express();

  app.use(express.static(assetsPath));

  app.listen(port, () => {
    console.info(`[taro-assets] server start success: http://localhost:${port}`);
  });
}

module.exports = {
  startServer,
};
