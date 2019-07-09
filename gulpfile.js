var gulp = require('gulp'),
    pump = require('pump'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    $ = gulpLoadPlugins(),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('useref', function (cb) {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    },
    version = Math.round(new Date());

    pump([
     gulp.src('src/index.html'),
        $.useref(),
        //.pipe($.if('*.js', $.uglify()))
        //.pipe($.if('*.css', $.cleanCss()))
        //.pipe($.replace('.css"', '.css?v=' + version + '"'))
        //.pipe($.replace('.js"', '.js?v=' + version + '"'))
        $.if('*.js', $.uglify().on('error', function(err){
            $.util.log(err);
            this.emit('end');
        })),
        $.if('*.js', $.rev()),
        $.if('*.css', $.cleanCss()),
        $.if('*.css', $.rev()),
        $.revReplace({}),
        $.if('*.html', $.htmlmin(options)),
        gulp.dest('dist')
        ], cb);
});

//拷贝翻译js
gulp.task('chjs', function () {
    return gulp.src('src/l10n/*.js')
        .pipe(gulp.dest('dist/l10n/'));
});

//拷贝七牛
gulp.task('qiniu', function () {
    return gulp.src('src/js/qiniu/js/*.js')
        .pipe($.uglify().on('error', function(err){
            $.util.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest('dist/js/qiniu/js/'));
});

//拷贝模版js
gulp.task('tpl', function () {
    return gulp.src('src/tpl/**/*')
        .pipe($.if('*.js', $.uglify().on('error', function(err){
            $.util.log(err);
            this.emit('end');
        })))
        .pipe(gulp.dest('dist/tpl/'));
});

//压缩图片
gulp.task('minImages', function () {
    return gulp.src(['src/img/**/*.png', 'src/img/**/*.jpg', 'src/img/**/*.gif', 'src/img/**/*.ico'])
        .pipe($.cache($.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'));
});

//拷贝字体
gulp.task('fonts', function () {
    return gulp.src([
        'src/fonts/sourcesanspro/sourcesanspro.*',
        'src/fonts/sourcesanspro/sourcesanspro-bold.*',
        'src/fonts/sourcesanspro/sourcesanspro-light.*',
    ])
        .pipe(gulp.dest('dist/fonts/sourcesanspro/'));
});

//拷贝字体
gulp.task('bootstrapFonts', function () {
    return gulp.src('src/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.*')
        .pipe(gulp.dest('dist/fonts/'));
});

//拷贝字体
gulp.task('awesomeFonts', function () {
    return gulp.src(['src/bower_components/font-awesome/fonts/fontawesome-webfont.*', 'src/bower_components/font-awesome/fonts/fontawesome.*'])
        .pipe(gulp.dest('dist/fonts/'));
});


//拷贝字体
gulp.task('simpleFonts', function () {
    return gulp.src('src/bower_components/simple-line-icons/fonts/Simple-Line-Icons.*')
        .pipe(gulp.dest('dist/fonts/'));
});

//拷贝数据文件
gulp.task('data', function () {
    return gulp.src('src/data/*')
        .pipe(gulp.dest('dist/data/'));
});

//拷贝choosen图片
gulp.task('choosenPic', function () {
    return gulp.src('src/css/*.png')
        .pipe(gulp.dest('dist/css/'));
});

//拷贝ztree图片
gulp.task('ztreePic', function () {
    return gulp.src('src/bower_components/jquery.ztree/zTreeStyle/img/*')
        .pipe(gulp.dest('dist/css/img'));
});

//拷贝资源
gulp.task('static', function () {
    return gulp.src('src/static/*')
        .pipe(gulp.dest('dist/static/'));
});

//清理文件夹
gulp.task('clean', function () {
    return gulp.src('dist/')
        .pipe($.clean());
});

gulp.task('less', function () {
  return gulp.src('src/css/all.less')
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.less())
    .pipe(gulp.dest('src/css/'))
});

gulp.task('default',['less'], function () {
    gulp.start('useref', 'qiniu', 'chjs', 'tpl', 'minImages', 'fonts', 'bootstrapFonts', 'awesomeFonts', 'simpleFonts', 'data', 'choosenPic', 'ztreePic');
});

gulp.task('server', ['less'], function () {
    browserSync.init({
	    port: 8040,
      server: {
        baseDir: './',
      },
      startPath: '/src'
    });
  gulp.watch("src/css/*.less", ['less']);
  gulp.watch("src/**").on('change', reload);
});

//生成精灵图
gulp.task('sprite', function () {
    return gulp.src('src/images/nav/*.png')
        .pipe($.spritesmith({imgName: 'icon-nav.png', cssName: 'icon-nav.css' }))
        .pipe(gulp.dest('src/images/nav/'));
});