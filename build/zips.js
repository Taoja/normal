const fs = require('fs')
const archiver = require('archiver')
const rimraf = require('rimraf')

const config = require('vue-splitter/lib/config')
const resolve = require('vue-splitter/lib/resolve')

var outputdir = config.default.output
const dist = fs.readdirSync(resolve(outputdir))
dist.forEach(function (item) {
  let stat = fs.lstatSync(resolve( `${outputdir}/${item}`))
  if (stat.isDirectory() === true) { 
    var output = fs.createWriteStream(resolve(`${outputdir}/${item}.zip`))
    output.on('close', function() {
      rimraf(resolve(`${outputdir}/${item}/`), () => {
      })
    })
    var ac = archiver('zip', {
      zlib: { level: 9 }
    })
    ac.pipe(output)
    ac.directory(resolve(`${outputdir}/${item}/`), `${item}`)
    ac.finalize()
  }
})

