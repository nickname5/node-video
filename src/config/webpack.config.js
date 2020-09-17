const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry:  path.resolve(__dirname, '../index.ts'),
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, '../'), 'node_modules'],
  },
  node: {
    __dirname: false,
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/views', to: 'views'},
        { from: 'public', to: 'public' }
      ],
    }),
    new WebpackShellPlugin({
      onBuildEnd: ['npm run start:dev']
    })
  ]
};
