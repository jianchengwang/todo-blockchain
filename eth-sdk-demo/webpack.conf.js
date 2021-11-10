var webpack = require('webpack');

// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {   //所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs
  target: 'node',
  entry: {
    web3: './src/web3-sdk.js',
    ethers: './src/ethers-sdk.js'
  },
  output: {     // 输出
    globalObject: "this",
    filename: '[name]-sdk.js',     // 输出文件名
    path: resolve(__dirname, 'build')    // 输出路径 , __dirname nodejs的变量，代表当前文件的目录绝对路径
  },

  resolve: {
    modules: [resolve(process.cwd(), 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
    symlinks: false,
    cacheWithContext: false
  },
  module: {    // loader的配置 , 不同文件必须配置不同loader处理
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 不检查 node_modules 下的 js 文件
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /^electron$/
    // }),
  ],
  externals: {
    electron: "electron"
  },
  mode: 'development', // 开发模式
}