const path = require('path')
function resolve (e) {
  return path.resolve(__dirname, '../', e)
}

module.exports = {
  extensions: ['.js', '.vue', '.json', '.scss'],
  alias: {
    '@': resolve('src'),
    '@s': resolve('src/common/scss'),
    '@j': resolve('src/common/js'),
    '@a': resolve('src/assets'),
    '@c': resolve('src/components'),
  },
}