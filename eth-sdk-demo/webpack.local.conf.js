var webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {   //所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs
  target: 'web',
  entry: {
    web3: './src/web3-sdk.js',
    ethers: './src/ethers-sdk.js'
  },
  output: {     // 输出
    filename: '[name]-sdk.js',     // 输出文件名
    path: resolve(__dirname, 'build'),    // 输出路径 , __dirname nodejs的变量，代表当前文件的目录绝对路径
    globalObject: `typeof self !== 'undefined' ? self : this`,
    libraryTarget: 'umd'
  },

  resolve: {
    modules: [resolve(process.cwd(), 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
    symlinks: false,
    cacheWithContext: false,
    fallback: {
      "fs": false,
      "path": false,
      "http": false,
      "https": false,
      "os": false,
    },
  },
  module: {    // loader的配置 , 不同文件必须配置不同loader处理
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   // Here you should change 'env' to '@babel/preset-env'
          //   presets: [["@babel/preset-env", {
          //     "targets": {
          //       "esmodules": true
          //     },
          //     "modules": false,
          //     "loose": true
          //   }]],
          // },
        },
        // 不检查 node_modules 下的 js 文件
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /^electron$/
    // }),
    // https://github.com/markdalgleish/static-site-generator-webpack-plugin#globals
    new StaticSiteGeneratorPlugin({
      globals: {
        window: {},
        btoa: {
          bind: function() {

          }
        }
      }
    })
  ],
  externals: {
    electron: "electron"
  },
  mode: 'development', // 开发模式
}