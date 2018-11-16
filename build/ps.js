const path = require('path')
const config = require('../webpack.config')
const { packages, pages } = require('./fs.js')

const packageList = function (e) {
  if (e.length === 0) {
    e = packages
  }
  var package = {}
  pages.forEach(function (a) {
    if (e.includes(a.package)) {
      package[`${a.package}/${a.module}/${a.page}`] =  path.resolve(config.dir, `src/modules/${a.package}/${a.module}/${a.page}/index.js`)
    }
  })
  return package
}

module.exports = packageList
