const fs = require('fs')
const path = require('path')
const glob = require('glob')

const resolve = function (a, e) {
  return path.resolve(a, e)
}

function mkDir(dir) {
  var arr = dir.split(/[\\\/]/),
      dirTmp = '',
      notExist = false;
  arr.forEach(function (item, i) {
      dirTmp += (i == 0 ? '' : '/') + item;
      if (item && (notExist || !fs.existsSync(dirTmp))) {
          fs.mkdirSync(dirTmp);
          notExist = true;
      }
  });
}

function move (a) {
  var assetsRoot = path.resolve(a),
      mapDest = resolve(a, 'sourceMap'), //.map文件的目标目录
      cssMap = resolve(a, '**/*.css.map'), //所有.css.map
      jsMap = resolve(a, '**/*.js.map'); //所有.js.map
  glob.sync(cssMap).forEach(function (file) { //删除所有.css.map
      fs.unlinkSync(file);
  });
  glob.sync(jsMap).forEach(function (file) { //移动所有.js.map
      var dest = path.join(mapDest, file.substr(assetsRoot.length));
      mkDir(path.dirname(dest));
      fs.renameSync(file, dest);
  });
}

class sourcemap {
  constructor(e) {
    this.dir = e
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tap('sourcemap', () => {
      var {options} = compiler
      if (options.mode === 'production') {
        move(this.dir)
      }
    })
  }
}

module.exports = sourcemap;
