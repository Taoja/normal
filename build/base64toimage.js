const path = require('path')
  
const decodeBase64Image = dataString => {
  if (dataString === null || dataString.trim() === "") {
    return { error: new Error("Invalid input string") };
  }
  const data = {};
  const dataPureBase64 = dataString.split("\n").join("");
  const matches = dataPureBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (
    matches === null &&
    Buffer.from(dataPureBase64, "base64").toString("base64") === dataPureBase64
  ) {
    data.type = null;
    data.buffer = Buffer.from(dataPureBase64, "base64");
    return { error: undefined, data };
  }

  if (matches === null || matches.length !== 3) {
    return { error: new Error("Invalid input string") };
  }
  data.type = matches[1];
  data.buffer = Buffer.from(matches[2], "base64");
  return { error: undefined, data };
}


class b64toimage {
  constructor(packages) {
    this.packages = packages //当前打包名数组
    this.number = 0 //文件名标识自增用
    this.dir = '' //
  }
  /**
   * 命名
   * @return 包名+自增编号
   */
  get fileName () {
    return `${this.dir}${this.number++}`
  }
  /**
   * 重置文件命名空间
   * @param dir 目录名
   */
  resetNameSpace(dir) {
    this.dir = dir
    this.number = 0
  }
  apply(compiler) {
    compiler.hooks.emit.tap('b64', (compilation) => {
      /**
       * 循环遍历所有资源
       * @var dir 生成资源环境目录 @exmple '/hello/turbo' or 'hello'
       * @var base 生成资源名称
       */
      for (let name in compilation.assets) {
        let dir = path.parse(name).dir
        let base = path.parse(name).base
        /**
         * 匹配环境图片chunk
         * @case {this.packages.includes(dir)} 当前路径为包的根目录
         * @case {base == 'assetSourceMap.js'} 当前资源名为环境图片chunk名
         */
        if (this.packages.includes(dir) && base == 'assetSourceMap.js') {
          /**
           * 开始处理当前chunk内资源
           * 重置命名空间为当前包
           */
          this.resetNameSpace(dir)
          /**
           * 获取chunk资源字符串
           * 匹配到图片资源数组
           * @var source chunk字符串
           * @var arr base64字符串数组
           */
          let source = compilation.assets[name].source()
          let reg = /"data:image(.+?)"/g
          let arr = source.match(reg)
          /**
           * 循环遍历图片数组
           */
          for (let i in arr) {
            /**
             * @var fileName 生成文件名
             * @var buffer base64转换后的文件buffer
             * @var mineType 文件后缀
             */
            let fileName = this.fileName
            let target = arr[i].split('"')[1].replace(/\\/g, '')
            let decode = decodeBase64Image(target).data
            let buffer = decode.buffer
            let mineType = decode.type.split('/')[1]
            /**
             * 重置源chunk内base64改为引用文件相对路径
             */
            source = source.replace(target, `../assets/${fileName}.${mineType}`)
            /**
             * 增加webpack输出资源
             * 文件名：包/assets/文件名.类型
             */
            compilation.assets[`${dir}/assets/${fileName}.${mineType}`] = {
              source() {
                return  buffer
              },
              size() {
                return buffer.length
              }
            }
          }
          /**
           * 将重置后的源chunk改写
           */
          compilation.assets[name] = {
            source() {
              return source
            },
            size() {
              return source.length
            }
          }
        }
      }
    })
  }
}

module.exports = b64toimage
