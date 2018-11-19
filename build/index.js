const options = require('./options')
const config = require('../webpack.config')
const webpack = require('webpack')
const rl = require('./rl')
const env = require('./env')
const packageList = require('./ps')
const webpackDevServer = require('webpack-dev-server')
const { packages } = require('./fs.js')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
var args = process.argv
var isDev = args.includes('development')

const configEnv = {}
const configGlobal = {}
for (key in config.default.global) {
  configGlobal[key] = JSON.stringify(config.default.global[key])
}
for (key in config.default.env) {
  configEnv[key] = JSON.stringify(config.default.env[key])
}

function resolve (e) {
  return path.resolve(config.dir, e)
}

env().then((env) => {
  rl(packages).then(function (md) {
    resetOptions(md, env)
    startWebpack()
  })
})

function startWebpack () {

  if (isDev) {
    webpackDevServer.addDevServerEntrypoints(options, options.devServer)
    options.mode = 'development'
  } else {
    options.mode = 'production'
  }

  const compiler = webpack(options)
  
  if (isDev) {
    var server = new webpackDevServer(compiler, options.devServer)
    server.listen(options.devServer.port, options.devServer.host)
  } else {
    compiler.run()
  }
}

function resetOptions (md, env) {
  options.entry = packageList(md)
  for (var i in options.entry) {
    options.plugins.push(
        new HtmlWebpackPlugin({ //入口配置
        filename: `${i}.html`,// 生成文件名
        template: 'index.html', // 模板文件
        chunks: [i]
      })
    )
  }
  options.plugins.push(
    new CopyWebpackPlugin([
      { 
        from:  resolve('static'), 
        to: resolve(`${config.default.output}/static`)
      }
    ])
  )
  options.plugins.push(
    new webpack.DefinePlugin({
      'Global': configGlobal,
      'ENV': configEnv[env]
    })
  )
  if (isDev) {
    options.plugins.push(
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`应用已启动，请访问：http://${options.devServer.host}:${options.devServer.port}`]
        }
      })
    )
  }
}