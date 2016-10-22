"use strict";

let gulp = require("gulp");

// タスクの登録
// let tasks = require('./gulp/load');
// let config = require('./gulp/config');


//-------------------------------
// .scss から .css へ自動変換
//-------------------------------
// var sass = require("gulp-sass");
// gulp.task("sass", function() {
//     gulp.src("sass/**/*scss")
//         .pipe(sass())
//         .pipe(gulp.dest("css"));
// });
//-------------------------------
// プレフィックス付与
//-------------------------------
// var autoprefixer = require("gulp-autoprefixer");
 
// gulp.task("sass", function() {
//     gulp.src("sass/**/*scss")
//         .pipe(sass())
//         .pipe(autoprefixer())
//         .pipe(gulp.dest("css"));
// });

//-------------------
// js圧縮自動化
//-------------------
var uglify = require("gulp-uglify");
 
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(uglify())
        .pipe(gulp.dest("js/min"));
});

// //------------------------------------------------
// // ファイルの変更を監視し、変更された時に実行されるように
// // 監視解除は ctrl+c
// //これはnpm install必要なし
// //------------------------------------------------
// gulp.task("default", function() {
//     // gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
//     gulp.watch("sass/**/*.scss",["sass"]);
// });

// //-------------------------------------------
// // ブラウザへの自動反映(いちいち更新しなくてもいい)
// //-------------------------------------------
// // var browser = require("browser-sync");
 
// // gulp.task("server", function() {
// //     browser({
// //         server: {
// //             baseDir: "./"
// //         }
// //     });
// // });
// // gulp.task("js", function() {
// //     gulp.src(["js/**/*.js","!js/min/**/*.js"])
// //         .pipe(uglify())
// //         .pipe(gulp.dest("./js/min"))
// //         .pipe(browser.reload({stream:true}))
// // });
 
// gulp.task("sass", function() {
//     gulp.src("sass/**/*scss")
//         .pipe(frontnote())
//         .pipe(sass())
//         .pipe(autoprefixer())
//         .pipe(gulp.dest("css"))
//         .pipe(browser.reload({stream:true}))
// });
 
// // gulp.task("default",['server'], function() {
// //     gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
// //     gulp.watch("sass/**/*.scss",["sass"]);
// // });

// //---------------------------------------
// // プラグイン - gulp-cssmin、gulp-rename
// // cssを圧縮して、名前を変更してくれる
// //---------------------------------------
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
// // Task
gulp.task('cssmin', function () {
  gulp.src('css/main.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch('css/main.css', ['cssmin'])
});
gulp.task('default', ['cssmin','watch']);


// //---------------------------------------
// // 画像圧縮
// //---------------------------------------
// // const imagemin = require('gulp-imagemin');
// // gulp.task('imagemin', () =>
// //   gulp.src('img/*')
// //     .pipe(imagemin())
// //     .pipe(gulp.dest('img/img_min'))
// // );

// //-------------------------------------------
// // エラーでもwatchを止めない
// //-------------------------------------------
// var plumber = require("gulp-plumber");
// var frontnote = require("gulp-frontnote");
// var browser = require("browser-sync");
// // gulp.task("js", function() {
// //     gulp.src(["js/**/*.js","!js/min/**/*.js"])
// //         .pipe(plumber())
// //         .pipe(frontnote({
// //             css: '../css/style.css'
// //           }))
// //         .pipe(sass())
// //         .pipe(autoprefixer())
// //         .pipe(gulp.dest("./css"))
// //         .pipe(browser.reload({stream:true}));
// // });

// gulp.task("sass", function() {
//     gulp.src("sass/**/*scss")
//         .pipe(plumber())
//         .pipe(frontnote())
//         .pipe(sass())
//         .pipe(autoprefixer())
//         .pipe(gulp.dest("css"))
//         .pipe(browser.reload({stream:true}))
// });

