var through = require('through2');
var gutil = require('gulp-util');
var PluginError = require('gulp-util').PluginError;
var PLUGIN_NAME = 'purapura';

module.exports = function () {
  /**
   * @this {Transform}
   */
  var transform = function (file, encoding, callback) {
    if (file.isNull()) {
      // 何もしない
      return callback(null, file);
    }

    if (file.isBuffer()) {
      // ファイルの内容をcontentsに読み込み
      var contents = String(file.contents);

      // 階層を記録
      var hierarchy = file.relative.split(/\\/).length - 1;
      var hiePath = "./";
      for (var i = 0; i < hierarchy; i++) {
        hiePath += "../";
      }

      // 編集した内容を出力
      // console.log("test = " + /img\[.*\]/.test(contents));
      while (/img\[.*\]/.test(contents)) {
        var base = contents.match(/img\[.*\]/)[0];
        var img = base;
        img = img.match(/\[.*\]/)[0];
        img = img.substr(1, img.length - 2);
        img = `<a class="a-lightbox" href="${img}" data-lightbox="group" ><img src="${img}"></a>`;
        contents = contents.replace(base, img);
      }

      file.contents = new Buffer(contents);
      // 処理の完了を通知
      return callback(null, file);
    }

    this.push(file);
    callback();
  };

  return through.obj(transform);
};