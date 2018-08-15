const gulp = require('gulp')
const Path = require('path')
const data = require('gulp-data')
const minify = require('gulp-minify-css')
const jade = require('gulp-jade')
const stylus = require('gulp-stylus')
const less = require('gulp-less')
const auto = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const bs = require('browser-sync').create()
// const ipv4 = require('ipv4')
const htmlMin = require('gulp-htmlmin')
const webpack = require('webpack-stream')
const ts=require('gulp-typescript')

const reload = bs.reload

const options = {
  removeComments: true,//清除HTML注释
  collapseWhitespace: true,//压缩HTML
  collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
  removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
  removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
  removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
  minifyJS: true,//压缩页面JS
  minifyCSS: true//压缩页面CSS
};

console.log('gulp任务启动成功！')

const res = {
  views: ['./ES/src/views/**/*.jade'],
  html: ['./ES/src/views/**/*.html'],
  styls: ['./ES/src/css/**/*.styl'],
  lesss: ['./ES/src/css/**/*.less'],
  scripts: ['./ES/src/js/**/*.js'],
  ts:['./ES/src/js/**/*.ts']
}

gulp.task('views', (e) => {

  console.log('jade转译中。。。')

  return gulp.src(res.views)
    .pipe(jade(
      {
        // jade,
        pretty: true,
      }
    ))
    .pipe(htmlMin(options))
    .pipe(gulp.dest(Path.resolve('ES','dist', 'views')))
    .pipe(reload({
      stream: true
    }))
})

gulp.task('html', function () {
  return gulp.src(res.html)
    .pipe(htmlMin(options))
    .pipe(gulp.dest(Path.resolve('ES','dist', 'views')))
    .pipe(reload({
      stream: true
    }))
})


gulp.task('stylus', (e) => {

  return gulp.src(res.styls)
    .pipe(stylus({
      compress: true
    }))
    .pipe(
    auto({
      browsers: ['last 5 versions'],
      cascade: false,
    })
    )
    .pipe(gulp.dest(Path.resolve('ES','dist', 'css')))
    .pipe(reload({
      stream: true
    }))

})


gulp.task('less', (e) => {

  return gulp.src(res.lesss)
    .pipe(less())
    .pipe(
    auto({
      browsers: ['last 5 versions'],
      cascade: false,
    })
    )
    .pipe(minify())
    .pipe(gulp.dest(Path.resolve('ES','dist', 'css')))

})


gulp.task('script', (e) => {

  return gulp.src(res.scripts)
    // .pipe(webpack(
    //   require('./public/webpack.config')
    // ))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(Path.resolve('ES','dist', 'js')))
    .pipe(reload({
      stream: true
    }))

})

gulp.task('ts',e=>{
  return gulp.src(res.ts)
    .pipe(ts())
    // .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(Path.resolve('ES','dist', 'js')))
    .pipe(reload({
      stream:true
    }))
})


gulp.task('server', function () {
  bs.init({
    server: {
      baseDir: './',
      // index: `dist/views/${process.env.name}.html`
    },
    open: 'external',
    startPath:`ES/dist/views/${process.env.name}.html`
  })
  gulp.watch(res.html, ['html'])
  gulp.watch(res.styls, ['stylus']);
  gulp.watch(res.lesss, ['less']);
  gulp.watch(res.scripts, ['script']);
  gulp.watch(res.views, ['views']);
  gulp.watch(res.ts, ['ts']);
})

gulp.task('default', ['server'], () => {
  console.log(`您正在监听页面：${process.env.name}`)
})

