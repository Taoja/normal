const readline = require('readline')
const config = require('../webpack.config')
function env (packages) {
  var defaultEnv
  for (var i in config.default.env) {
    defaultEnv = i
    break
  }
  var rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    completer: function (line) {
      var inputList = line.split(' ')
      var input = inputList.pop()
      const hits = packages.filter((c) => c.startsWith(input));
      return [hits.length ? hits : packages, input];
    },
    prompt: `请输入运行的环境（默认${defaultEnv}）：`
  })
  rl.prompt()
  return new Promise((a) => {
    rl.on('line', function (e) {
      if (!e) {
        e = defaultEnv
      }
      rl.close()
      a(e)
    })
  })
}

module.exports = env
