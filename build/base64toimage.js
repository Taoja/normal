
class b64toimage {
  apply(compiler) {
    compiler.hooks.emit.tap('b64', (compilation) => {
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
        var packageName = chunk.name.split('/')[0]
        /**
         * 获取输出的所有输入
         */
        chunk.getModules().forEach(module => {
          /**
           * 如果该输入的构建信息中包含assets
           * @var assetName assets资源名 @example [hash].png
           */
          if (module.buildInfo.assets) {
            var assetName = Object.keys(module.buildInfo.assets)[0]
            ioMap[`${packageName}/${assetName}`] = compilation.assets[assetName]._value
            deleteMap[`${assetName}`] = assetName
            /**
             * 循环输出的所有文件
             * @param fileName 输出资源名称 @example hello/turbo/index.js
             * @var source 输出资源字符串
             */
            chunk.files.forEach((fileName) => {
              var source = compilation.assets[fileName].source()
              /**
               * 重置旧资源相对路径
               * @example '../../[hash].png' => '../../hello/[hash].png'
               */
              source = source.replace(new RegExp(assetName, 'g'), `${packageName}/${assetName}`)
              compilation.assets[fileName] = {
                source() {
                  return source
                },
                size() {
                  return source.length
                }
              }
            })
          }
        })
      })
      /**
       * 删除旧assets资源
       */
      for(let key in deleteMap) {
        delete compilation.assets[key]
      }
      /**
       * 生成新assets资源
       */
      for(let key in ioMap) {
        compilation.assets[key] = {
          source() {
            return ioMap[key]
          },
          size() {
            return ioMap[key].length
          }
        }
      }
    })
  }
}

module.exports = b64toimage
