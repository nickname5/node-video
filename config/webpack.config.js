const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('-------',  path.resolve(__dirname, '../src/index.ts'));

module.exports = {
  entry:  path.resolve(__dirname, '../src/index.ts'),
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
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
      // {
      //   test: /\.ejs$/,
      //   loader: 'ejs-loader',
      //   options: {
      //     variable: 'data',
      //     interpolate : '\\{\\{(.+?)\\}\\}',
      //     evaluate : '\\[\\[(.+?)\\]\\]'
      //   }
      // }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/views', to: 'views'},
      ],
    }),
    new WebpackShellPlugin({
      onBuildEnd: ['npm run start2:dev']
    })
  ]
};