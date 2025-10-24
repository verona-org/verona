import autoprefixer from "autoprefixer"
import browserSyncLib from "browser-sync"
import gulp from "gulp"
import clean from "gulp-clean"
import fileInclude from "gulp-file-include"
import notify from "gulp-notify"
import plumber from "gulp-plumber"
import postcss from "gulp-postcss"
import gulpSass from "gulp-sass"
import sourcemaps from "gulp-sourcemaps"
import dartSass from "sass"
import tailwindcss from "tailwindcss"

// Инициализация
const sass = gulpSass(dartSass)
const browserSync = browserSyncLib.create()

// Пути к файлам
const paths = {
    src: {
        html: "src/**/*.html",
        scss: "src/scss/**/*.scss",
        js: "src/js/**/*.js",
        images: "src/assets/images/**/*.{jpg,jpeg,png,gif,svg,webp,ico}",
        icons: "src/assets/icons/**/*.{svg,png,ico,webp}",
        fonts: "src/assets/fonts/**/*.{woff,woff2,ttf,eot,otf}",
        documents: "src/assets/documents/**/*.{pdf,doc,docx,xls,xlsx}",
        media: "src/assets/media/**/*.{mp4,webm,ogg,mp3,wav,ogg}",
        partials: "src/partials/**/*.html",
        tailwindConfig: "tailwind.config.js",
    },
    dist: {
        base: "dist/",
        css: "dist/css/",
        js: "dist/js/",
        assets: "dist/assets/",
        images: "dist/assets/images/",
        icons: "dist/assets/icons/",
        fonts: "dist/assets/fonts/",
        documents: "dist/assets/documents/",
        media: "dist/assets/media/",
    },
}

// Обработчик ошибок
const errorHandler = notify.onError({
    title: "Gulp Error",
    message: "Error: <%= error.message %>",
    sound: false,
})

// Очистка dist
export function cleanDist() {
    return gulp.src(paths.dist.base, { read: false, allowEmpty: true }).pipe(clean())
}

// HTML обработка
export function html() {
    return gulp
        .src(paths.src.html)
        .pipe(plumber({ errorHandler }))
        .pipe(
            fileInclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(gulp.dest(paths.dist.base))
        .pipe(browserSync.stream())
}

// SCSS + Tailwind обработка
export function styles() {
    return gulp
        .src(paths.src.scss)
        .pipe(plumber({ errorHandler }))
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([tailwindcss(paths.src.tailwindConfig), autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream())
}

// JS обработка
export function scripts() {
    return gulp
        .src(paths.src.js)
        .pipe(plumber({ errorHandler }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.stream())
}

// Копирование изображений
export function images() {
    return gulp
        .src(paths.src.images, { encoding: false })
        .pipe(plumber({ errorHandler }))
        .pipe(gulp.dest(paths.dist.images))
        .pipe(browserSync.stream())
}

// Копирование иконок
export function icons() {
    return gulp
        .src(paths.src.icons)
        .pipe(plumber({ errorHandler }))
        .pipe(gulp.dest(paths.dist.icons))
        .pipe(browserSync.stream())
}

// Копирование шрифтов
export function fonts() {
    return gulp
        .src(paths.src.fonts)
        .pipe(plumber({ errorHandler }))
        .pipe(gulp.dest(paths.dist.fonts))
        .pipe(browserSync.stream())
}

// Копирование документов
export function documents() {
    return gulp
        .src(paths.src.documents)
        .pipe(plumber({ errorHandler }))
        .pipe(gulp.dest(paths.dist.documents))
        .pipe(browserSync.stream())
}

// Копирование медиа файлов
export function media() {
    return gulp
        .src(paths.src.media)
        .pipe(plumber({ errorHandler }))
        .pipe(gulp.dest(paths.dist.media))
        .pipe(browserSync.stream())
}

// Наблюдение за изменениями
export function watchFiles() {
    browserSync.init({
        server: {
            baseDir: paths.dist.base,
            serveStaticOptions: {
                extensions: ["html"],
            },
        },
        port: 3000,
        open: false,
        notify: false,
    })

    gulp.watch([paths.src.html, paths.src.partials], html).on("change", browserSync.reload)
    gulp.watch(paths.src.scss, styles)
    gulp.watch(paths.src.js, scripts)
    gulp.watch(paths.src.images, images)
    gulp.watch(paths.src.icons, icons)
    gulp.watch(paths.src.fonts, fonts)
    gulp.watch(paths.src.documents, documents)
    gulp.watch(paths.src.media, media)
    gulp.watch(
        [paths.src.tailwindConfig, "src/**/*.html", "src/**/*.js"],
        gulp.series(styles, html)
    )
}

// Сборка проекта
export const build = gulp.series(
    cleanDist,
    gulp.parallel(html, styles, scripts, images, icons, fonts, documents, media)
)

// Разработка
export const dev = gulp.series(build, watchFiles)

// Экспорт по умолчанию
export default dev