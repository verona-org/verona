const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const browserSync = require("browser-sync").create()
const fileInclude = require("gulp-file-include")
const clean = require("gulp-clean")
const postcss = require("gulp-postcss")
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")
const eslint = require("gulp-eslint")

// Пути
const paths = {
    src: {
        html: "src/**/*.html",
        partials: "src/partials/**/*.html",
        scss: "src/scss/index.scss",
        js: ["src/js/**/*.js"],
    },
    dist: {
        html: "dist/",
        css: "dist/css/",
        js: "dist/js/",
        assets: "dist/assets/",
    }
}

// Линтинг JavaScript
function lint() {
    return gulp.src(paths.src.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

// Очистка dist
function cleanDist() {
    return gulp.src("dist", { read: false, allowEmpty: true }).pipe(clean())
}

// Сборка HTML (без gulp-filter)
function html() {
    return gulp
        .src(paths.src.html)
        .pipe(
            fileInclude({
                prefix: "@@",
                basepath: "@file",
                cache: false,
            })
        )
        .pipe(gulp.dest(paths.dist.html))
        .pipe(browserSync.stream())
}

// Компиляция SCSS с Tailwind
function scss() {
    return gulp
        .src(paths.src.scss)
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([tailwindcss("./tailwind.config.js"), autoprefixer()]))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream())
}

// Копирование JS
function js() {
    return gulp
        .src(paths.src.js)
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.stream())
}

// Копирование ассетов
function assets() {
    return gulp
        .src(
            ["src/assets/icons/**/*", "src/assets/img/**/*", "src/assets/fonts/**/*"],
            { base: "src/assets" },
            { encoding: false }
        )
        .pipe(gulp.dest(paths.dist.assets))
        .pipe(browserSync.stream())
}

// Сервер + вотчеры
function serve() {
    browserSync.init({
        server: { baseDir: "dist" },
        mimeTypes: { css: "text/css" },
        port: 3000,
        open: true,
    })

    gulp.watch(paths.src.scss, scss)
    gulp.watch(paths.src.html, html)
    gulp.watch(paths.src.js, gulp.series(lint, js))
    gulp.watch(["src/assets/icons/**/*", "src/assets/img/**/*", "src/assets/fonts/**/*"], assets)
    gulp.watch("./tailwind.config.js", scss)
}

// Сборка
const build = gulp.series(cleanDist, gulp.parallel(html, scss, assets, js))
const dev = gulp.series(build, serve)
const production = gulp.series(lint, build)

// Экспорт задач
exports.clean = cleanDist
exports.html = html
exports.scss = scss
exports.js = js
exports.assets = assets
exports.lint = lint
exports.build = build
exports.production = production
exports.default = dev