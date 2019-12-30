module.exports = function(packages) {
  var chunksConfig = {
    test: /\.(jpg|png|svg|gif|jpeg|woff2|woff|eot|ttf|tof|svg)$/,
    minChunks: 1
  }
  var splitChunksGroup = {}
  packages.forEach((e) => {
    splitChunksGroup[e] = {
      chunks: m => m.name.split('/')[0] == e,
      name: () => `${e}/assetSourceMap`,
      ...chunksConfig
    }
  })
  return {
    splitChunks: {
      cacheGroups: {
        default: false,
        ...splitChunksGroup
      },
    }
  }
}