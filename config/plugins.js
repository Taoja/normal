const sourcemap = require('../build/sourcemap')
const readConf = require('../build/readConf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')
function resolve (e) {
  return path.resolve(__dirname, '../', e)
}

module.exports = [
  new readConf(),
  new VueLoaderPlugin(), //vue加载器
  new sourcemap(resolve('dist'))
]