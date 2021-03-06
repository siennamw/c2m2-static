/* Gulp definitions for Music Crash Courses
 *
 * Copyright (C) Sienna M. Wood 2016
 * 25 June 2016
 */

var gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    less = require('gulp-less'),
    ext_replace = require('gulp-ext-replace'),
    del = require('del'),
    gpath = require('path'),
    webserver = require('gulp-webserver'),
    rsync = require('gulp-rsync');


/* Build
 * -----------------------------------*/
gulp.task('build', ['nunjucks', 'ext404', 'copyCSS', 'copyJS', 'copyPHP', 'copyImages']);

// default task is serve (which also executes build)
gulp.task('default', ['serve']);

/* Nunjucks
 * -----------------------------------*/
gulp.task('nunjucks', function () {
    // Gets .html, .shtml, and .nunjucks files in sources/content
    return gulp.src('./sources/content/**/*.+(html|shtml|nunjucks)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['./sources/templates']
        }))
        // output files in build folder
        .pipe(gulp.dest('./build')
    );
});

/* Change extension on 404 to .shtml
 * -----------------------------------*/
gulp.task('ext404', ['nunjucks'], function () {
    gulp.src('./build/404.html')
        .pipe(ext_replace('.shtml'))
        .pipe(gulp.dest('./build'));
    return del([
        './build/404.html'
    ]);
});

/* Compile LESS to sources
 * -----------------------------------*/
gulp.task('less', function () {
    return gulp.src('./sources/css/style.less')
        .pipe(less({
            paths: [gpath.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./sources/css')
    );
});

/* Copy CSS to build
 * -----------------------------------*/
gulp.task('copyCSS', ['less'], function () {
    gulp.src('./sources/css/style.css')
        .pipe(gulp.dest('./build/css')
    );
});

/* Copy JS to build
 * -----------------------------------*/
gulp.task('copyJS', function () {
    gulp.src(['./sources/js/*'])
        .pipe(gulp.dest('./build/js')
    );
});

/* Copy PHP to build
 * -----------------------------------*/
gulp.task('copyPHP', function () {
    gulp.src('./sources/php/*')
        .pipe(gulp.dest('./build/php')
        );
});

/* Copy images to build
 * -----------------------------------*/
gulp.task('copyImages', ['less'], function () {
    gulp.src('./sources/images/**/*')
        .pipe(gulp.dest('./build/images')
    );
});

/* Local Server
 * ---------------------------------- */
gulp.task('serve', ['build'], function () {
    gulp.src('build')
        .pipe(webserver({
            port: '9090',
            livereload: true,
            open: true
        })
    );
});

/* Deploy
 * -----------------------------------*/
gulp.task('deploy', ['build'], function () {
    return gulp.src('build/**')
        .pipe(rsync({
            root: 'build/',
            hostname: 'siennamw@abyss.dreamhost.com',
            destination: 'c2m2.org'
        })
    );
});
