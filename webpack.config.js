const output = require('./config/output')
const modules = require('./config/module')
const resolve = require('./config/resolve')
const externals = require('./config/externals')
const plugins = require('./config/plugins')

const config = {
  dir: __dirname, //根目录
  env: { //环境变量
    turbo: {
      env: 'sit'
    }
  },
  global: { //全局变量
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
  },
  default: {
    output, //输出目录
    module: modules, //loader加载器
    resolve, //解析
    externals, //扩展
    plugins, //插件
    optimization: {}, //优化
    devServer: { //本地服务
      port: 8082,
      host: '0.0.0.0',
      openPage: '/hello/turbo/index.html'
    },
    devtool: 'eval', //sourcemap
    performance: {}, //性能
  }
}

module.exports = config