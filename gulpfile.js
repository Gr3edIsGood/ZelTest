
let project_folder = "dist";
let source_folder = "src";

let path ={

    build:{
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
    },

    src:{
        html: source_folder + "/*.html",
        css: source_folder + "/scss/*.scss",
        js: ['!' + source_folder + "/js/vendor.js", source_folder + '/js/*.js'],
        jsVendor: source_folder + "/js/vendor.js/*.js",
    },

    watch:{
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    del = require('del'),
    scss = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    soursemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify-es').default,
    concat = require("gulp-concat");


function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port:3000,
        notify:false,
    })
}
function html(){
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(
            soursemaps.init()
        )
        .pipe(sassGlob())
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 8 versions"],
                cascade:true
            })
        )
        .pipe(
            group_media()
        )
        .pipe(dest(path.build.css))
        .pipe(
            clean_css()
        )
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(soursemaps.write('.'))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
        .pipe(
            soursemaps.init()
        )
        .pipe(
            concat("scripts.js")

        )
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(soursemaps.write('.'))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}
function jsVendor(){
    return src(path.src.jsVendor)
        .pipe(
            concat("vendor.js")
        )
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

function clean(params) {
    return del(path.clean);
}



let build = gulp.series(clean,gulp.parallel(jsVendor, js, css, html));
let watch = gulp.parallel(build, watchFiles,  browserSync);

exports.jsVendor = jsVendor;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

