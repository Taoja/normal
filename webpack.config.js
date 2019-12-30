const output = require('./config/output')
const modules = require('./config/module')
const resolve = require('./config/resolve')
const externals = require('./config/externals')
const plugins = require('./config/plugins')
const optimization = require('./config/optimization')
class config {
  get dir () {
    return __dirname
  }
  webpack (env, packages, entrys, config) {
    if (!env) {env = 'turbo'}
    return {
      output, //输出目录 {String}
      module: modules, //loader加载器
      resolve, //解析
      externals, //扩展
      plugins: plugins.call({}, env, packages, entrys, config), //插件
      optimization: optimization.call({}, packages), //优化
      devServer: { //本地服务
        port: 8082,
        host: '0.0.0.0',
        openPage: '/hello/turbo/index.html'
      },
      devtool: 'eval', //sourcemap
      performance: {}, //性能
    }
  }
}

module.exports = config