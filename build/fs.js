const fs = require('fs')
const path = require('path');
const config = require('../webpack.config')
const resolve = function (e) {
  return path.resolve(config.dir, e)
}
var packages = []
const package = fs.readdirSync(resolve('src/modules'))
package.forEach(function (item) {
    let stat = fs.lstatSync(resolve( "src/modules/" + item))
    if (stat.isDirectory() === true) { 
      packages.push(item)
    }
})

var pages = []
packages.forEach(function (a) {
  var packageInfo = require(resolve('src/modules/' + a))
  for (var i in packageInfo) {
    for (var j in packageInfo[i]) {
      pages.push({
        package: a,
        module: i,
        page: j
      })
    }
  }
})

module.exports = {
  packages,
  pages,
}
