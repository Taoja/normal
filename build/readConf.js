const {basename} = require('path')

class readConf {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('readConf', (compilation, callback) => {
      var result
      var config = compiler._packageConfig
      var output = basename(compiler.outputPath)
      if (config.hasOwnProperty(output)) {
        result = config[output]
      } else {
        result = config
      }
      result = JSON.stringify(result)
      compilation.assets['packageConfig.json'] = {
        source() {
          return result;
        },
        size() {
          return result.length;
        }
      }
      callback()
    })
  }
}

module.exports = readConf;