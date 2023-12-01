const path = require('path')
const fs = require('fs')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })


module.exports = {
  mode: 'production',
  entry: './src/test/tests.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: {
    global: true,
    __filename: false,
    __dirname: false
  },
  externals: nodeModules,
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      url: false,
      buffer: false,
      util: false,
      assert: false,
      querystring: false,
      os: false,
      async_hooks: false,
      canvas: false,
      stats: 'verbose'
      //if you want to use this module also don't forget npm i crypto-browserify
    },

    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules']
    // modules: ['koa']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'out')
  }
}
