const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')
const sourcemap = require('./build/sourcemap')
const readConf = require('./build/readConf')
function resolve (e) {
  return path.resolve(__dirname, e)
}

const config = {
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
      turbo: {
        env: 'sit'
      }
    },
    global: {
      FrameWork: {
        Github: 'https://github.com/Taoja/v-turbo-normal',
        Issues: 'https://github.com/Taoja/v-turbo-normal/issues',
        Document: 'https://github.com/Taoja/v-turbo-normal'
      },
      Bridge: {
        Github: 'https://github.com/Taoja/v-turbo-bridge',
        Issues: 'https://github.com/Taoja/v-turbo-bridge/issues',
        Document: 'https://github.com/Taoja/v-turbo-bridge'
      },
      Turbo: {
        Homepage: 'https://github.com/Taoja/v-turbo-normal',
        Desk: 'https://github.com/Taoja/v-turbo-normal/issues',
        Document: 'https://github.com/Taoja/v-turbo-normal'
      }
    },
    plugins: [
      new readConf(),
      new VueLoaderPlugin(), //vue加载器
      new sourcemap(resolve('dist'))
    ],
    loader: [
      {
        test: /\.(jpg|png|svg|gif|jpeg|woff2|woff|eot|ttf|tof|svg)$/,
        use: ['url-loader']
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
    devtool: 'eval',
    open: '/hello/turbo/index.html'
  },
  build: {
    devtool: 'source-map'
  }
}

module.exports = config