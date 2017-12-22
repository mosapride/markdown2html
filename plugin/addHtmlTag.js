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

      // headタグを追加する
      var head = `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" />`;
      head += `<title>${file.relative}</title>\n`;
      head += `<link rel="stylesheet" href="${hiePath}highlight.js/styles/dark.css">\n`;
      head += `<link rel="stylesheet" href="${hiePath}lightbox2/css/lightbox.css">\n`;
      head += `<link rel="stylesheet" href="${hiePath}css/styles.css">\n`;
      head += `<script src="${hiePath}highlight.js/lib/highlight.js"></script>\n`;
      head += `<script>hljs.initHighlightingOnLoad();</script>\n`;

      contents = head + contents;



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

      contents += `<script src="${hiePath}lightbox2/js/lightbox-plus-jquery.js"></script>`;
      contents += `</body></html>`;


      file.contents = new Buffer(contents);
      // 処理の完了を通知
      return callback(null, file);
    }

    this.push(file);
    callback();
  };

  return through.obj(transform);
};