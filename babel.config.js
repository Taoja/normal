module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      "@babel/preset-env",
      {
        corejs: "3",
        useBuiltIns: "usage",
      }
    ]
  ]
  const plugins = ['transform-vue-jsx', 'jsx-v-model', '@babel/syntax-dynamic-import']

  return {
    presets,
    plugins
  }
}