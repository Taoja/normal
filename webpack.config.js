const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')
const sourcemap = require('./build/sourcemap')
function resolve (e) {
  return path.resolve(__dirname, e)
}

const config = {
  afterBuild: function () {
    sourcemap(__dirname, 'dist')
  },
  dir: __dirname,
  default: {
    output: 'dist',
    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss'],
      alias: {
        '@': resolve('src'),
        '@s': resolve('src/common/scss'),
        '@j': resolve('src/common/js'),
        '@a': resolve('src/assets'),
        '@c': resolve('src/components'),
      },
    },
    externals: {
      'vue': 'window.Vue',
    },
    env: {
      sit: {
        env: 'sit'
      },
      uat: {
        env: 'uat'
      }
    },
    global: {
      github: 'https://github.com/Taoja/v-turbo-normal'
    },
    plugins: [
      new VueLoaderPlugin(), //vue加载器
    ],
    loader: [
      {
        test: /\.(jpg|png|svg|gif|jpeg|woff2|woff|eot|ttf|tof|svg)$/,
        use: [
          {
            loader: 'url-loader', //url解析器
            options: {
              limit: 10, // 是把小于500000B的文件打成Base64的格式，写入JS。
              name: 'images/[name]-[hash].[ext]',
            }
          }
        ]
      },
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
        test: /\.(scss)$/,//sass解析器
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
      }
    ]
  },
  dev: {
    port: 8082,
    host: '0.0.0.0',
    devtool: 'eval'
  },
  build: {
    devtool: 'source-map'
  }
}

module.exports = config