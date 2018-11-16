const config = require('../webpack.config.js')
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(config.dir, dir);
}

const isDev = process.env.NODE_ENV === 'development'

const options = {
  /**
   * 热更新调试配置
   */
  devServer: {
    host: config.dev.host,    // 服务器的IP地址，可以使用IP也可以使用localhost
    compress: true,    // 服务端压缩是否开启
    port: config.dev.port, // 端口
    hot: true, //热替换
    noInfo: false, //清除各种控制台console.log
    overlay: { //页面弹出错误信息
      warnings: false,
      errors: true
    },
    progress: true, //输出进度到控制台
    quiet: true
  },
  /**
   * sourceMap配置
   * ---------------------------------------------------------------------------------------
   * devtool	                      build	rebuild	production	quality
   * ---------------------------------------------------------------------------------------
   * (none)                          +++   +++     yes         bundled code
   * eval                            +++   +++     no          generated code
   * cheap-eval-source-map           +     ++      no          transformed code (lines only)
   * cheap-module-eval-source-map    o     ++      no          original source (lines only)
   * eval-source-map                 --    +       no          original source
   * cheap-source-map                +     o       yes         transformed code (lines only)
   * cheap-module-source-map         o     -       yes         original source (lines only)
   * inline-cheap-source-map         +     o       no          transformed code (lines only)
   * inline-cheap-module-source-map  o     -       no          original source (lines only)
   * source-map                      --    --      yes         original source
   * inline-source-map               --    --      no          original source
   * hidden-source-map               --    --      yes         original source
   * nosources-source-map            --    --      yes         without source content
   * ---------------------------------------------------------------------------------------
   * tips：+提速 o一般 -缓慢
   * ---------------------------------------------------------------------------------------
   */
  devtool: isDev ? config.dev.devtool : config.build.devtool,
  /**
   * 入口文件
   */
  // entry:{
  //   'base/home': './src/modules/base/home/index.js'
  // },
  /**
   * 输出配置
   */
  output: {
    path: resolve(config.default.output),
    filename: `[name].js`
  },
  /**
   * 插件
   */
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热更新
    new VueLoaderPlugin(), //vue加载器
  ],
  externals: config.default.externals,
  /**
   * 解析
   */
  resolve: config.default.resolve,
  /**
   * 模块
   */
  module: {
    rules: [
      {
        test: /\.(css|scss)$/, //css解析器
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')({
                  browsers: ['iOS >= 7', 'Android >= 4.1']
              })
            ]
          }
        }]
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader', //url解析器
            options: {
              limit:10, // 是把小于500000B的文件打成Base64的格式，写入JS。
              name: 'images/[name]-[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.stylus$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        },{
          loader: "stylus-loader"
        }]
      },
      {
        test: /\.scss$/,//sass解析器
        loader: ['sass-loader']
      },
      {
        test: /\.vue$/, //vue解析器
        loader: ['vue-loader']
      },
      {
        test: /\.js$/, //babel
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  }
}

module.exports = options;