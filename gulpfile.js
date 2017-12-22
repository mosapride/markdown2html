var gulp = require('gulp');
var hljs = require('highlight.js');
var markdown = require('gulp-markdown');
var addhtml = require('./plugin/addHtmlTag');
var img2lightbox = require('./plugin/img2lightbox');

var markOtion = {
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
        }
        return '<pre class="hljs"><code>' + str + '</code></pre>';
    }
};

gulp.task('markdown', function () {
    return gulp.src('md/**/*.md')
        .pipe(markdown(markOtion))
        .pipe(addhtml())
        .pipe(img2lightbox())
        .pipe(gulp.dest('www'));
});

gulp.task('file', function () {
    return gulp.src(['md/**/*', '!md/**/*.md'])
        .pipe(gulp.dest('www'));
});

gulp.task('copyTemplate', function () {
    return gulp.src('template/**/*')
        .pipe(gulp.dest('www'));
});

gulp.task('default', ['markdown', 'file' ,'copyTemplate'], function () {
    gulp.watch('md/**/*.md', ['markdown']);
    gulp.watch(['md/**/*', '!md/**/*.md'], ['file']);
});
