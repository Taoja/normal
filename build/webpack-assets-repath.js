
class assetsRepath {
  constructor(callback) {
    this.callback = callback
    this.assetNameByModuleId = {}
  }
  
  apply(compiler) {
    compiler.hooks.compilation.tap('assetsRepath', compilation => {
      compilation.hooks.moduleAsset.tap('assetsRepath', (module, assetName) => {
        module._source._value.replace(new RegExp(assetName, 'g'), `__assetsRepath__/${assetName}`)
        this.assetNameByModuleId[module.id] = {
          assetName,
          module
        }
      })
    })
    compiler.hooks.emit.tap('assetsRepath', (compilation) => {
      /**
       * asset资源
       * 输入输出关系表
       * @example {
       *  包名/资源名: 资源buffer
       * }
       */
      var ioMap = {}
      /**
       * 需要删除的资源表
       * @example {
       *  资源名: 资源名
       * }
       */
      var deleteMap = {}
      /**
       * 循环遍历输出
       */
      compilation.chunks.forEach((chunk) => {
        /**
         * 获取每个输出所在包名
         */
        var packageName = this.callback(chunk.name)
        for (let i in this.assetNameByModuleId) {
          let item = this.assetNameByModuleId[i]
          if (item.module.isInChunk(chunk)) {
            let assetName = item.assetName
            ioMap[`${packageName}/${assetName}`] = compilation.assets[assetName].source()
            deleteMap[`${assetName}`] = assetName
            chunk.files.forEach((fileName) => {
              var source = compilation.assets[fileName].source()
              /**
               * 重置旧资源相对路径
               * @example '../../[hash].png' => '../../hello/[hash].png'
               */
              source = source.replace(new RegExp(`__assetsRepath__/${assetName}`, 'g'), `${packageName}\/${assetName}`)
              compilation.assets[fileName] = {
                source () {
                  return source
                },
                size () {
                  return source.length
                }
              }
            })
          }
        }
      })
      /**
       * 删除旧assets资源
       */
      for (let key in deleteMap) {
        delete compilation.assets[key]
      }
      /**
       * 生成新assets资源
       */
      for (let key in ioMap) {
        compilation.assets[key] = {
          source () {
            return ioMap[key]
          },
          size () {
            return ioMap[key].length
          }
        }
      }
    })
  }
}

module.exports = assetsRepath
