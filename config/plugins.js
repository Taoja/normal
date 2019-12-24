const sourcemap = require('../build/sourcemap')
const readConf = require('../build/readConf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
function resolve (e) {
  return path.resolve(__dirname, '../', e)
}

var envConfig = { //环境变量
  turbo: {
    env: 'sit'
  }
}
var global = JSON.stringify({ //全局变量
  FrameWork: {
    Github: 'https://github.com/Taoja/v-turbo-normal',
    Issues: 'https://github.com/Taoja/v-turbo-normal/issues',
    Document: 'https://github.com/Taoja/v-turbo-normal'
  },
  Bridge: {
    Github: 'https://github.com/Taoja/v-turbo-bridge',
    Issues: 'https://github.com/Taoja/v-turbo-bridge/issues',
    Document: 'https://github.com/Taoja/v-turbo-bridge'
  },
  Turbo: {
    Homepage: 'https://github.com/Taoja/v-turbo-normal',
    Desk: 'https://github.com/Taoja/v-turbo-normal/issues',
    Document: 'https://github.com/Taoja/v-turbo-normal'
  }
})

module.exports = function(env, entrys) {
  var HWPs = []
  for (var item in entrys) {
    HWPs.push(
      new HtmlWebpackPlugin({ //入口配置
        filename: `${item}.html`,// 生成文件名
        template: 'index.html', // 模板文件
        chunks: [`${item}`, `${item.split('/')[0]}/chunk`],
        static: '../../static',
        hash: true
      })
    )
  }
  return [
    new readConf(),
    new VueLoaderPlugin(), //vue加载器
    new sourcemap(resolve('dist')),
    new webpack.DefinePlugin({
      'Global': global,
      'ENV': JSON.stringify(envConfig[env])
    }),
    new CopyWebpackPlugin([
      { 
        from: resolve('static'), 
        to: resolve(`dist/static`)
      }
    ]),
    ...HWPs
  ]
}