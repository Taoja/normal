module.exports = {
  rules: [
    {
      test: /\.(jpg|png|svg|gif|jpeg|woff2|woff|eot|ttf|tof|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10,
          esModule: false,
          name: 'assets/[name].[ext]'
        }
      }]
    },
    {
      test: /\.(css|scss)$/, //css解析器
      use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')
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
      },
      exclude: [/node_modules/]
    }
  ]
}