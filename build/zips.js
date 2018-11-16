const fs = require('fs')
const config = require('../webpack.config')
const archiver = require('archiver')
const path = require('path');
const resolve = function (e) {
  return path.resolve(config.dir, e)
}

var outputdir = config.default.output
var packages = []
const dist = fs.readdirSync(resolve(outputdir))
dist.forEach(function (item) {
  let stat = fs.lstatSync(resolve( `${outputdir}/${item}`))
  if (stat.isDirectory() === true) { 
    packages.push(item)
  }
})
packages.forEach(function (item) {
  var zipName
  if (item in config.default.packageID) {
    zipName = config.default.packageID[item]
  } else {
    zipName = config.default.packageID.static
  }
  var output = fs.createWriteStream(resolve(`${outputdir}/${zipName}.zip`))
  var ac = archiver('zip', {
    zlib: { level: 9 }
  })
  ac.pipe(output)
  ac.directory(resolve(`${outputdir}/${item}/`), `${zipName}/${item}`)
  ac.finalize()
})
