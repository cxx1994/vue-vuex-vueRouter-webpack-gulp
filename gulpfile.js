let gulp = require("gulp"),
    webpack = require("webpack-stream"),
    webpackConfig = require("./webpack.config.js"),
    //识别webpack中的多个入口文件
    vinylName = require("vinyl-named"),
    //js压缩
    uglify = require('gulp-uglify'),
    //为HTML添加css、js
    inject = require('gulp-inject'),
    //添加MD5戳
    rev = require("gulp-rev"),
    //替换原始文件中的js引用
    revCollect = require("gulp-rev-collector"),
    //清理旧文件
    clean = require("gulp-clean"),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefix = require('gulp-autoprefixer'),
    //控制任务进程
    gulpSequence = require('gulp-sequence'),

    //创建静态服务器
    browserSync = require('browser-sync').create(),
    //静态服务器重新加载
    reload      = browserSync.reload,

    //路径配置
    path = {
        baseDir: './',
        input: {
            html: "./src/index.html",
            css: "./static/css/*.css",
            sass: "src/sass/*.scss",
            js: [
                "./src/*.js",
                "./src/*/*.js",
                "./src/*/*/*.js"
            ],
            component: [
                "./src/components/*.vue",
                "./src/components/*/*.vue",
            ]
        },
        output: {
            dev: './build',
            dist: './dist'
        }
    };


//清理
gulp.task("clean",function(){
    return gulp.src(path.output.dev + "/*.*")
        .pipe(clean());
});
//启用webpack,依赖clean
gulp.task("webpack", ["clean"], function(){
    return gulp.src("./src/index.js")
        .pipe(vinylName())
        .pipe(webpack(webpackConfig))
        .on('error', function(err) {
            console.log('Js Error!', err.message);
            this.emit('end');
        })
        // .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("./build"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./build"));
});

//更新开发版本首页
gulp.task('dev', ["webpack", "sass"], function () {
    let target = gulp.src(path.input.html),
        sources = gulp.src(['./static/**/*.css', './build/*.js', './build/*.ttf', './build/*.woff'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));
});

//更新html中旧的js引用
gulp.task("rev", ["webpack"], function(){
    return gulp.src(["./build/*.json", path.input.html])
        .pipe(revCollect())
        .pipe(gulp.dest("./"));
});
//创建服务器
gulp.task('connect', function() {
    browserSync.init({
        server: {
            baseDir: path.baseDir
        }
    });
});
//reload操作
//watch js html 组件 三者的改变 起到自动刷新的作用
gulp.task("watch",function(){
    gulp.watch([
        path.input.html,
        ...path.input.js,
        ...path.input.component
    ], ["dev", reload], reload);

    gulp.watch(path.input.sass, ['sass']);
});

gulp.task('default',
    gulpSequence(
        ['dev', 'connect'],
        'watch'
    )
);

//清理
gulp.task("clean_dist",function(){
    return gulp.src(path.output.dist)
        .pipe(clean());
});

//编译压缩sass文件
gulp.task('sass', function() {
    return gulp.src(path.input.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(concat('build.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./static/css'))
        .pipe(reload({stream: true}));
});

//转移image
gulp.task('image', function() {
    return gulp.src('./static/images/*.*')
        .pipe(gulp.dest(path.output.dist + '/static/image'));
});

//编译压缩移动js
gulp.task('js', function() {
    return gulp.src('./build/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.output.dist + '/static/js'));
});

//转移首页
gulp.task('index', function () {
    let target = gulp.src(path.input.html + '/index.html'),
        sources = gulp.src(['./dist/static/**/*.js', './dist/static/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./dist'));
});

//压缩
gulp.task('package', function(){
    let zip = require('gulp-zip'),
        fileName = 'projectNew_0.zip';

    return gulp.src(['./dist/*', './dist/**/*', '!./dist/{css,js,img}/*.json'])
        .pipe(zip(fileName))
        .pipe(gulp.dest(path.output.dist));
});

//整体打包一个版本
gulp.task('build',
    gulpSequence(
        ['clean_dist', 'dev'],
        ['sass', 'image', 'js'],
        'index',
        'package'
    )
);


