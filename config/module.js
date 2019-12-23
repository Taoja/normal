module.exports = {
  rules: [
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
}