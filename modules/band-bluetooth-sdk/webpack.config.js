// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    index: {
      import: './src/index.ts',
      filename: 'index.js',
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'commonjs',
    },
    chunkFormat: 'commonjs',
    clean: true,
  },
  devtool: !isProduction ? 'inline-source-map' : false,
  target: 'node', // 修改target为node
  plugins: [
    // Add your rules for custom modules here
    // Learn more about loaders from https://webpack.js.org/loaders/
    new webpack.DefinePlugin({
      'process.env.TARO_ENV': JSON.stringify('weapp'),
      ENABLE_INNER_HTML: JSON.stringify(false),
      ENABLE_ADJACENT_HTML: JSON.stringify(false),
      ENABLE_SIZE_APIS: JSON.stringify(false),
      ENABLE_TEMPLATE_CONTENT: JSON.stringify(false),
      ENABLE_CLONE_NODE: JSON.stringify(false),
      ENABLE_CONTAINS: JSON.stringify(false),
      ENABLE_MUTATION_OBSERVER: JSON.stringify(false),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
    ],
  },

  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
