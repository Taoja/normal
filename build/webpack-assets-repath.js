class assetsRepath {
  /**
   * 
   * @param {Reg} reg 命中资源名的正则匹配
   * @param {Function} callback 用以返回文件路径及相对路径的回调
   */
  constructor(reg, callback) {
    this.reg = reg
    this.callback = callback
    /**
     * runtimeChunk自定义相对路径变量
     * @example
     * {
       'cgbRetail/ewm/index': [
        '__assetsRepath__assetsiossvg = "../ewm/index/"',
        '__assetsRepath__assetslogo2xpng = "../ewm/index/"',
        ]
     * }
     */
    this.runtimeTemplate = {}
    /**
     * 非runtimeCHunk自定义相对路径变量
     * @example
     * {
       'cgbRetail/ewm/index': [
        '__assetsRepath__assetsiossvg = "../ewm/index/"',
        '__assetsRepath__assetslogo2xpng = "../ewm/index/"',
        ]
     * }
     */
    this.asyncTemplate = {}
    this.pluginName = 'assetsRepath'
  }
  apply(compiler) {
    /**
     * 开始构建
     */
    compiler.hooks.compilation.tap(this.pluginName, compilation => {
      /**
       * 优化入口
       */
      compilation.hooks.optimizeModules.tap(this.pluginName, (modules) => {
        /**
         * 循环所有入口
         */
        modules.forEach((module) => {
          /**
           * 匹配资源名
           */
          if (this.reg.test(module.rawRequest) && module.buildInfo.assets) {
            let assets = module.buildInfo.assets // 获取入口资源
            let chunks = module.getChunks() // 获取入口涉及的所有chunk
            let assetsName = Object.keys(assets)[0] // 获取入口资源名
            let assetsInfo = module.buildInfo.assetsInfo[assetsName] //获取入口资源信息
            let raw = assets[assetsName] // 获取入口资源raw值
            module.buildInfo.assets = Object.create(null) // 修改当前入口资源
            module.buildInfo.assetsInfo = new Map()
            /**
             * 循环涉及的所有chunk
             */
            for(let chunk of chunks) {
              let {dir, publicPath} = this.callback(chunk.name) //获取用户传入的资源路径及访问地址
              module.buildInfo.assets[`${dir}/${assetsName}`] = raw // 对chunk插入一条资源信息
              module.buildInfo.assetsInfo.set(`${dir}/${assetsName}`, assetsInfo)
              let fileName = assetsName.match(/[a-zA-Z0-9]/g).join('') //获取文件名（去除符号）
              module.dependencies[0].expression = `__webpack_require__.__assetsRepath__${fileName}` // 更改资源相对路径为自定义变量
              /**
               * 判断当前chunk是否为入口chunk
               * 即是否可以自定义runtime配置
               */
              if (chunk.hasEntryModule()) {
                /**
                 * @key 当前chunk名
                 * @value 自定义相对路径赋值代码数组
                 */
                this.runtimeTemplate[chunk.name] = [
                  ...this.runtimeTemplate[chunk.name] || [],
                  `__webpack_require__.__assetsRepath__${fileName} = '${publicPath}';`
                ]
              } else {
                /**
                 * @key 当前chunk名
                 * @value 自定义相对路径赋值代码数组
                 */
                this.asyncTemplate[chunk.name] = [
                  ...this.asyncTemplate[chunk.name] || [],
                  `__webpack_require__.__assetsRepath__${fileName} = '${publicPath}';`
                ]
              }
            }
          }
        })
      })
      /**
       * 生成runtimeTemplate时的tapable钩子
       */
      compilation.mainTemplate.hooks.requireExtensions.tap(this.pluginName,(source, chunk) => {
        /**
         * 判断是否为页面入口chunk
         * 判断你是否有runtime模板存在
         */
        if (chunk.name && this.runtimeTemplate[chunk.name] instanceof Array) {
          /**
           * 非入口模板
           */
          let asyncTemplate = []
          /**
           * 获取当前chunk下挂载的所有异步chunk
           */
          chunk.getAllAsyncChunks().forEach((asyncChunk) => {
            let chunkName = asyncChunk.name
            /**
             * 判断异步模板中是否含有该异步chunk
             */
            if (this.asyncTemplate[chunkName] && this.asyncTemplate[chunkName] instanceof Array) {
              asyncTemplate = [
                ...asyncTemplate,
                ...this.asyncTemplate[chunkName]
              ]
            }
          })
          /**
           * 拼接runtimeTempalte
           */
          let buf = []
          buf.push(source)
          buf = [
            ...buf,
            ...this.runtimeTemplate[chunk.name],
            ...asyncTemplate
          ]
          buf.join('\n')
          return buf
        } else {
          return source
        }
      })
    })
  }
}

module.exports = assetsRepath
