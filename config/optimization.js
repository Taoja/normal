module.exports = function(packages) {
  var chunksConfig = {
    test: /[\\/]common|assets|components|node_modules[\\/]/,
    minChunks: 2
  }
  var splitChunksGroup = {}
  packages.forEach((e) => {
    splitChunksGroup[e] = {
      chunks: m => m.name.split('/')[0] == e,
      name: () => `${e}/chunk`,
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