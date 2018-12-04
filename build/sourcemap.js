const fs = require('fs')
const path = require('path')
const glob = require('glob')

const resolve = function (a, b, e) {
  return path.resolve(a, b, e)
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

module.exports = function (a, b) {
  var assetsRoot = path.resolve(a, b),
      mapDest = resolve(a, b, 'sourceMap'), //.map文件的目标目录
      cssMap = resolve(a, b, '**/*.css.map'), //所有.css.map
      jsMap = resolve(a, b, '**/*.js.map'); //所有.js.map
  glob.sync(cssMap).forEach(function (file) { //删除所有.css.map
      fs.unlinkSync(file);
  });
  glob.sync(jsMap).forEach(function (file) { //移动所有.js.map
      var dest = path.join(mapDest, file.substr(assetsRoot.length));
      mkDir(path.dirname(dest));
      fs.renameSync(file, dest);
  });
}
